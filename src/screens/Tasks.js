import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskForm from "../components/TaskForm";
import { UniversalState } from "../context/StateProvider";
import { useEffect, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DetailsModal from "../components/DetailsModal";
import EditModal from "../components/EditModal";
import CreateUserModal from "../components/CreateUserModal";

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
    await fetch(`http://localhost:8000/task/all/${userId}`, {
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
            }))
          );
        })
        .catch((error) => {
          console.error("Error: ", error);
        })
    );
  };

  useEffect(() => {
    fetchCreatedTasks();
    // eslint-disable-next-line
  }, []);

  const [filters, setFilters] = useState({
    status: "",
    empName: "",
  });

  console.log(taskList);

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
                      htmlFor="empName"
                    >
                      Employee Name
                    </label>
                  </div>
                  <select
                    name="empName"
                    value={filters.empName}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        empName: e.target.value,
                      })
                    }
                    className="form-select form-select-lg mb-3 appearance-none block w-full px-3 py-1 text-md font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="">Clear</option>
                    {taskList &&
                      [...new Set(taskList.map((item) => item.empName))].map(
                        (empName, index) => (
                          <option key={index} value={empName}>
                            {empName}
                          </option>
                        )
                      )}
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
      </div>
    </div>
  );
};

export default Tasks;
