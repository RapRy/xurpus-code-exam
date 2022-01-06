import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import API from "../../api";

import { Button } from "../global";
import { delete_reminder } from "../../redux/reminderReducers";

const colors = ["text-primary1", "text-primary3", "text-primary2"];

const Card = ({ title, status, date, id }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const deleteHandler = () => {
    dispatch(delete_reminder(id));
  };

  const updateHandler = async () => {
    let statusText = "";
    const newStatus = status.code === 2 ? 0 : status.code + 1;

    console.log(newStatus);

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
      navigate("/");
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
          className={`font-sans font-bold text-xs uppercase mr-5 ${
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
