import { useEffect, useState } from "react";
import { UniversalState } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
const EditModal = ({ id }) => {
  const {
    editModal,
    setEditModal,
    // isFetching,
    setIsFetching,
  } = UniversalState();
  const [taskList, setTaskList] = useState(null);
  const navigate = useNavigate();

  const deleteTask = () => {
    setEditModal(false);
    deleteEntry();
  };

  const deleteEntry = async () => {
    await fetch(`http://localhost:8000/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(() => {
        setIsFetching(true);
        setEditModal(false);
        navigate("/workforce/tasks");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
  const fetchCreatedTask = async () => {
    await fetch(`http://localhost:8000/task/${id}`, {
      credentials: "include",
    }).then((response) =>
      response
        .json()
        .then((data) => {
          //   console.log(response);
          //   console.log(data);
          setTaskList(data);
        })
        .catch((error) => {
          console.error("Error: ", error);
        })
    );
  };

  useEffect(() => {
    if (editModal) {
      fetchCreatedTask();
    }
    // eslint-disable-next-line
  }, [editModal]);

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
  const stats = [
    {
      label: "Pending",
      value: "Pending",
    },
    {
      label: "Completed",
      value: "Completed",
    },
    {
      label: "Overdue",
      value: "Overdue",
    },
    {
      label: "Cancelled",
      value: "Cancelled",
    },
  ];

  const [name, setName] = useState(taskList?.name);
  const [description, setDescription] = useState(taskList?.description);
  const [empName, setEmpName] = useState(taskList?.empName);
  const [startDate, setStartDate] = useState("");
  // new Date(taskList?.startDate).toLocaleDateString()
  const [endDate, setEndDate] = useState("");
  // new Date(taskList?.endDate).toLocaleDateString()

  const [status, setStatus] = useState(taskList?.status);

  const submitHandler = async (e) => {
    // console.log(name, description, empName, startDate, endDate);
    e.preventDefault();
    await fetch(`http://localhost:8000/task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        empName: empName,
        description: description,
        startDate: startDate,
        endDate: endDate,
        status: status,
      }),
    })
      .then((response) => {
        // console.log(response);
        setEditModal(false);
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
            <h1 className="text-2xl">Edit Task</h1>
          </div>
          <form
            id="mainForm"
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
                defaultValue={taskList?.name}
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
                defaultValue={taskList?.description}
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
                  defaultValue={taskList?.name}
                  onChange={(e) => setEmpName(e.target.value)}
                  className="form-select form-select-lg mb-3 appearance-none block w-full px-3 py-1 text-md font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >
                  <option value={taskList?.empName}>
                    {taskList?.empName ? taskList?.empName : "Select an Option"}
                  </option>
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="mb-1 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={"status"}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mb-3 appearance-none block w-full px-3 py-1 text-md font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >
                  <option value={taskList?.status}>
                    {taskList?.status ? taskList?.status : "Select an Option"}
                  </option>
                  {stats.map((option, index) => (
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
                    defaultValue={taskList?.startDate.split("T")[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    defaultValue={taskList?.endDate.split("T")[0]}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => setEditModal(false)}
              >
                Close
              </button>
            </div>
            <div className="flex items-center justify-between w-full mt-2">
              <button
                className="bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={deleteTask}
              >
                Delete Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModal;
