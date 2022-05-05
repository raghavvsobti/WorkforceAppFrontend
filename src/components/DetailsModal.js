import { useEffect, useState } from "react";

import { UniversalState } from "../context/StateProvider";

const DetailsModal = ({ id }) => {
  const { openModal, setOpenModal, setEditModal } = UniversalState();
  const [taskList, setTaskList] = useState(null);

  const editHandler = () => {
    setOpenModal(false);
    setEditModal(true);
  };

  const token = localStorage.getItem("token");
  const fetchCreatedTask = async () => {
    await fetch(` ${process.env.BASE_URL}/task/${id}`, {
      credentials: "include",
      headers: {
        Authorization: `${token}`,
      },
    }).then((response) =>
      response
        .json()
        .then((data) => {
          setTaskList(data);
        })
        .catch((error) => {
          console.error("Error: ", error);
        })
    );
  };

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (openModal) {
      fetchCreatedTask();
    }
    // eslint-disable-next-line
  }, [openModal]);

  console.log(taskList);

  const empName = taskList?.empName?.map((item, index) => item?.name);

  // console.log(empName);

  return (
    <>
      <div className="relative flex justify-center items-center w-full h-screen">
        <div className="sm:w-full w-4/5 max-w-lg">
          <div className=" w-full rounded-lg mb-2 bg-gray-100 p-4 flex justify-center">
            <h1 className="text-2xl">Task Details</h1>
          </div>

          <div
            className={`bg-white shadow-md rounded ${
              userId !== taskList?.user ? "pb-[10px]" : ""
            }`}
          >
            <div className="px-8 pt-6">
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
                <p className="text-md">
                  {" "}
                  {new Date(taskList?.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="grid grid-cols-3">
                <p className="text-md font-semibold">End Date</p>
                <p className="text-md text-center">:</p>
                <p className="text-md">
                  {new Date(taskList?.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="grid grid-cols-3">
                <p className="text-md font-semibold">Status</p>
                <p className="text-md text-center">:</p>
                <p className="text-md">{taskList?.status}</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full mt-2 p-[1px]">
              {userId === taskList?.user && (
                <button
                  className="bg-blue-500 w-full m-[15px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                  type="button"
                  onClick={editHandler}
                >
                  Edit
                </button>
              )}
              <button
                className="text-black hover:text-red-700"
                type="button"
                onClick={() => setOpenModal(false)}
              >
                <svg
                  className={`h-8 w-8 fixed  md:right-[33.5%] right-[60px]  ${
                    userId === taskList?.user
                      ? "top-[230px] md:top-[252px]"
                      : "top-[280px]"
                  } `}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsModal;
