import { UniversalState } from "../context/StateProvider";

const Options = () => {
  const { drop, setDrop, daySpace, setDaySpace, weekSpace, setWeekSpace } =
    UniversalState();

  const dayButtonHandler = () => {
    setWeekSpace(false);
    setDaySpace(true);
    setDrop(false);
  };

  const weekButtonHandler = () => {
    setDaySpace(false);
    setWeekSpace(true);
    setDrop(false);
  };
  return (
    <>
      <div className=" flex flex-col justify-end text-left z-4 ">
        <div className="flex justify-end mr-10">
          <button
            type="button"
            className="inline-flex justify-center w-[100px] rounded  border-2 border-black shadow-sm px-4 py-2 text-sm font-medium text-black focus:outline-none   "
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setDrop(!drop)}
          >
            Options
            <svg
              className="h-5 w-5 ml-1 text-md"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {drop && (
          <div className="flex justify-end mr-10 w-full z-5">
            <div
              className="mt-[8px] z-[20px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-[120px] flex justify-end mr-10"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1 pt-0 flex justify-center flex-col w-full pb-0 mb-0">
                <button
                  onClick={weekButtonHandler}
                  type="button"
                  className={`text-gray-700 block px-4 py-2 text-sm rounded hover:bg-blue-300 ${
                    weekSpace ? "font-bold text-black" : ""
                  }`}
                  tabIndex="-1"
                >
                  Week
                </button>
                <button
                  onClick={dayButtonHandler}
                  type="button"
                  className={`text-gray-700 block px-4 py-2 text-sm rounded hover:bg-blue-300 ${
                    daySpace ? "font-bold text-black" : ""
                  }`}
                  tabIndex="-1"
                >
                  Day
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Options;
