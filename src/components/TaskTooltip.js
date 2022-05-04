const TaskTooltip = ({ taskList, empName }) => {
  return (
    <div className="bg-gray-50 text-black m-0 p-1 w-full h-full">
      <div className="px-8 pt-1 ">
        <div className="grid grid-cols-3">
          <p className="text-md font-semibold">Task Name</p>
          <p className="text-md text-center">:</p>
          <p className="text-md">{taskList?.name}</p>
        </div>
        <div className="grid grid-cols-3">
          <p className="text-md font-semibold">Employee Name</p>
          <p className="text-md text-center ">:</p>

          <p className="text-md">{empName?.join(", ")}</p>
        </div>
        <div className="grid grid-cols-3">
          <p className="text-md font-semibold">Task Description</p>
          <p className="text-md text-center">:</p>
          <p className="text-md">{taskList?.description}</p>
        </div>
        <div className="grid grid-cols-3">
          <p className="text-md font-semibold">Start Date</p>
          <p className="text-md text-center">:</p>
          <p className="text-md">{taskList?.startDate}</p>
        </div>
        <div className="grid grid-cols-3">
          <p className="text-md font-semibold">End Date</p>
          <p className="text-md text-center">:</p>
          <p className="text-md">{taskList?.endDate}</p>
        </div>
        <div className="grid grid-cols-3">
          <p className="text-md font-semibold">Status</p>
          <p className="text-md text-center">:</p>
          <p className="text-md">{taskList?.status}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskTooltip;
