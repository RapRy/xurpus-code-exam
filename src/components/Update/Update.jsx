import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { RefreshIcon } from "@heroicons/react/solid";
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
    date: "",
    status: 0,
  });

  const initFields = useRef({});

  const [errors, setErrors] = useState({
    title: "",
    date: "",
    status: "",
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
      fields.date === initFields.current.date &&
      fields.status === initFields.current.status
    ) {
      return;
    }

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
        title: fields.title,
        status: { code: fields.status, text: statusText },
        date: new Date(fields.date),
      };

      const res = await API.patch(
        `http://localhost:3000/reminders/${selected.id}`,
        newReminder
      );

      if (res.status === 200) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    dispatch(fetch_single_reminder(id)).then((res) => {
      const { title, date, status } = res.payload;
      setFields({
        title,
        date: moment(date).format("YYYY-MM-DD"),
        status: status.code,
      });

      initFields.current = {
        title,
        date: moment(date).format("YYYY-MM-DD"),
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
