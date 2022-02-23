import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;

  let liClass = "interviewers__item";

  liClass += classNames({
    "--selected": selected,
  });

  return (
    <li className={liClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected ? name : ""}
    </li>
  );
}
