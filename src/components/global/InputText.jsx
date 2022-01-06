import React from "react";

const InputText = ({ name, error, value, event }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        name={name}
        placeholder={name}
        defaultValue={value || ""}
        onChange={event}
        className="bg-white rounded-md py-2 px-4 w-full text-base text-black1 font-sans font-normal"
      />
      {error && (
        <label className="mt-1 ml-1 text-sm text-warning font-sans">
          {error}
        </label>
      )}
    </div>
  );
};

export default InputText;
