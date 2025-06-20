import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Customize from "./pages/Customize";
import Customize2 from "./pages/Customize2";
import { userdatacontext } from "./context/usercontext";
import Home from "./pages/Home.jsx";

function App() {
  const { userdata , selectedimg  ,selectedname} = useContext(userdatacontext);
  return (
    <Routes>
      <Route
        path="/"
        element={
         userdata &&  selectedimg && selectedname ? <Home/> : !userdata? <Navigate to={"/signin"}/> : <Navigate to={"/customize"}/>
        }
        // element={
        //   userdata?.assistantimg && userdata?.assistantname ? (
        //     <Home />
        //   ) : (
        //     <Navigate to={"/customize"} />
        //   )
        // }
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
