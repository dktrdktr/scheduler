import "components/InterviewerList.scss";
import PropTypes from "prop-types";
import React from "react";
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {
  const { interviewers, onChange, value } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((item) => {
          const { id, name, avatar } = item;
          return (
            <InterviewerListItem
              key={id}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
