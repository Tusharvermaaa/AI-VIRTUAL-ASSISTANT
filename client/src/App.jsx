import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/signin'

function App() {
  return (
    <Routes>
       <Route path='/user/signup' element={<Signup/>} />
       <Route path='/user/signin' element={<Signin/>}/>
    </Routes>
  )
}

export default App