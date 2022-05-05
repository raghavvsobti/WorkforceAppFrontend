import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskForm from "../components/TaskForm";
import { UniversalState } from "../context/StateProvider";
import { useEffect, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DetailsModal from "../components/DetailsModal";
import EditModal from "../components/EditModal";
import CreateUserModal from "../components/CreateUserModal";
import { BASE_URL } from "../constants";

const Tasks = () => {
  const {
    taskModal,
    openModal,
    setOpenModal,
    editModal,
    userModal,
    // isLoggedIn,
    // isFetching,
    // setIsFetching,
  } = UniversalState();
  const [id, setId] = useState("");

  const [taskList, setTaskList] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // const [minDate, setMinDate] = useState("");
  // const [maxDate, setMaxDate] = useState("");

  const viewDetails = (personId) => {
    setId(personId);
    setOpenModal(true);
  };

  const RowButton = ({ rowParams }) => {
    return (
      <button
        className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700"
        onClick={() => viewDetails(rowParams.row.id)}
      >
        View Details
      </button>
    );
  };

  const columns = [
    {
      field: "index",
      headerName: "#",
      width: 100,
      editable: true,
    },
    {
      field: "Edit",
      headerName: "View Details",
      width: 170,
      renderCell: (params) => <RowButton rowParams={params} />,
    },
    {
      field: "empName",
      headerName: "Employee Name",
      width: 150,
      valueGetter: (params) => params.row.empName.join(", "),
    },
    { field: "name", headerName: "Name", width: 150 },

    {
      field: "startDate",
      headerName: "Start Date",
      width: 150,
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 270,
      editable: true,
    },
  ];

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const fetchCreatedTasks = async () => {
    setIsFetching(true);
    await fetch(`${BASE_URL}/task/all/${userId}`, {
      credentials: "include",
      headers: {
        Authorization: `${token}`,
      },
    }).then((response) =>
      response
        .json()
        .then((data) => {
          setTaskList(
            data.map((item, index) => ({
              index: index + 1,
              ...item,
              empName: item.empName.map((item) => item.name),
              employees: item.empName.map((item) => item.name).join(", "),
            }))
          );
        })
        .catch((error) => {
          console.error("Error: ", error);
        })
    );
    setIsFetching(false);
  };

  useEffect(() => {
    if (taskModal === false) {
      fetchCreatedTasks();
    } else if (editModal === false) {
      fetchCreatedTasks();
    }
    // eslint-disable-next-line
  }, [taskModal, editModal]);

  const [filters, setFilters] = useState({
    status: "",
    employees: "",
  });

  // useMemo is used to only calculate a value when dependencies change.
  // Here, the value of filteredList is recalculated when either of the variables filters, employee name, status,startDate, endDate change

  const filteredList = useMemo(() => {
    return taskList?.filter((filteredItem) =>
      Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        return filters[key] === filteredItem[key];
      })
    );
    // .filter((filteredItem) => {
    //   const startDate = new Date(filteredItem.startDate);
    //   return startDate >= minDate?.getTime();
    // })
    // .filter((filteredItem) => {
    //   const startDate = new Date(filteredItem.startDate);
    //   return startDate <= maxDate?.getTime();
    // });
    // eslint-disable-next-line
  }, [filters, taskList]);

  return (
    <div>
      <Navbar />
      {taskModal && (
        <div className="bg-black bg-opacity-50 absolute inset-0 z-10">
          <TaskForm />
        </div>
      )}
      {openModal && (
        <div className="bg-black bg-opacity-50 absolute inset-0 z-10">
          <DetailsModal id={id} />
        </div>
      )}
      {editModal && (
        <div className="bg-black bg-opacity-50 absolute inset-0 z-10">
          <EditModal id={id} />
        </div>
      )}
      {userModal && (
        <div className="bg-black bg-opacity-50 absolute inset-0 z-10 h-full">
          <CreateUserModal />
        </div>
      )}
      <div className="grid grid-cols-12 gap-2 ">
        <div className="col-span-2 md:col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-1">{/* for spacing */}</div>
        {isFetching ? (
          <div className="grid col-span-12">
            <div className="flex justify-center items-center h-screen w-full">
              <svg
                role="status"
                className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div className="col-span-8 md:col-span-9  flex justify-center">
            <div className="h-screen w-full ">
              <div className="flex justify-center mb-2 mt-20">
                <h1 className="text-3xl">All Tasks</h1>
              </div>
              <div className="flex mb-2 ">
                <div className="flex justify-center w-full flex-wrap">
                  <div className="md:w-[20%] w-full mr-2">
                    <div className="flex justify-center">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="empName"
                      >
                        Status
                      </label>
                    </div>

                    <select
                      name="status"
                      value={filters.status}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          status: e.target.value,
                        })
                      }
                      className="mb-3 appearance-none block w-full px-3 py-1 text-md font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Clear</option>
                      {taskList &&
                        [...new Set(taskList.map((item) => item.status))].map(
                          (status, index) => (
                            <option key={index} value={status}>
                              {status}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                  <div className="md:w-[20%] w-full mr-2">
                    <div className="flex justify-center">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="employees"
                      >
                        Employee Name
                      </label>
                    </div>
                    <select
                      name="employees"
                      value={filters.employees}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          employees: e.target.value,
                        })
                      }
                      className="form-select form-select-lg mb-3 appearance-none block w-full px-3 py-1 text-md font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Clear</option>
                      {taskList &&
                        [
                          ...new Set(taskList.map((item) => item.employees)),
                        ].map((employees, index) => (
                          <option key={index} value={employees}>
                            {employees}
                          </option>
                        ))}
                    </select>
                  </div>
                  {/* <div className="md:w-[20%] w-full md:mr-1">
                  <div className="flex justify-center">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="startDate"
                    >
                      Start Date
                    </label>
                  </div>
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
                      name="minDate"
                      value={minDate}
                      onChange={(e) => setMinDate(e.target.value)}
                      className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-[5px] "
                      placeholder="Select Start Date"
                    />
                  </div>
                </div>
                <div className="md:w-[20%] w-full md:mr-1">
                  <div className="flex justify-center">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="startDate"
                    >
                      End Date
                    </label>
                  </div>
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
                      name="maxDate"
                      value={maxDate}
                      onChange={(e) => setMaxDate(e.target.value)}
                      className=" border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-[5px] "
                      placeholder="Select Start Date"
                    />
                  </div>
                </div>
               */}
                </div>
              </div>
              {taskList !== null && (
                <DataGrid columns={columns} rows={filteredList} autoHeight />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
