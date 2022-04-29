import { useState } from "react";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import Signup from "../components/Signup";

const Auth = () => {
  const [mode, setMode] = useState(false);

  return (
    <>
      <Navbar />

      {/* ------------------------------Login -------------------------------- */}
      {!mode && <Login mode={mode} setMode={setMode} />}

      {/* ------------------------------SIGN UP -------------------------------- */}

      {mode === true && <Signup mode={mode} setMode={setMode} />}
    </>
  );
};

export default Auth;
