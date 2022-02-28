import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, deleteInterview } =
    props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => transition(SHOW));
  }

  function onConfirm() {
    transition(SAVING);
    deleteInterview(id).then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={onSave}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={onConfirm}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onSave={onSave}
          onCancel={() => back()}
          student={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
    </article>
  );
}
