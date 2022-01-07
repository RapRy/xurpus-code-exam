import React from "react";

const InputStatus = ({ name, error, value, fields, setFields }) => {
  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    let newFields = { ...fields, [name]: parseInt(value) };

    setFields(newFields);
  };

  return (
    <div className="mb-4 bg-white pr-4 rounded-md">
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="bg-white rounded-md py-2 px-4 w-full text-base text-black1 font-sans font-normal"
      >
        <option value="0">Pending</option>
        <option value="1">On Going</option>
        <option value="2">Done</option>
      </select>
      {error && (
        <label className="mt-1 ml-1 text-sm text-warning font-sans">
          {error}
        </label>
      )}
    </div>
  );
};

export default InputStatus;
