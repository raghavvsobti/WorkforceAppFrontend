const { default: Navbar } = require("../components/Navbar");

const HomePage = () => {
  return (
    <div>
      <Navbar />

      <div className=" flex justify-center items-center h-screen bg-gradient-to-r from-sky-500 to-indigo-500">
        <div className="block">
          <h1 className="text-4xl w-full">Welcome to Workforce!</h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
