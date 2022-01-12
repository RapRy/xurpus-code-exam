import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetch_reminders, search_reminder } from "../../redux/reminderReducers";
import { Heading, InputText, Loader } from "../global";
import Card from "../Card/Card";

const Home = () => {
  const { reminders, status } = useSelector((state) => state.reminder);
  const dispatch = useDispatch();

  const handleTextChange = (e) => {
    let value = e.target.value;

    dispatch(search_reminder(value));
  };

  useEffect(() => {
    dispatch(fetch_reminders());
  }, [dispatch]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "failed") {
    return (
      <p className="text-black1 font-sans text-base font-bold text-center mt-10">
        Something went wrong, please refresh the page
      </p>
    );
  }

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

export default Home;
