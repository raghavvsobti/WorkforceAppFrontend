import { useState } from "react";
import { UniversalState } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const { setNoteModal } = UniversalState();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const userId = localStorage.getItem("userId");
  console.log(userId);

  const submitHandler = async (e) => {
    // console.log(name, description, empName, startDate, endDate);
    e.preventDefault();
    await fetch("http://localhost:8000/note/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        title: title,
        description: description,
        userId: userId,
      }),
    })
      .then((response) => {
        // console.log(response);
        setNoteModal(false);
        navigate("/workforce/notes");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="sm:w-full w-4/5 max-w-lg">
          <div className=" w-full rounded-lg mb-2 bg-gray-100 p-4 flex justify-center">
            <h1 className="text-2xl">Add a Note</h1>
          </div>
          <form
            onSubmit={submitHandler}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Note Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                name="description"
                rows={7}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <button
                className="bg-blue-500 w-full mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
              <button
                className="bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => setNoteModal(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNote;
