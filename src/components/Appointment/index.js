import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {
  const { time, interview } = props;
  return (
    <article className="appointment">
      <Header time={time}></Header>
      {interview ? (
        <Show student={interview.student} interviewer={interview.interviewer} />
      ) : (
        <Empty />
      )}
    </article>
  );
}
