import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  let liClass = "interviewers__item";

  liClass += classNames({
    "--selected": selected,
  });

  const onClick = () => {
    setInterviewer(id);
  };

  return (
    <li className={liClass} onClick={onClick}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected ? name : ""}
    </li>
  );
}
