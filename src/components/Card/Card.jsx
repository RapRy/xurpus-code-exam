import React from "react";
import { Link } from "react-router-dom";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toast";

import API from "../../api";
import { Button } from "../global";
import { delete_reminder, update_status } from "../../redux/reminderReducers";

const colors = ["text-primary1", "text-primary3", "text-primary2"];
const colorsHex = ["#FA461E", "#F9C200", "#71B650"];

const Card = ({ title, status, date, id, ind }) => {
  const { reminders } = useSelector((state) => state.reminder);
  const dispatch = useDispatch();

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

    switch (newStatus) {
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

    const updatedReminder = {
      id,
      title,
      date,
      status: { code: newStatus, text: statusText },
    };

    const res = await API.patch(
      `http://localhost:3000/reminders/${id}`,
      updatedReminder
    );

    if (res.status === 200) {
      const selectedItem = reminders.filter((item) => item.id === id);
      const newReminders = reminders.filter((item, i) => i !== ind);

      const updatedItem = {
        ...selectedItem[0],
        status: { code: newStatus, text: statusText },
      };

      newReminders.splice(ind, 0, updatedItem);

      dispatch(update_status(newReminders));

      toast(`${title} changes status to ${statusText}.`, {
        backgroundColor: colorsHex[newStatus],
      });
    }
  };

  return (
    <div className="grid grid-cols 2 bg-white px-4 py-2 rounded-md shadow-lg gap-1">
      <p className="col-span-2 font-sans font-normal text-lg text-black1">
        {title}
      </p>
      <div>
        <span
          onClick={updateHandler}
          className={`font-sans font-bold text-xs uppercase mr-5 cursor-pointer ${
            colors[status.code]
          }`}
        >
          {status.text}
        </span>
        <span className="font-sans font-semibold text-xs text-black1">
          <Moment format="MMM DD, YYYY">{date}</Moment>
        </span>
      </div>
      <div className="justify-self-end flex flex-row flex-wrap justify-end">
        <Button
          type="button"
          title="Delete"
          icon={<TrashIcon className="h-4 2-4 text-warning" />}
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
