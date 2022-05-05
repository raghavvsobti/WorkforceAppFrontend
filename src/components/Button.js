import { useNavigate } from "react-router-dom";
import { UniversalState } from "../context/StateProvider";
import { BASE_URL } from "../constants";
const Button = (props) => {
  const { isLoggedIn, setIsLoggedIn, setUser, setTaskModal, setUserModal } =
    UniversalState();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  const submitHandler = () => {
    if (isLoggedIn) {
      logoutHandler();
    } else {
      navigate("/auth");
    }
  };

  return (
    <button
      onClick={submitHandler}
      className="bg-blue-600 text-white font=[Poppins] py-2 px-6 rounded md:ml-2 hover:bg-blue-700 duration-500 hover:shadow-lg"
    >
      {props.children}
    </button>
  );
};

export default Button;
