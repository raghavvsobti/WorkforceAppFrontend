import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UniversalState } from "../context/StateProvider";

const TaskForm = () => {
  const { setTaskModal } = UniversalState();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [empName, setEmpName] = useState("Raghav");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const options = [
    {
      label: "Raghav",
      value: "Raghav",
    },
    {
      label: "Daksh",
      value: "Daksh",
    },
    {
      label: "Somesh",
      value: "Somesh",
    },
    {
      label: "Paarth",
      value: "Paarth",
    },
    {
      label: "John",
      value: "John",
    },
    {
      label: "David",
      value: "David",
    },
  ];

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const submitHandler = async (e) => {
    // console.log(name, description, empName, startDate, endDate);
    e.preventDefault();
    await fetch("http://localhost:8000/task/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        name: name.toString(),
        empName: empName.toString(),
        description: description.toString(),
        startDate: startDate,
        endDate: endDate,
        userId: userId,
        status: "Pending",
      }),
    })
      .then((response) => {
        // console.log(response);
        setTaskModal(false);
        navigate("/workforce/tasks");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="sm:w-full w-4/5 max-w-lg">
          <div className=" w-full rounded-lg mb-2 bg-gray-100 p-4 flex justify-center">
            <h1 className="text-2xl">Assign a Task</h1>
          </div>
          <form
            onSubmit={submitHandler}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Task Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Task Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>

            <div className="flex justify-center">
              <div className="mb-1 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="empName"
                >
                  Employee
                </label>
                <select
                  name="empName"
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  className="form-select form-select-lg mb-3 appearance-none block w-full px-3 py-1 text-md font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >
                  <option value="none" disabled>
                    Select an Option
                  </option>

                  {options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-2/4 md:mr-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="startDate"
                >
                  Start Date
                </label>
                <div className="flex relative w-full mb-3 mr-1">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                    placeholder="Select Start Date"
                  />
                </div>
              </div>
              <div className="md:w-2/4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="endDate"
                >
                  End Date
                </label>
                <div className="flex relative full mb-3">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                    placeholder="Select Start Date"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full">
              <button
                className="bg-blue-500 w-full mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
              <button
                className=" bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => setTaskModal(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
