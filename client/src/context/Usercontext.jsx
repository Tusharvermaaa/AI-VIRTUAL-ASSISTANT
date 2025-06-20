import axios from 'axios';
import React, { createContext, useEffect, useState  } from 'react'
// import axios from "axios"
export  const userdatacontext=createContext({});
const Usercontext = ({children}) => {
  const [userdata , setuserdata]= useState(null);
  const [selectedimg , setselectedimg]=useState(null);
   const [frontendimg ,setFrontendimg]= useState(null);
    const [backendimg ,setBackendimg]= useState(null);
    const [selectedname ,setselectedname]= useState(null);
  const handlecurrentuser=async()=>{
    try {
      const result = await axios.get(`${value.serverurl}/current`, {withCredentials:true});
      setuserdata(result.data);
      console.log(userdata);
    }catch (error) {
      console.log("error in handlecurrentuser , "  , error)
    }
  }
  useEffect(()=>{
    handlecurrentuser();
  }, [])
  
  const value={
      serverurl:"http://localhost:7001", 
      userdata, setuserdata , frontendimg , setFrontendimg, backendimg , setBackendimg , 
      selectedimg , setselectedimg , 
      selectedname , setselectedname

  }
  return (
    <div>
        <userdatacontext.Provider value={value}>
            {children}
        </userdatacontext.Provider>
    </div>
  )
}

export default Usercontext