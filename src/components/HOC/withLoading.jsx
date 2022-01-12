import React from "react";
import { useSelector } from "react-redux";
import { Loader } from "../global";

const withLoading = (Component) => {
  const HOCLoader = () => {
    const { status } = useSelector((state) => state.reminder);

    return <>{status === "loading" ? <Loader /> : <Component />}</>;
  };

  return HOCLoader;
};

export default withLoading;
