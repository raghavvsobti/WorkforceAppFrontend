import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants";

import Day from "./Day";
import DayNames from "./DayNames";

const Month = ({ month }) => {
  const [taskList, setTaskList] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const fetchCreatedTasks = async () => {
    await fetch(` ${BASE_URL}/task/all/${userId}`, {
      credentials: "include",
      headers: {
        Authorization: `${token}`,
      },
    }).then((response) =>
      response
        .json()
        .then((data) => {
          setTaskList(
            data.map((item, index) => ({
              index: index + 1,
              ...item,
            }))
          );
        })
        .catch((error) => {
          console.error("Error: ", error);
        })
    );
  };

  useEffect(() => {
    fetchCreatedTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <DayNames />

      <div className="flex-1 grid grid-cols-7 grid-rows-5 m-2 z-1">
        {month.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((day, idx) => (
              <Day
                day={day.getDate()}
                month={day.getMonth()}
                key={idx}
                rowId={idx}
                tasks={taskList}
                date={day}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Month;
