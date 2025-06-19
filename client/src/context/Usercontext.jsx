import React, { createContext  } from 'react'
// import axios from "axios"
export  const userdatacontext=createContext({});
const Usercontext = ({children}) => {
    const value={
        serverurl:"http://localhost:7001"
    }

    // const [userdata , setuserdata]= useState(null);
    // const handlecurrentuser=async()=>{
    //    try {
    //      const result = await axios.get(`${value.serverurl}/curuser`, {withCredentials:true});
    //      setuserdata(result.data);
    //      console.log(userdata);
    //     }catch (error) {
    //     console.log("error in handlecurrentuser , "  , error)
    //    }
    // }
    // useEffect(()=>{
    //   handlecurrentuser();
    // }, )
     
  return (
    <div>
        <userdatacontext.Provider value={value}>
            {children}
        </userdatacontext.Provider>
    </div>
  )
}

export default Usercontext