import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UniversalState } from "../context/StateProvider";

const DropButton = () => {
  const [active, setActive] = useState(false);
  const [user, setUserr] = useState(null);

  const { setIsLoggedIn, setUser, setTaskModal, setUserModal } =
    UniversalState();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const logoutHandler = async () => {
    await fetch("http://localhost:8000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      credentials: "include",
    }).then((response) =>
      response
        .json()
        .then((data) => {
          console.log(response);
          console.log("Success", data);
          localStorage.clear();
          setIsLoggedIn(false);
          setUser(null);
          setTaskModal(false);
          setUserModal(false);
          navigate("/auth");
        })
        .catch((error) => {
          console.error("Error: ", error);
        })
    );
  };

  useEffect(() => {
    setUserr(localStorage.getItem("user"));
  }, []);

  return (
    <>
      {/* w-[170px] */}
      <div className="bg-white w-auto shadow flex justify-center items-center h-11 px-4">
        <div
          className={`relative border-b-4 border-transparent py-3  ${
            active ? "border-indigo-700 transform transition duration-300" : ""
          } `}
        >
          <div
            onClick={() => setActive(!active)}
            className="flex justify-center items-center space-x-3 cursor-pointer"
          >
            <div className="w-12 h-10 overflow-hidden border-gray-900">
              <svg
                className="h-full w-full"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="font-semibold  text-gray-900 text-lg">
              <div className="cursor-pointer">{user}</div>
            </div>
          </div>
          {active && (
            <div className="absolute w-60 px-5 py-3 right-[-20px] mr-0 bg-white rounded-lg shadow border  mt-5 z-10">
              <ul className="space-y-3 ">
                <li className="font-medium">
                  <button
                    disabled
                    type="button"
                    className="flex w-full items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                  >
                    <div className="mr-3">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                    Profile
                  </button>
                </li>
                <li className="font-medium">
                  <button
                    disabled
                    type="button"
                    className="flex w-full items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                  >
                    <div className="mr-3">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    Settings
                  </button>
                </li>
                <hr className="" />
                <li className="font-medium">
                  <button
                    onClick={logoutHandler}
                    className="flex z-5 w-full items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                  >
                    <div className="mr-3 text-red-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DropButton;
