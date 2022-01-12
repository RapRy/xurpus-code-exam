import React, { useCallback, useState, useEffect } from "react";
import {
  PlusCircleIcon,
  FilterIcon,
  ChevronLeftIcon,
} from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toast";

import { filter_reminders } from "../../redux/reminderReducers";
import { Button } from ".";

const colors = ["text-primary1", "text-primary3", "text-primary2"];
const colorsHex = ["#FA461E", "#F9C200", "#71B650"];

const HeadingMenu = () => {
  const dispatch = useDispatch();
  let location = useLocation();

  const [currentFilter, setCurrentFilter] = useState(0);
  const [isHome, setHome] = useState(true);

  const filterHandler = useCallback(() => {
    dispatch(filter_reminders(currentFilter)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        let statusText = "";

        switch (currentFilter) {
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

        if (currentFilter !== 3)
          toast.info(`Filtered by ${statusText}`, {
            backgroundColor: colorsHex[currentFilter],
          });
        setCurrentFilter((prev) => (prev === 3 ? 0 : prev + 1));
      }
    });
  }, [currentFilter, dispatch]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setHome(false);
    } else {
      setHome(true);
    }
  }, [location]);

  return (
    <div className="flex flex-row flex-wrap justify-end">
      {!isHome && (
        <Link to="/">
          <Button
            type="button"
            title="Back"
            icon={<ChevronLeftIcon className="h-6 w-6 text-black1" />}
            textColor="text-black1"
            hasBg={false}
            event={null}
          />
        </Link>
      )}
      {isHome && (
        <>
          <Button
            type="button"
            title="Filter"
            icon={
              <FilterIcon
                className={`h-5 w-5 ${
                  currentFilter === 0
                    ? "text-black1"
                    : colors[currentFilter - 1]
                }`}
              />
            }
            textColor={
              currentFilter === 0 ? "text-black1" : colors[currentFilter - 1]
            }
            hasBg={false}
            event={filterHandler}
          />
          <Link to="/create" className="pl-3">
            <Button
              type="button"
              title="Add Reminder"
              icon={<PlusCircleIcon className="h-5 w-5 text-black1" />}
              textColor="text-black1"
              hasBg={false}
              event={null}
            />
          </Link>
        </>
      )}
    </div>
  );
};

export default HeadingMenu;
