import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { value, days, onChange } = props;
  return (
    <ul>
      {days.map((day) => {
        const { id, name, spots } = day;
        return (
          <DayListItem
            key={id}
            name={name}
            spots={spots}
            selected={name === value}
            setDay={onChange}
          />
        );
      })}
    </ul>
  );
}
