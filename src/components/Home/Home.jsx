import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetch_reminders, search_reminder } from "../../redux/reminderReducers";
import { Heading, InputText } from "../global";
import CardList from "../Card/CardList";
import withLoading from "../HOC/withLoading";

const CardListWithLoader = withLoading(CardList);

const Home = () => {
  const { status } = useSelector((state) => state.reminder);
  const dispatch = useDispatch();

  const handleTextChange = (e) => {
    let value = e.target.value;

    dispatch(search_reminder(value));
  };

  useEffect(() => {
    dispatch(fetch_reminders());
  }, [dispatch]);

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
      <CardListWithLoader />
    </>
  );
};

export default Home;
