import React, { useEffect, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TrashIcon, PencilAltIcon, ClockIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toast";
import moment from "moment";

import API from "../../api";
import { Button } from "../global";
import { delete_reminder, update_status } from "../../redux/reminderReducers";

const colors = ["text-primary1", "text-primary3", "text-primary2"];
const colorsHex = ["#FA461E", "#F9C200", "#71B650"];

const Card = ({ title, status, date, alarm, id, ind }) => {
  const { reminders } = useSelector((state) => state.reminder);
  const dispatch = useDispatch();

  const intervalRef = useRef();
  const [isAlarmed, setIsAlarmed] = useState(false);

  const deleteHandler = () => {
    dispatch(delete_reminder(id)).then((res) => {
      if ((res.meta.requestStatus = "fulfilled")) {
        toast.success(`${title} deleted`, { backgroundColor: "#F90000" });
      }
    });
  };

  const updateHandler = async () => {
    let statusText = "";
    const newStatus = status.code === 2 ? 0 : status.code + 1;
    let dateDone = "";
    // const dateDone = moment();

    switch (newStatus) {
      case 0:
        statusText = "Pending";
        break;
      case 1:
        statusText = "On Going";
        break;
      case 2:
        statusText = "Done";
        dateDone = new Date().toString();
        if (setIsAlarmed) setIsAlarmed(false);
        break;
      default:
        statusText = "Pending";
        break;
    }

    const updatedReminder = {
      id,
      title,
      alarm,
      date: { created: date.created, done: dateDone },
      status: { code: newStatus, text: statusText },
    };

    const res = await API.patch(
      `http://localhost:3000/reminders/${id}`,
      updatedReminder
    );

    if (res.status === 200) {
      const newReminders = reminders.filter((item, i) => i !== ind);

      newReminders.splice(ind, 0, updatedReminder);

      dispatch(update_status(newReminders));

      toast(`${title} changes status to ${statusText}.`, {
        backgroundColor: colorsHex[newStatus],
      });
    }
  };

  const disableAlarm = () => {
    setIsAlarmed(false);
  };

  const checkAlarm = useCallback(() => {
    const currentDate = moment(new Date()).format("MM-DD-YYYY");
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
    });
    const createdDate = moment.utc(date.created).format("MM-DD-YYYY");
    const alarmSet = new Date(alarm).toLocaleTimeString("en-US", {
      hour12: false,
    });

    if (currentDate === createdDate && currentTime === alarmSet) {
      toast.info(`Time to do ${title}`);
      setIsAlarmed(true);
      clearInterval(intervalRef.current);
      return;
    }

    if (currentDate === createdDate && currentTime > alarmSet) {
      setIsAlarmed(true);
      clearInterval(intervalRef.current);
      return;
    }
  }, [date.created, alarm]);

  useEffect(() => {
    if (alarm && status.code !== 2) {
      intervalRef.current = setInterval(() => {
        checkAlarm();
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [checkAlarm, alarm]);

  return (
    <div className="grid grid-cols 2 bg-white px-4 py-2 rounded-md shadow-lg gap-1">
      <p className="col-span-2 font-sans font-normal text-lg text-black1">
        {title}
      </p>
      <div
        className="col-span-2 flex flex-row flex-nowrap"
        onClick={disableAlarm}
      >
        <span className="font-sans font-semibold text-xs text-black1 mr-4">
          {date.done
            ? `completed on ${moment.utc(date.done).format("MMM DD, YYYY")}`
            : moment.utc(date.created).format("MMM DD, YYYY")}
        </span>
        {alarm && (
          <div
            className={`flex flex-row flex-nowrap ${
              isAlarmed ? "alarm-buzzed" : ""
            }`}
          >
            <ClockIcon className="h-4 w-4 text-black1 mr-1" />
            <span className="font-sans font-semibold text-xs text-black1">
              {moment(alarm).format("h:m A")}
            </span>
          </div>
        )}
      </div>
      <div>
        <span
          onClick={updateHandler}
          className={`font-sans font-bold text-xs uppercase mr-5 cursor-pointer ${
            colors[status.code]
          }`}
        >
          {status.text}
        </span>
      </div>
      <div className="justify-self-end flex flex-row flex-wrap justify-end">
        <Button
          type="button"
          title="Delete"
          icon={<TrashIcon className="h-4 w-4 text-warning" />}
          textColor="text-warning"
          hasbg={false}
          event={deleteHandler}
        />
        <Link to={`/${id}`} className="pl-3">
          <Button
            type="button"
            title="Edit"
            icon={<PencilAltIcon className="h-4 2-4 text-black1" />}
            textColor="text-black1"
            hasbg={false}
            event={null}
          />
        </Link>
      </div>
    </div>
  );
};

export default Card;
