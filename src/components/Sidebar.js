import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UniversalState } from "../context/StateProvider";

const Sidebar = () => {
  const { taskModal, setTaskModal, userModal, setUserModal } = UniversalState();

  const [lock, setLock] = useState();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      setLock(location.pathname);
    }
  }, [location.pathname, lock]);

  const taskClickHandler = () => {
    setUserModal(false);
    setTaskModal(true);
  };

  const navigate = useNavigate();

  const viewTaskHandler = () => {
    setUserModal(false);
    setTaskModal(false);
    navigate("/workforce/tasks");
  };

  const viewNotesHandler = () => {
    setUserModal(false);
    setTaskModal(false);
    navigate("/workforce/notes");
  };

  const userRole = localStorage.getItem("userRole");

  return (
    <>
      <div className="mt-0  w-auto xs:w-[60px] md:w-[120px] h-full h-min-screen bg-gray-200 z-1 shadow-lg">
        <div className="bg-white h-full md:w-[120px] w-[100px] pt-[64px] align-middle fixed">
          <button
            onClick={() => navigate("/workforce")}
            className={`w-full flex justify-center mt-2 mb-0 pl-[0px] hover:bg-black hover:text-white transition-all ease-in-out duration-500  ${
              lock === "/workforce"
                ? "bg-black text-white shadow-lg"
                : "bg-white text-black"
            }`}
          >
            <div className="w-full group ">
              <div className="flex justify-center mr-2 pt-2 mt-2 ">
                <svg
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <div className="flex justify-center">
                <h1
                  className={`text-1xl group-hover:block text-center group-hover:px-0 px-0 transition-all ease-out duration-200 ${
                    lock === "/workforce" ? "" : "hidden"
                  }`}
                >
                  Progress
                </h1>
              </div>
            </div>
          </button>

          {userRole === "admin" ||
            (userRole === "superadmin" && (
              <button
                onClick={() => setUserModal(true)}
                className={`w-full flex justify-center mt-0 hover:bg-black hover:text-white transition-all ease-in-out duration-500 ${
                  userModal
                    ? "bg-black text-white shadow-lg"
                    : "bg-white text-black"
                }`}
              >
                <div className="w-full group ">
                  <div className="flex justify-center mx-1 pt-2 mt-2 ">
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
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-center">
                    <h1
                      className={`text-1xl group-hover:block text-center group-hover:px-0 px-0 transition-all ease-out duration-200  ${
                        userModal ? "" : "hidden"
                      }`}
                    >
                      Create a User
                    </h1>
                  </div>
                </div>
              </button>
            ))}

          {userRole === "admin" ||
            (userRole === "superadmin" && (
              <button
                onClick={taskClickHandler}
                className={`w-full flex justify-center mt-0 hover:bg-black hover:text-white transition-all ease-in-out duration-500  ${
                  taskModal
                    ? "bg-black text-white shadow-lg"
                    : "bg-white text-black"
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
            ))}

          <button
            onClick={viewTaskHandler}
            className={`w-full flex justify-center mt-0 hover:bg-black hover:text-white transition-all ease-in-out duration-500  ${
              lock === "/workforce/tasks"
                ? "bg-black text-white shadow-lg"
                : "bg-white text-black"
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex justify-center">
                <h1
                  className={`text-1xl group-hover:block text-center group-hover:px-0 px-0 transition-all ease-out duration-200 ${
                    lock === "/workforce/tasks" ? "" : "hidden"
                  }`}
                >
                  Tasks Grid
                </h1>
              </div>
            </div>
          </button>

          <button
            onClick={viewNotesHandler}
            className={`w-full flex justify-center mt-0 hover:bg-black hover:text-white transition-all ease-in-out duration-500  ${
              lock === "/workforce/notes"
                ? "bg-black text-white shadow-lg"
                : "bg-white text-black"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div className="flex justify-center">
                <h1
                  className={`text-1xl group-hover:block text-center group-hover:px-0 px-0 transition-all ease-out duration-200 ${
                    lock === "/workforce/notes" ? "" : "hidden"
                  }`}
                >
                  Notes
                </h1>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
