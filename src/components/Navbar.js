// import Button from "./Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UniversalState } from "../context/StateProvider";
import DropButton from "./DropButton";

const Navbar = () => {
  const { isLoggedIn } = UniversalState();

  const navigate = useNavigate();

  let Links = [
    // {
    //   name: "Workforce",
    //   href: "/workforce",
    // },
  ];

  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [lock, setLock] = useState();

  useEffect(() => {
    if (location.pathname) {
      setLock(location.pathname);
    }
  }, [location.pathname, lock]);

  return (
    <div className="shadow-md w-full fixed top-0 left-0 mb-2 z-50 bg-gray-200">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <button
          onClick={() => isLoggedIn && navigate("/workforce")}
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800 hover:shadow-md transition ease-in duration-300 hover:rounded-lg"
        >
          <span className="mb-1">
            {/*  HERE GOES THE ICON */}
            <svg className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            {/* ENDS HERE */}
          </span>
          Workforce.
        </button>

        <div
          onClick={() => setOpen(!open)}
          className="flex text-4xl items-center text-black absolute right-8 top-3.5 cursor-pointer md:hidden "
        >
          {!open ? (
            <svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="h-8 w-8"
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
          )}
        </div>

        <ul
          className={`md:flex cursor-pointer md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 md:opacity-100 transition-all ease-in duration-500 ${
            open ? "top-10 opacity-100 " : "top-[-490px] "
          } `}
        >
          {isLoggedIn &&
            Links.map((link) => (
              <li
                key={link.name}
                className="md:ml-8 flex justify-center text-xl md:my-0 my-7 mx-0 text-center xs:mt-2"
              >
                <Link
                  to={link.href}
                  className={`text-gray-800 hover:text-gray-400  ${
                    lock === link.href ? "font-semibold" : "font-normal"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

          {/* <div className={`flex justify-center md:ml-7 ${open ? "mt-10" : ""}`}>
            <Button>{isLoggedIn ? "Logout" : "Login"}</Button>
          </div> */}
          <div className={` ${open ? "mt-10 flex justify-center" : ""}`}>
            {isLoggedIn ? <DropButton /> : ""}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
