import Month from "./Month";
import Options from "./Options";

const DayWise = ({ monthsArray, currentMonth, monthIndex, setMonthIndex }) => {
  return (
    <>
      <div className="md:col-span-11 col-span-10 mt-[85px] relative">
        <div className="flex justify-between">
          <div className="flex flex-row justify-center">
            <p className="text-3xl ml-10">
              {monthsArray[currentMonth[2][2].getMonth()]},{" "}
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
          <div className="absolute md:right-0 opacity-0 md:visible md:opacity-100">
            <Options />
          </div>
        </div>

        <Month month={currentMonth} />
      </div>
    </>
  );
};

export default DayWise;
