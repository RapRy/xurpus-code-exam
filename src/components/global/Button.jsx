import React from "react";

const Button = ({ type, title, icon, textColor, hasBg, event }) => {
  return (
    <button
      type={type}
      className={`flex flex-row flex-wrap items-center  rounded-md ${
        hasBg ? "bg-gray2 px-4 py-3" : ""
      }`}
      onClick={event}
    >
      {icon}{" "}
      <span className={`pl-1.5 font-sans font-bold text-sm ${textColor}`}>
        {title}
      </span>
    </button>
  );
};

export default Button;
