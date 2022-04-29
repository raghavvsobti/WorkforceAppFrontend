export function getMonth(month) {
  month = Math.floor(month);
  const year = new Date().getFullYear(); //2022

  const firstDayOfTheMonth = new Date(year, month, 1).getDay();

  let curDayCount = 0 - firstDayOfTheMonth;
  const allDaysofMonth = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      curDayCount++;
      const toreturn = new Date(new Date(year, month, curDayCount));
      return toreturn;
    });
  });

  return allDaysofMonth;
}

export function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate);

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

export const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const weeklyMonthsArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// const d1 = new Date("2022-01-18");
// const d2 = new Date("2022-01-24");

// console.log(getDatesInRange(d1, d2));

// const today = new Date();
// const date = new Date(today.getFullYear(), month, 0);
// console.log(date);
// const year = date.getFullYear();

// prev Days array

// const firstDayOfTheMonth = new Date(year, date.getMonth(), 1).getDay();
// const prevLastDay = new Date(
//   date.getFullYear(),
//   date.getMonth(),
//   0
// ).getDate();
// const prevDaysArray = [];
// for (let i = firstDayOfTheMonth; i > 0; i--) {
//   prevDaysArray.push({
//     day: prevLastDay - i + 1,
//     month: date.getMonth(),
//     year,
//   });
// }

//current days of the month

// const lastDateOfTheMonth = new Date(year, date.getMonth() + 1, 0).getDate();
// console.log(lastDateOfTheMonth);
// const currDaysArray = [];
// for (let i = 1; i < lastDateOfTheMonth + 1; i++) {
//   currDaysArray.push({ day: i, month: date.getMonth(), year });
// }

// next days array

//   const nextDaysArray = [];
//   const lastDayOfTheMonth = new Date(year, date.getMonth() + 1, 0).getDay();
//   let count = 1;
//   for (let i = lastDayOfTheMonth; i < 6; i++) {
//     nextDaysArray.push({ day: count, month: date.getMonth(), year });
//     count++;
//   }
//   const allDaysArray = [...prevDaysArray, ...currDaysArray, ...nextDaysArray];
//   return allDaysArray;
// }

// ---------------------------------------------------------------------------------------------------
