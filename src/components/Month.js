import React, { useEffect, useState } from "react";
import Day from "./Day";
import DayNames from "./DayNames";

const Month = ({ month }) => {
  const [taskList, setTaskList] = useState([]);

  const fetchCreatedTasks = async () => {
    await fetch("http://localhost:8000/task/all", {
      credentials: "include",
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