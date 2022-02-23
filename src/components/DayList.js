import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { day, days, setDay } = props;
  return (
    <ul>
      {days.map((item) => {
        const { id, name, spots } = item;
        return (
          <DayListItem
            id={id}
            name={name}
            spots={spots}
            selected={name === day}
            setDay={setDay}
          />
        );
      })}
    </ul>
  );
}
