import React from "react";

import { HeadingMenu } from ".";

const Heading = ({ title }) => {
  return (
    <div className="border-b-2 border-gray2 border-solid pb-2 flex flex-row flex-wrap justify-between">
      <p className="text-black1 font-sans text-base font-semibold">{title}</p>
      <HeadingMenu />
    </div>
  );
};

export default Heading;
