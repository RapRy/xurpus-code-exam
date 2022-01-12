import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toast";
import uuid from "react-uuid";
import moment from "moment";

import { Heading, InputText, InputDate, InputStatus, Button } from "../global";
import API from "../../api";

const Create = () => {
  const [fields, setFields] = useState({
    title: "",
    date: { created: "", done: "" },
    status: 0,
    alarm: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    date: "",
    status: "",
    alarm: "",
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

    if (fields.title === "" || fields.date.created === "") {
      let errorMessages = { title: "", date: "" };
      if (fields.title === "") {
        errorMessages = { ...errorMessages, title: "Field is required" };
      }

      if (fields.date.created === "") {
        errorMessages = { ...errorMessages, date: "Field is required" };
      }

      setErrors((prev) => ({ ...prev, ...errorMessages }));

      return;
    }

    if (fields.title !== "" || fields.date.created !== "") {
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

      const dateCreated = moment.utc(fields.date.created);
      const dateForAlarm = new Date().toISOString().split("T").shift();
      const newAlarm = moment(`${dateForAlarm} ${fields.alarm}`).toDate();

      const newReminder = {
        id: uuid(),
        title: fields.title,
        alarm: newAlarm,
        status: { code: fields.status, text: statusText },
        date: { created: dateCreated, done: "" },
      };

      const res = await API.post(
        "http://localhost:3000/reminders",
        newReminder
      );

      if (res.status === 201) {
        toast.success(`${fields.title} added`);
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
          type="date"
          name="date"
          error={errors.date}
          value={fields.date}
          setFields={setFields}
          fields={fields}
        />
        <InputDate
          type="time"
          name="alarm"
          error={errors.alarm}
          value={fields.alarm}
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
