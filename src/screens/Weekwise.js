import React, { useEffect, useState } from "react";
import Options from "../components/Options";
import { weeklyMonthsArray } from "../utils/index";
import { colors } from "../utils/colors";
const Weekwise = ({ currentMonth, monthIndex, setMonthIndex }) => {
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
              index: index + Date.now(),
              key: index,
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
  }, [monthIndex]);

  // eslint-disable-next-line

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

  // removing duplicates from array colors

  const newColors = [];
  colors.forEach((c) => {
    if (!newColors.includes(c)) {
      newColors.push(c);
    }
  });

  console.log(newColors);

  // var indexOfColors = Math.floor(Math.random() * 36);

  const checkerFunction = (item, dateItem, index) => {
    console.log("color check", newColors[index], index);
    console.log(`bg-${newColors[index]}`);
    if (item?.workingDays?.find((el) => el === dateItem.toLocaleDateString())) {
      return `bg-${newColors[index]} text-transparent block`;
      // return `bg-green-300 text-transparent`;
    } else {
      return `hidden`;
    }
  };

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
          {taskList
            ?.filter((item) =>
              secondRowArray
                ?.flat()
                ?.some((itemm) => item?.workingDays?.includes(itemm))
            )
            ?.map((item, index) => {
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
                      <div
                        key={generateKey(Date.now() + Math.random())}
                        className={`bg-gray-50 mt-[15px] mx-1 h-10 text-black grid grid-cols-7 gap-0 text-center`}
                      >
                        {monthItem.map((dateItem, idx) => {
                          return (
                            <div
                              key={generateKey(
                                new Date().getTime() + idx + dateItem.toString()
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
                    );
                  })}
                  <div className="bg-gray-50 mt-[15px] mx-1 h-10 text-black mr-2 flex justify-center items-center">
                    <p className="text-sm font-bold">{item?.empName}</p>
                  </div>
                </React.Fragment>
              );
            })}

          {colors.map((item, index) => {
            return (
              <div key={index} className={`bg-${newColors[index]} w-64 h-64`}>
                <p>Hello {index}</p>
              </div>
            );
          })}

          <div className="col-span-[0.5]"></div>
        </div>
      </div>
    </div>
  );
};

export default Weekwise;
