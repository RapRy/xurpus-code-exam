import React from "react";
import { useSelector } from "react-redux";

import Card from "./Card";

const CardList = () => {
  const { reminders } = useSelector((state) => state.reminder);

  return (
    <>
      {reminders.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 pb-5 md:grid-cols-2">
          {reminders.map((reminder, i) => (
            <Card
              key={reminder.id}
              title={reminder.title}
              status={reminder.status}
              date={reminder.date}
              alarm={reminder.alarm}
              id={reminder.id}
              ind={i}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-black1 font-sans text-lg font-bold text-center mt-10">
          No Reminders
        </h1>
      )}
    </>
  );
};

export default CardList;
