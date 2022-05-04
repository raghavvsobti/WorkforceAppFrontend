const CreateTaskButton = ({ taskModal, taskClickHandler }) => {
  return (
    <button
      onClick={taskClickHandler}
      className={`w-full flex justify-center mt-0 hover:bg-black hover:text-white transition-all ease-in-out duration-500  ${
        taskModal ? "bg-black text-white shadow-lg" : "bg-white text-black"
      }`}
    >
      <div className="w-full group ">
        <div className="flex justify-center mr-2 pt-2 mt-2 ">
          <svg
            className="h-10 w-10 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <div className="flex justify-center">
          <h1
            className={`text-1xl group-hover:block text-center group-hover:px-0 px-0 transition-all ease-out duration-200  ${
              taskModal ? "" : "hidden"
            }`}
          >
            Create a Task
          </h1>
        </div>
      </div>
    </button>
  );
};

export default CreateTaskButton;
