import { useEffect, useState } from "react";
import CreateNote from "../components/CreateNote";
import CreateUserModal from "../components/CreateUserModal";
import EditNote from "../components/EditNote";
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import Sidebar from "../components/Sidebar";
import TaskForm from "../components/TaskForm";
import { UniversalState } from "../context/StateProvider";

const Notes = () => {
  const {
    taskModal,
    noteModal,
    setNoteModal,
    editNote,
    userModal,
    // isLoggedIn,
  } = UniversalState();

  const [notesList, setNotesList] = useState(null);

  const token = localStorage.getItem("token");

  const fetchCreatedNotes = async () => {
    await fetch("http://localhost:8000/note/all", {
      credentials: "include",
      headers: {
        Authorization: `${token}`,
      },
    }).then((response) =>
      response
        .json()
        .then((data) => {
          setNotesList(
            data.map((item, index) => ({
              index: index + 1,
              ...item,
            }))
          );
        })
        .catch((error) => {
          console.error("Error: ", error);
        })
    );
  };

  useEffect(() => {
    fetchCreatedNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      {taskModal && (
        <div className="bg-black bg-opacity-50 absolute inset-0 z-10 h-full">
          <TaskForm />
        </div>
      )}
      {noteModal && (
        <div className="bg-black bg-opacity-50 absolute inset-0 z-10 h-full">
          <CreateNote />
        </div>
      )}
      {editNote && (
        <div className="bg-black bg-opacity-50 absolute inset-0 z-10 h-full">
          <EditNote />
        </div>
      )}
      {userModal && (
        <div className="bg-black bg-opacity-50 absolute inset-0 z-10 h-full">
          <CreateUserModal />
        </div>
      )}

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-3 md:col-span-1 md:mr-10">
          <Sidebar />
        </div>
        <div className="col-span-9 md:col-span-11 mt-20">
          <div className=" relative flex justify-center border-b-2 mb-3 p-4">
            <p className="text-4xl">Notes!</p>
            <button
              onClick={() => setNoteModal(true)}
              className="hover:bg-black hover:text-white bg-gray-200 text-black rounded-lg px-4 py-2 absolute right-0 top-3 mr-2 transition-all ease-in duration-300"
            >
              <svg className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-row flex-wrap justify-center md:justify-start ">
            {notesList &&
              notesList.map((note, index) => (
                <Note
                  key={index}
                  title={note?.title}
                  id={note?.id}
                  description={note?.description}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
