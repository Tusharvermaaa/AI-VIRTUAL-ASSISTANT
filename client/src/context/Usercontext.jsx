import axios from 'axios';
import React, { createContext, useEffect, useState  } from 'react'
// import axios from "axios"
export  const userdatacontext=createContext({});
const Usercontext = ({children}) => {
  const serverurl="http://localhost:7001";
  const [userdata , setuserdata]= useState(null);
  const [selectedimg , setselectedimg]=useState(null);
   const [frontendimg ,setFrontendimg]= useState(null);
    const [backendimg ,setBackendimg]= useState(null);
    const [selectedname ,setselectedname]= useState(null);
    
    const handlecurrentuser=async()=>{
      try {
        const result = await axios.get(`${serverurl}/current`, {withCredentials:true});
        setuserdata(result.data);
        // console.log(userdata);
      }catch (error) {
        console.log("error in handlecurrentuser , "  , error)
      }
    }
    useEffect(()=>{
      handlecurrentuser();
    }, [])

    // gemini route calling 
    const getTextresponse=async (query)=>{
     //  const queryasked="who are you";

      try {
            let result=await  axios.post(`${serverurl}/command/` , {query:query}, {withCredentials:true});
            console.log("result in the frontend came" , result);
            return result;
      } catch (error) {
          console.log("error in client , gettextresponse context of user " , error);
      }
    }
    
    const value={
        serverurl:"http://localhost:7001", 
        userdata, setuserdata , frontendimg , setFrontendimg, backendimg , setBackendimg , 
        selectedimg , setselectedimg , 
        selectedname , setselectedname ,
        getTextresponse
  
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
/*
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const userdatacontext = createContext({});

const Usercontext = ({ children }) => {
  const serverurl = "http://localhost:7001"; // ✅ Move it OUTSIDE `value`

  const [userdata, setuserdata] = useState(null);
  const [selectedimg, setselectedimg] = useState(null);
  const [frontendimg, setFrontendimg] = useState(null);
  const [backendimg, setBackendimg] = useState(null);
  const [selectedname, setselectedname] = useState(null);

  const handlecurrentuser = async () => {
    try {
      const result = await axios.get(`${serverurl}/current`, {
        withCredentials: true,
      });
      setuserdata(result.data);
    } catch (error) {
      console.log("error in handlecurrentuser:", error);
    }
  };

  useEffect(() => {
    handlecurrentuser();
  }, []);

  const value = {
    serverurl,
    userdata,
    setuserdata,
    frontendimg,
    setFrontendimg,
    backendimg,
    setBackendimg,
    selectedimg,
    setselectedimg,
    selectedname,
    setselectedname,
  };

  return (
    <userdatacontext.Provider value={value}>
      {children}
    </userdatacontext.Provider>
  );
};

export default Usercontext;
*/
