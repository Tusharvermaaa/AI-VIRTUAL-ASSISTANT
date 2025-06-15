import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Usercontext from './context/usercontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <Usercontext>
       <App />
   </Usercontext>
  </BrowserRouter>,
)
