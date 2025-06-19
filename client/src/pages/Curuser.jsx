import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { userdatacontext } from '../context/usercontext';

const Curuser =  () => {
    const {serverurl}= useContext(userdatacontext);
    console.log("server url is from curuser.js from client " , serverurl)
    // let curuser=;
    const [curuser , setcuruser]= useState({"status" :"not known"})
   const handlecuruser =async ()=>{

       axios.get(`${serverurl}/current` , {withCredentials:true} )
         .then(res=>{
          setcuruser(res.data);       
          console.log("getting request at current in servesr " , curuser )
         })
         .catch(err=>{console.log("error ", err)})
   }
   useEffect(()=>{
    handlecuruser();
    },[])
  return (
    <div>{` Curuser created now , ${JSON.stringify(curuser, null)}`}</div>
  )
}

export default Curuser