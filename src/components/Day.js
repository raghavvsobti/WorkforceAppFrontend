import { colors } from "../utils/colors";

const Day = ({ day, month, tasks, date }) => {
  const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const d2 = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  const newColors = [];
  colors.forEach((c) => {
    if (!newColors.includes(c)) {
      newColors.push(c);
    }
  });

  console.log(colors);

  const getCurrentClass = () => {
    return day === new Date().getDate() && month === new Date().getMonth()
      ? "bg-black text-white rounded-full w-7"
      : "";
  };

  const getPreviousDateClass = () => {
    return d1 < d2 ? "bg-gray-100 border-2" : "";
  };

  const mapped =
    tasks &&
    tasks?.map((item) => {
      // if (item?.workingDays?.includes(date?.toLocaleDateString())) {
      // if(JSON.stringify(item?.workingDays).includes(date?.toLocaleDateString()))
      if (item?.workingDays?.find((el) => el === date?.toLocaleDateString())) {
        return item;
      } else {
      }
      return "ok";
    });

  const checker = mapped
    .filter((item) => item !== "ok")
    .map((itemm) => {
      return itemm;
    });

  console.log(date.getDate());
  console.log(tasks);

  return (
    <>
      <div
        className={`border border-gray-200 flex flex-col h-[120px] ${getPreviousDateClass()}`}
      >
        <div
          className={`h-auto overflow-auto overscroll-contain no-scrollbar `}
        >
          {/* div is made scrollable and scrollbar is hidden */}
          <header className="flex flex-col items-center cursor-pointer">
            <p
              className={`text-sm p-1 my-1 text-center font-bold ${getCurrentClass()}`}
            >
              {day?.toString()}
            </p>
          </header>
          <div className="flex-1 cursor-pointer h-max-42 text-left text-sm">
            {checker.length !== 0 &&
              checker.map((itemm, index) => {
                // before
                // className={`${
                //   itemm?.workingDays[0] === date.toLocaleDateString()
                //     ? `${newColors[index]} visible pl-1 flex flex-wrap justify-center text-center`
                //     : `${newColors[index]} pl-1 flex justify-center text-center`
                // }]`}

                // after

                return (
                  <div
                    className={`${
                      itemm?.workingDays[0] === date.toLocaleDateString()
                        ? `${itemm.color} visible pl-1 flex flex-wrap justify-center text-center`
                        : `${itemm.color} flex justify-center text-center -pl-2`
                    }]`}
                    key={index}
                  >
                    {console.log(tasks?.index)}
                    <p className="font-bold">
                      {itemm?.workingDays[0] === date.toLocaleDateString()
                        ? itemm?.empName.join(", ")
                        : ""}
                    </p>
                    <p className="mx-1 font-bold">
                      {itemm?.workingDays[0] === date.toLocaleDateString()
                        ? ":"
                        : ""}
                    </p>

                    {itemm?.name}
                    {/* {index++} */}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Day;
