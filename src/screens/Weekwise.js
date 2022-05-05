import React, { useEffect, useState } from "react";
import Options from "../components/Options";
import { weeklyMonthsArray } from "../utils/index";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import TaskTooltip from "../components/TaskTooltip";
import { UniversalState } from "../context/StateProvider";

const Weekwise = ({ currentMonth, monthIndex, setMonthIndex }) => {
  const [taskList, setTaskList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { taskModal } = UniversalState();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const fetchCreatedTasks = async () => {
    setIsFetching(true);
    await fetch(`http://localhost:8000/task/all/${userId}`, {
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
              empName: item?.empName?.map((itemm, index) => itemm?.name),
            }))
          );
        })
        .catch((error) => {
          console.error("Error: ", error);
        })
    );
    setIsFetching(false);
  };

  useEffect(() => {
    if (taskModal === false) {
      fetchCreatedTasks();
    }

    // eslint-disable-next-line
  }, [monthIndex, taskModal]);

  function getFormat(today) {
    var dd = today.getDate();
    var mm = today.getMonth();
    if (dd < 10) {
      dd = "0" + dd;
    }
    mm = weeklyMonthsArray[mm];
    today = mm + " " + dd;
    return today;
  }

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  const rowArray = currentMonth.map((item) => {
    return item.map((row) => {
      return getFormat(row);
    });
  });

  const secondRowArray = currentMonth.map((item) => {
    return item.map((row) => {
      return new Date(row.toString()).toLocaleDateString();
    });
  });

  const checkerFunction = (item, dateItem) => {
    if (item?.workingDays?.find((el) => el === dateItem.toLocaleDateString())) {
      return `${item.color} text-transparent block`;
    } else {
      return `hidden disabled`;
    }
  };

  const filteredArray = taskList?.filter((item) =>
    secondRowArray?.flat()?.some((itemm) => item?.workingDays?.includes(itemm))
  );

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="md:col-span-11 col-span-10 mt-[85px] relative ">
      <div className="flex justify-between">
        <div className="flex flex-row justify-center">
          <p className="text-3xl ml-10">
            {weeklyMonthsArray[currentMonth[2][2].getMonth()]},{" "}
            {currentMonth[2][2].getFullYear()}
          </p>

          <button
            className="ml-2"
            onClick={() => setMonthIndex(monthIndex - 1)}
          >
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="ml-2"
            onClick={() => setMonthIndex(monthIndex + 1)}
          >
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button
            className="ml-2 bg-none border-solid border-2 border-black px-6"
            onClick={() => setMonthIndex(new Date().getMonth())}
          >
            Today
          </button>
        </div>
      </div>
      <div className="absolute md:right-0 top-0 opacity-0 md:visible md:opacity-100">
        <Options />
      </div>

      <div className="h-full w-full mt-12 pl-10">
        <div className="grid grid-cols-7 ">
          {/* weeks */}
          <div className=""></div>
          {/* here Headers are being set up */}
          {rowArray.map((item, index) => {
            return (
              <div
                key={generateKey(Date.now() + Math.random() * 1000000)}
                className={`bg-gray-50 mx-1 mb-0.5 h-12 flex justify-center items-center`}
              >
                <p className="text-sm font-bold">
                  {`${
                    item[0].toString().slice(0, 3) ===
                    item[item.length - 1].toString().slice(0, 3)
                      ? item[0] +
                        " - " +
                        item[item.length - 1].toString().slice(-2)
                      : item[0] + " - " + item[item.length - 1].toString()
                  }`}
                </p>
              </div>
            );
          })}
          <div className="col-span-[0.5] "></div>
          {/* row 1 ends here */}
          {/* weekwise */}
          <div className="col-span-[0.5] "></div>
          {currentMonth.map((item, i) => {
            return (
              <div
                key={generateKey(item[i] + i)}
                className={`mt-[0.5px] mx-1 h-6 mb-1 grid grid-cols-7 text-center bg-gray-100`}
              >
                {item.map((itemm, index) => {
                  return (
                    <div
                      key={generateKey(Date.now() + Math.random() * 1000000)}
                      className="flex justify-center"
                    >
                      <p className="text-sm font-semibold">{days[index]}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="col-span-[0.5] "></div>
          {/* 2nd row ends here */}
          {/* here all the tasks array is getting mapped */}

          {isFetching === true ? (
            <div className="grid col-span-7">
              <div className="flex justify-center items-center h-[400px] w-full">
                <svg
                  role="status"
                  className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
          ) : filteredArray.length > 0 ? (
            filteredArray.map((item, index) => {
              return (
                <React.Fragment key={generateKey(item.id + Math.random())}>
                  <div
                    key={generateKey(item.id)}
                    className="bg-gray-50 mt-[15px] mx-1 h-10 text-black flex items-center justify-center"
                  >
                    <p className="text-sm font-bold">{item.name}</p>
                  </div>

                  {/* using currentMonth to fetch month dates */}
                  {currentMonth.map((monthItem) => {
                    return (
                      <Tippy
                        key={generateKey(Date.now() + Math.random())}
                        content={
                          <TaskTooltip
                            taskList={item}
                            empName={item?.empName}
                          />
                        }
                        theme={"light"}
                        placement="bottom"
                        flip="true"
                        animation="fade"
                        delay={200}
                        hideOnClick={true}
                        trigger="click"
                        touch={true}
                        zIndex={9999}
                        arrow={true}
                        role="tooltip"
                      >
                        <div
                          className={`bg-gray-50 mt-[15px] mx-1 h-10 cursor-pointer text-black grid grid-cols-7 gap-0 text-center`}
                        >
                          {monthItem.map((dateItem, idx) => {
                            return (
                              <div
                                key={generateKey(
                                  new Date().getTime() +
                                    idx +
                                    dateItem.toString()
                                )}
                                className="flex justify-center m-0 w-full"
                              >
                                <p
                                  className={`text-sm mx-0 font-semibold flex w-full flex-wrap ${checkerFunction(
                                    item,
                                    dateItem,
                                    index
                                  )}`}
                                >
                                  {new Date(dateItem.toString()).getDate()}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </Tippy>
                    );
                  })}
                  <div className="bg-gray-50 mt-[15px] mx-1 h-10 text-black mr-2 flex justify-center items-center">
                    <p className="text-sm font-bold">
                      {item?.empName.join(", ")}
                    </p>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <>
              <div className="p-20 mt-20 flex justify-center col-span-7  ">
                <p>No task has been assigned for this month..</p>
              </div>
            </>
          )}
          <div className="col-span-[0.5]"></div>
        </div>
      </div>
    </div>
  );
};

export default Weekwise;
