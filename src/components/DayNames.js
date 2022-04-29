const DayNames = () => {
  return (
    <div className="grid grid-cols-7 justify-center mt-5 z-1">
      <div className="flex justify-center">
        <p className="text-lg font-bold">Sun</p>
      </div>
      <div className="flex justify-center">
        <p className="text-lg font-bold">Mon</p>
      </div>
      <div className="flex justify-center">
        <p className="text-lg font-bold">Tue</p>
      </div>
      <div className="flex justify-center">
        <p className="text-lg font-bold">Wed</p>
      </div>
      <div className="flex justify-center">
        <p className="text-lg font-bold">Thu</p>
      </div>
      <div className="flex justify-center">
        <p className="text-lg font-bold">Fri</p>
      </div>
      <div className="flex justify-center">
        <p className="text-lg font-bold">Sat</p>
      </div>
    </div>
  );
};

export default DayNames;
