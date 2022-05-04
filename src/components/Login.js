import { useState } from "react";
import { UniversalState } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
const Login = ({ mode, setMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = UniversalState();

  const token = localStorage.getItem("token");

  const submitForm = async (e) => {
    console.log(email, password);
    e.preventDefault();
    await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },

      credentials: "same-origin",
      body: JSON.stringify({
        email: email.toString(),
        password: password.toString(),
      }),
    }).then((response) =>
      response
        .json()
        .then((data) => {
          if (data.message === "success") {
            console.log(response);
            console.log("Success", data);
            localStorage.setItem("token", data.jwt);
            localStorage.setItem("user", data.user?.name);
            localStorage.setItem("userRole", data.user?.role);
            localStorage.setItem("userId", data.user?._id);
            setUser(data.user);
            setIsLoggedIn(true);
            navigate("/workforce");
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        })
    );
  };

  console.log("user :", user);
  console.log(isLoggedIn);

  return (
    <>
      <div className=" flex justify-center items-center w-full h-screen bg-gradient-to-r from-sky-500 to-indigo-500 ">
        <div className="sm:w-full w-4/5 max-w-lg">
          <div className=" w-full rounded-lg mb-2 bg-gray-100 p-4 flex justify-center">
            <h1 className="text-2xl">LOGIN</h1>
          </div>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={submitForm}
          >
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
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <p className="text-red-500 text-xs italic">
                Please enter password.
              </p> */}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode(!mode)}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                New here? Sign up!
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
