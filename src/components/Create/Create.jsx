import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import { Heading, InputText, InputDate, InputStatus, Button } from "../global";
import API from "../../api";

const Create = () => {
  const [fields, setFields] = useState({
    title: "",
    date: "",
    status: 0,
  });
  const [errors, setErrors] = useState({
    title: "",
    date: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    let newFields = { ...fields, [name]: value };

    setFields(newFields);
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    if (fields.title === "" || fields.date === "") {
      let errorMessages = { title: "", date: "" };
      if (fields.title === "") {
        errorMessages = { ...errorMessages, title: "Field is required" };
      }

      if (fields.date === "") {
        errorMessages = { ...errorMessages, date: "Field is required" };
      }

      setErrors((prev) => ({ ...prev, ...errorMessages }));

      return;
    }

    if (fields.title !== "" || fields.date !== "") {
      let statusText = "";

      switch (fields.status) {
        case 0:
          statusText = "Pending";
          break;
        case 1:
          statusText = "On Going";
          break;
        case 2:
          statusText = "Done";
          break;
        default:
          statusText = "Pending";
          break;
      }

      const newReminder = {
        id: uuid(),
        title: fields.title,
        status: { code: fields.status, text: statusText },
        date: new Date(fields.date),
      };

      const res = await API.post(
        "http://localhost:3000/reminders",
        newReminder
      );

      if (res.status === 201) {
        navigate("/");
      }
    }
  };

  return (
    <>
      <Heading title="New Reminder" />
      <form className="py-6 max-w-lg" onSubmit={submitHandle}>
        <InputText
          name="title"
          error={errors.title}
          value={fields.title}
          event={handleTextChange}
        />
        <InputDate
          name="date"
          error={errors.date}
          value={fields.date}
          setFields={setFields}
          fields={fields}
        />
        <InputStatus
          name="status"
          error={errors.status}
          value={fields.status}
          setFields={setFields}
          fields={fields}
        />
        <div className="flex flex-row justify-end">
          <Button
            type="submit"
            title="Add Reminder"
            icon={<PlusCircleIcon className="h-5 w-5 text-black1" />}
            textColor="text-black1"
            hasBg={true}
            event={null}
          />
        </div>
      </form>
    </>
  );
};

export default Create;
