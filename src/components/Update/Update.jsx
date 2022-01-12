import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { RefreshIcon } from "@heroicons/react/solid";
import { toast } from "react-toast";

import API from "../../api";
import { Heading, InputText, InputDate, InputStatus, Button } from "../global";
import { fetch_single_reminder } from "../../redux/reminderReducers";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.reminder);

  const [fields, setFields] = useState({
    title: "",
    date: { created: "", done: "" },
    alarm: "",
    status: 0,
  });

  const initFields = useRef({});

  const [errors, setErrors] = useState({
    title: "",
    date: "",
    status: "",
    alarm: "",
  });

  const handleTextChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    let newFields = { ...fields, [name]: value };

    setFields(newFields);
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    if (
      fields.title === initFields.current.title &&
      fields.date.created === initFields.current.date.created &&
      fields.status === initFields.current.status &&
      fields.alarm === initFields.current.alarm
    ) {
      return;
    }

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

      const dateForAlarm = new Date().toISOString().split("T").shift();
      const newAlarm = moment(`${dateForAlarm} ${fields.alarm}`).toDate();

      const newReminder = {
        title: fields.title,
        status: { code: fields.status, text: statusText },
        alarm: newAlarm,
        date: {
          created: moment.utc(fields.date.created),
          done: fields.date.done,
        },
      };

      const res = await API.patch(
        `http://localhost:3000/reminders/${selected.id}`,
        newReminder
      );

      if (res.status === 200) {
        toast.success(`${fields.title} Updated`);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    dispatch(fetch_single_reminder(id)).then((res) => {
      const { title, date, status, alarm } = res.payload;
      setFields({
        title,
        alarm: moment(alarm).format("H:m"),
        date: {
          created: moment.utc(date.created).format("YYYY-MM-DD"),
          done: date.done,
        },
        status: status.code,
      });

      initFields.current = {
        title,
        alarm: moment(alarm).format("H:m"),
        date: {
          created: moment.utc(date.created).format("YYYY-MM-DD"),
          done: date.done,
        },
        status: status.code,
      };
    });
  }, [dispatch, id]);

  return (
    <>
      <Heading title={selected.title} />
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
          value={fields.date.created}
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
            title="Update"
            icon={<RefreshIcon className="h-5 w-5 text-black1" />}
            textColor="text-black1"
            hasBg={true}
            event={null}
          />
        </div>
      </form>
    </>
  );
};

export default Update;
