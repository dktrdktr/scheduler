import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((item) => {
          const { id, name, avatar } = item;
          return (
            <InterviewerListItem
              id={id}
              name={name}
              avatar={avatar}
              selected={value === id}
              setInterviewer={() => onChange(id)}
            />
          );
        })}
      </ul>
    </section>
  );
}
