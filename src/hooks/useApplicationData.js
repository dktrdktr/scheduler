import { useState, useEffect } from "react";
import axios from "axios";
import { updateSpots } from "../helpers/selectors";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log("interview", interview);
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        if (state.appointments[id].interview === null) {
          updateSpots(state, id, "book");
        }
        const newState = {
          ...state,
          appointments,
        };
        setState(newState);
      });
  }

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      updateSpots(state, id, "cancel");
      setState({
        ...state,
        appointments,
      });
    });
  }

  return { state, setDay, bookInterview, deleteInterview };
}
