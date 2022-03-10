import { useState, useEffect } from "react";
import axios from "axios";
import { genDaysArray } from "../helpers/helpers";
require("dotenv");

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    const webSocketUrl = process.env.REACT_APP_WEBSOCKET_URL;
    const ws = new WebSocket(webSocketUrl);
    ws.onopen = () => {
      ws.send("ping");
    };
    ws.onmessage = (event) => {
      console.log(`Message received: ${event.data}`);
    };
    return () => {
      ws.close();
    };
  }, []);

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
        setState((prev) => ({
          ...prev,
          appointments,
          days: genDaysArray(prev, appointments, id),
        }));
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      setState((prev) => ({
        ...prev,
        appointments,
        days: genDaysArray(prev, appointments, id),
      }));
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
