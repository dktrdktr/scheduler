import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  let dayClass = "day-list__item";

  dayClass += classNames({
    "--selected": selected,
    "--full": spots === 0,
  });

  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">
        {spots === 0 ? "no" : spots} {spots === 1 ? "spot" : "spots"} remaining
      </h3>
    </li>
  );
}
