import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Curuser from './pages/Curuser'

function App() {
  return (
    <Routes>
       <Route path='/user/signup' element={<Signup/>} />
       <Route path='/user/signin' element={<Signin/>}/>
       <Route path='/user/curuser' element={<Curuser/>}/>
    </Routes>
  )
}

export default App