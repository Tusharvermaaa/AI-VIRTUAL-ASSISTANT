import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Customize from "./pages/Customize";
import Customize2 from "./pages/Customize2";
import { userdatacontext } from "./context/usercontext";
import Home from "./pages/Home.jsx";

function App() {

  const { userdata , selectedimg  , selectedname} = useContext(userdatacontext);
  //  const [hasassistant , sethasassistant]= useState(null);
  //  sethasassistant(userdata.assistantimage && userdata.assistantname)
  // const hasassistant=userdata.assistantimage && userdata.assistantname;
  
  return (
    <Routes>

      <Route
        path="/"
        element={
         (selectedname && selectedimg) ? <Home/> : <Navigate to={"/customize"}/>
        }
      />
      <Route
        path="/signup"
        element={!userdata ? <Signup /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userdata ? <Signin /> : <Navigate to={"/customize"} />}
      />
      <Route
        path="/customize"
        element={userdata ? <Customize /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/customize2"
        element={selectedimg ? <Customize2/> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
}

export default App;
