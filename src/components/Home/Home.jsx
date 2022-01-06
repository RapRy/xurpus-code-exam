import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetch_reminders, search_reminder } from "../../redux/reminderReducers";
import { Heading, InputText } from "../global";
import Card from "../Card/Card";

const Home = () => {
  const { reminders } = useSelector((state) => state.reminder);
  const dispatch = useDispatch();

  const handleTextChange = (e) => {
    let value = e.target.value;

    dispatch(search_reminder(value));
  };

  useEffect(() => {
    dispatch(fetch_reminders());
  }, [dispatch]);

  return (
    <>
      <Heading title="Reminders" />
      <div className="mt-4">
        <InputText
          name="search"
          error={null}
          value=""
          event={handleTextChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 pb-5 md:grid-cols-2">
        {reminders.map((reminder, i) => (
          <Card
            key={reminder.id}
            title={reminder.title}
            status={reminder.status}
            date={reminder.date}
            id={reminder.id}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
