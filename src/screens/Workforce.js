import { useEffect, useState } from "react";
import CreateUserModal from "../components/CreateUserModal";

import DayWise from "../components/DayWise";
import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";
import TaskForm from "../components/TaskForm";
import { UniversalState } from "../context/StateProvider";
import { getMonth, weeklyMonthsArray } from "../utils/index";
import Weekwise from "./Weekwise";

const Workforce = () => {
  const { taskModal, userModal, daySpace, weekSpace } = UniversalState();
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex, setCurrentMonth]);

  // bg-gradient-to-r from-indigo-500 to-sky-500
  return (
    <div className="w-full h-screen bg-white pb-20 overscroll-contain z-1">
      <Navbar />
      <div className="mt-18 flex justify-center items-center">
        {/* This is Workforce Page */}
      </div>

      {taskModal && (
        <div className="bg-black bg-opacity-50 absolute inset-0 z-10">
          <TaskForm />
        </div>
      )}

      {userModal && (
        <div className="bg-black bg-opacity-50 absolute inset-0 z-10 h-full">
          <CreateUserModal />
        </div>
      )}

      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-2 md:col-span-1 h-full">
          <Sidebar />
        </div>

        {daySpace && (
          <DayWise
            monthsArray={weeklyMonthsArray}
            monthIndex={monthIndex}
            setMonthIndex={setMonthIndex}
            currentMonth={currentMonth}
          />
        )}

        {weekSpace && (
          <Weekwise
            monthsArray={weeklyMonthsArray}
            monthIndex={monthIndex}
            setMonthIndex={setMonthIndex}
            currentMonth={currentMonth}
          />
        )}
      </div>
    </div>
  );
};

export default Workforce;
