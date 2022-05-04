const CreateUserButton = ({ userModal, setUserModal }) => {
  return (
    <button
      onClick={() => setUserModal(true)}
      className={`w-full flex justify-center mt-0 hover:bg-black hover:text-white transition-all ease-in-out duration-500 ${
        userModal ? "bg-black text-white shadow-lg" : "bg-white text-black"
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
  );
};

export default CreateUserButton;
