import { useEffect, useState } from "react";
import { UniversalState } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const EditNote = () => {
  const navigate = useNavigate();
  const { setEditNote, setSelectedNote, selectedNote, user } = UniversalState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [setNoteList] = useState(null);

  const token = localStorage.getItem("token");

  const submitHandler = async (e) => {
    // console.log(name, description, empName, startDate, endDate);
    e.preventDefault();
    await fetch(`${BASE_URL}/note/${selectedNote?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        title: title,
        description: description,
        userId: user?._id,
      }),
    })
      .then((response) => {
        // console.log(response);
        setEditNote(false);
        navigate("/workforce/notes");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const fetchCreatedNote = async () => {
    await fetch(`${BASE_URL}/note/${selectedNote?.id}`, {
      credentials: "include",
      headers: { Authorization: `${token}` },
    }).then((response) =>
      response
        .json()
        .then((data) => {
          //   console.log(response);
          // console.log(data);
          setNoteList(data);
        })
        .catch((error) => {
          console.error("Error: ", error);
        })
    );
  };

  useEffect(() => {
    fetchCreatedNote();
    // eslint-disable-next-line
  }, []);

  const deleteNote = () => {
    deleteEntry();
    setEditNote(false);
  };

  const userId = localStorage.getItem("userId");

  const deleteEntry = async () => {
    await fetch(`${BASE_URL}/${userId}/${selectedNote?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      credentials: "include",
    })
      .then(() => {
        setEditNote(false);
        navigate("/workforce/notes");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const exitHandler = () => {
    setEditNote(false);
    setSelectedNote(null);
  };

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="sm:w-full w-4/5 max-w-lg">
          <div className=" w-full rounded-lg mb-2 bg-gray-100 p-4 flex justify-center">
            <h1 className="text-2xl">Edit {selectedNote?.title}</h1>
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
                placeholder="Title"
                name="title"
                defaultValue={selectedNote?.title}
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
                defaultValue={selectedNote?.description}
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
                onClick={exitHandler}
              >
                Close
              </button>
            </div>
            <div className="flex items-center justify-between w-full mt-2">
              <button
                className="bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={deleteNote}
              >
                Delete Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditNote;
