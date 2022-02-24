import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";

export default function Appointment(props) {
  const { time } = props;
  return (
    <article className="appointment">
      {time ? `Appointment at ${time}` : "No appointments"}
    </article>
  );
}
