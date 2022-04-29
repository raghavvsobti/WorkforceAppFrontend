import { Routes, Route, Navigate } from "react-router-dom";
// import About from "./screens/About";
import Auth from "./screens/Auth";
import Notes from "./screens/Notes";
import Tasks from "./screens/Tasks";
import Workforce from "./screens/Workforce";
import { UniversalState } from "./context/StateProvider";
import Weekwise from "./screens/Weekwise";

// const { default: HomePage } = require("./screens/HomePage");

function App() {
  const { isLoggedIn } = UniversalState();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/workforce" /> : <Navigate to="/auth" />
          }
        />
        {/* <Route exact path="home" element={<HomePage />} />
        <Route exact path="about" element={<About />} /> */}
        <Route
          exact
          path="auth"
          element={isLoggedIn ? <Navigate to="/workforce" /> : <Auth />}
        />
        <Route
          exact
          path="workforce"
          element={isLoggedIn ? <Workforce /> : <Navigate to="/auth" />}
        />
        <Route exact path="workforce/tasks" element={<Tasks />} />
        {/* <Route exact path="workforce/tasks/:id" element={<Tasks />} /> */}
        <Route exact path="workforce/notes" element={<Notes />} />
        <Route exact path="/weekwise" element={<Weekwise />} />
        <Route exact path="*" element={<Navigate to="/workforce" />} />
      </Routes>
    </>
  );
}

export default App;
