import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Customize from './pages/Customize'
import { userdatacontext } from './context/usercontext'

function App() {
  const {userdata, setuserdata} =useContext(userdatacontext);
  return (
    <Routes>
       <Route path='/' element={
        userdata?.assistantimg && userdata?.assistantname ?
       <Home/> : <Navigate to={"/customize"}/>} />

        <Route path='/signup' element={!userdata?<Signup/>: <Navigate to={"/"}/>}/>
       <Route path='/signin' element={!userdata?<Signin/>: <Navigate to={"/customize"}/>}/>
       <Route path='/customize' element={userdata?<Customize/>: <Navigate to={"/signin"}/>}/>

    </Routes>
  )
}

export default App