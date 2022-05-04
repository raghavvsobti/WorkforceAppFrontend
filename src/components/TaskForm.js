import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UniversalState } from "../context/StateProvider";
import { colors } from "../utils/colors";
import { Multiselect } from "multiselect-react-dropdown";

const TaskForm = () => {
  const { setTaskModal } = UniversalState();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [empName, setEmpName] = useState("Raghav");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

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

  const [empArray, setEmpArray] = useState(options);

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
        color: selectedColor,
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

  // const employeeArray = [];
  console.log(empArray);

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
                  // multiple
                  onChange={(e) => setEmpName(e.target.value)}
                  className="form-select form-select-lg mb-3 appearance-none block w-full px-3 py-1 text-md font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form-multiselect"
                  placeholder="Select Employees"
                >
                  <option value="none" disabled>
                    Select an Option
                  </option>

                  {options.map((option, index) => (
                    <option
                      key={index}
                      value={option.value}
                      // onClick={() => employeeArray?.push("label")}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* multiselect dropdown starts here */}

            <div className="flex justify-center">
              <div className="mb-1 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="empName"
                >
                  Employee Names
                </label>
                <Multiselect
                  options={empArray}
                  displayValue="label"
                  // disablePreSelectedValues={true}
                  closeIcon="close"
                  onSelect={() => setEmpArray(this.selectedValues)}
                />
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
            {/* starts here color picker*/}

            <div className="mb-5 w-full">
              <div className="flex items-center w-full">
                <div className="w-full">
                  <label
                    htmlFor="colorSelected"
                    className="block text-sm font-bold mb-1"
                  >
                    Select Color
                  </label>
                  <input
                    id="colorSelected"
                    type="text"
                    placeholder="Pick a color"
                    className={`w-full border border-transparent shadow px-4 py-2 leading-normal text-gray-700 bg-white rounded-md focus:outline-none focus:shadow-outline ${selectedColor}`}
                    readOnly
                  />
                </div>
                <div className="relative ml-3 mt-8">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className={`w-10 h-10 rounded-full focus:outline-none focus:shadow-outline inline-flex p-2 shadow ${selectedColor}`}
                    // style={`background: ${selectedColor} color: white`}
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        d="M15.584 10.001L13.998 8.417 5.903 16.512 5.374 18.626 7.488 18.097z"
                      />
                      <path d="M4.03,15.758l-1,4c-0.086,0.341,0.015,0.701,0.263,0.949C3.482,20.896,3.738,21,4,21c0.081,0,0.162-0.01,0.242-0.03l4-1 c0.176-0.044,0.337-0.135,0.465-0.263l8.292-8.292l1.294,1.292l1.414-1.414l-1.294-1.292L21,7.414 c0.378-0.378,0.586-0.88,0.586-1.414S21.378,4.964,21,4.586L19.414,3c-0.756-0.756-2.072-0.756-2.828,0l-2.589,2.589l-1.298-1.296 l-1.414,1.414l1.298,1.296l-8.29,8.29C4.165,15.421,4.074,15.582,4.03,15.758z M5.903,16.512l8.095-8.095l1.586,1.584 l-8.096,8.096l-2.114,0.529L5.903,16.512z" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg h-[120px]">
                      <div className="rounded-md bg-white shadow-xs px-4 py-3 h-auto overflow-auto overscroll-contain no-scrollbar">
                        <div className="flex flex-wrap -mx-2 h-[120px]">
                          <div className="px-2">
                            <div
                              className="w-8 h-8 inline-flex rounded-full cursor-pointer border-4 border-white"
                              // style={`background: ${colors[0]}; box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2)`}
                            ></div>

                            {colors.map((item, index) => {
                              return (
                                <div
                                  onClick={() => setSelectedColor(item)}
                                  key={index}
                                  tabIndex="0"
                                  className={`w-8 h-8 inline-flex rounded-full cursor-pointer border-4 border-white focus:outline-none focus:shadow-outline ${item}`}
                                ></div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ends here color picker */}

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
