import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UniversalState } from "../context/StateProvider";
import CreateTaskButton from "./CreateTaskButton";
import CreateUserButton from "./CreateUserButton";

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

          {userRole === "superadmin" && (
            <CreateUserButton
              userModal={userModal}
              setUserModal={setUserModal}
            />
          )}
          {userRole === "admin" && (
            <CreateUserButton
              userModal={userModal}
              setUserModal={setUserModal}
            />
          )}

          {userRole === "superadmin" && (
            <CreateTaskButton
              taskModal={taskModal}
              taskClickHandler={taskClickHandler}
            />
          )}
          {userRole === "admin" && (
            <CreateTaskButton
              taskModal={taskModal}
              taskClickHandler={taskClickHandler}
            />
          )}

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
