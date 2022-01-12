import React from "react";

const InputDate = ({ type, name, error, value, setFields, fields }) => {
  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    let newFields = {
      ...fields,
      [name]:
        type === "date" ? { created: value, done: fields.date.done } : value,
    };

    setFields(newFields);
  };

  return (
    <div className="mb-4">
      <input
        type={type}
        name={name}
        placeholder={name}
        defaultValue={value || ""}
        onChange={handleChange}
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

export default InputDate;
