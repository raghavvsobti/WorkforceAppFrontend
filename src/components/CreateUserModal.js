import { useState } from "react";
import { BASE_URL } from "../constants";

import { UniversalState } from "../context/StateProvider";

const CreateUserModal = () => {
  const { setUserModal } = UniversalState();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const userId = localStorage.getItem("userId");

  const userRole = localStorage.getItem("userRole");

  const submitHandler = async (e) => {
    console.log(email, password, name);
    e.preventDefault();
    await fetch(` ${BASE_URL}/auth/create-member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name.toString(),
        email: email.toString(),
        password: password.toString(),
        createdBy: userId,
      }),
    })
      .then((response) => {
        console.log(response);
        setUserModal(false);
        // navigate("/auth");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const adminSubmitHandler = async (e) => {
    console.log(email, password, name);
    e.preventDefault();
    await fetch(` ${BASE_URL}/auth/create-member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name.toString(),
        email: email.toString(),
        password: password.toString(),
        createdBy: userId,
        role: role,
      }),
    })
      .then((response) => {
        console.log(response);
        setUserModal(false);
        // navigate("/auth");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <div>
      <div className="relative flex justify-center items-center w-full h-screen">
        <div className=" sm:w-full w-4/5 max-w-lg">
          <div className=" w-full rounded-lg mb-2 bg-gray-100 p-4 flex justify-center">
            <h1 className="text-2xl">Create User</h1>
          </div>
          <form
            onSubmit={
              userRole === "superadmin" ? adminSubmitHandler : submitHandler
            }
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password2"
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {userRole === "superadmin" && (
              <div className="flex justify-center">
                <div className="mb-1 w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <select
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-select form-select-lg mb-3 appearance-none block w-full px-3 py-1 text-md font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option disabled>Select an Option</option>
                    <option value="superadmin">Admin</option>
                    <option value="admin">Manager</option>
                    <option value="user">Member</option>
                  </select>
                </div>
              </div>
            )}
            <div className="">
              <button
                className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create
              </button>
              <button
                onClick={() => setUserModal(false)}
                className=" font-bold text-lg text-black hover:text-red-800"
              >
                <svg
                  className={`h-8 w-8 fixed  ${
                    userRole === "superadmin"
                      ? "md:top-[157px] md:right-[34%] right-[60px] top-[157px]"
                      : "md:top-[195px] md:right-[33.5%] right-[60px] top-[195px]"
                  }`}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
