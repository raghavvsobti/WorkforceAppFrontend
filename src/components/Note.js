import { UniversalState } from "../context/StateProvider";

const Note = ({ title, description, id }) => {
  const { setEditNote, selectedNote, setSelectedNote } = UniversalState();

  const editNoteHandler = () => {
    setSelectedNote({ title, description, id });
    console.log(selectedNote);
    setEditNote(true);
  };

  return (
    <>
      <div className="shadow-xl drop-shadow-2xl bg-white text-black text-md w-[300px] h-auto rounded-lg p-4  mr-2 mb-2 ml-2">
        <div className=" relative flex justify-center border-b-4 border-gray-200 inset-0">
          <header className="text-2xl">{title}</header>
          <button
            onClick={editNoteHandler}
            className="absolute right-1 top-[-2px] hover:text-white hover:bg-black hover:rounded-full p-1 transition-all ease-in duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="text-md mt-2">
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};

export default Note;
