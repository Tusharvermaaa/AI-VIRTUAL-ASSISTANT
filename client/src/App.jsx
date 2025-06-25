import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Customize from "./pages/Customize.jsx";
import Customize2 from "./pages/Customize2.jsx";
import { userdatacontext } from "./context/Usercontext.jsx";
import Home from "./pages/Home.jsx";
import axios from "axios";
axios.defaults.withCredentials = true;
function App() {
  const { userdata, selectedimage } = useContext(userdatacontext);
  //  const [hasassistant , sethasassistant]= useState(null);
  //  sethasassistant(userdata.assistantimage && userdata.assistantname)
  // const hasassistant=userdata?.assistantimage && userdata?.assistantname;

  return (
    <Routes>
      <Route
        path="/"
        element={
          userdata?.assistantimage && userdata?.assistantname ? (
            <Home />
          ) : (
            <Navigate to={"/customize"} />
          )
        }
      />
      <Route
        path="/signup"
        element={!userdata ? <Signup /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userdata ? <Signin /> : <Navigate to={"/"} />}
      />
      <Route
        path="/customize"
        element={userdata ? <Customize /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/customize2"
        element={userdata ? <Customize2 /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
}

export default App;
