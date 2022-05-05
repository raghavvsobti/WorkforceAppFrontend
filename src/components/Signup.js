import { useState } from "react";
import { BASE_URL } from "../constants";

// import { useNavigate } from "react-router-dom";
const Signup = ({ mode, setMode }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    console.log(email, password, name);
    e.preventDefault();
    await fetch(` ${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name.toString(),
        email: email.toString(),
        password: password.toString(),
      }),
    })
      .then((response) => {
        console.log(response);
        setMode(false);
        // navigate("/auth");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-sky-500 to-indigo-500 ">
      <div className="sm:w-full w-4/5 max-w-lg">
        <div className=" w-full rounded-lg mb-2 bg-gray-100 p-4 flex justify-center">
          <h1 className="text-2xl">SIGN UP</h1>
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
          <div className="mb-6">
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
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
            <button
              onClick={() => setMode(!mode)}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Already have an account? Sign in!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
