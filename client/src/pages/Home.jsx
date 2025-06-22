import React, { useContext } from 'react'
import { userdatacontext } from '../context/usercontext'
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { RiLogoutCircleLine } from "react-icons/ri";

import { useNavigate  } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const {serverurl}= useContext(userdatacontext);
  const navigate= useNavigate();
  // const {selectedname , selectedimg} = useContext(userdatacontext);
   const handlelogout=async ()=> {
    try {
      
      const result=await axios.get(`${serverurl}/user/logout` , {withCredentials:true});
      console.log(result.data,"after deletion");
          window.location.href = '/signin';
      // navigate("/signin");
    } catch (error) {
      console.log("logout error ", error)
    }
  }

   const {userdata} = useContext(userdatacontext);
  //  console.log(userdata ,"  inside the home page ")
  return (
   <div className="w-full h-[100vh] bg-gradient-to-t from-[#070707] to-[#070752] flex items-center justify-center flex-col">

             <div onClick={()=>navigate("/customize")} className="font-bold text-2xl text-[white]  cursor-pointer absolute top-15  right-15 w-[100px]" >
      <MdOutlineArrowBackIosNew className="font-bold text-2xl text-[white] cursor-pointer "/> Customize
             </div>
             <div onClick={handlelogout } className="font-bold text-2xl text-[white]  cursor-pointer absolute top-39  right-15 w-[100px]" >
      <RiLogoutCircleLine className="font-bold text-2xl text-[white] cursor-pointer "/> Logout
             </div>
            {/* <MdOutlineArrowBackIosNew className="font-bold text-2xl text-[white]  cursor-pointer absolute top-15  left-15  "  onClick={()=>navigate("/customize")} /> */}
      
         <h1 className='text-[white] m-[22px] text-3xl text-[#5656f3] '>{`${userdata.assistantname}`}</h1>
        <div  className= "minw-[300px] h-[300px] w-[300px] bg-blue-500 border-2 border-[#070765] rounded-full overflow-hidden hover:shadow-2xl hover:shadow-blue-900 hover:border-2 hover:border-b-blue-300 cursor-pointer flex items-center justify-center" >
          <img
            src={`${userdata.assistantimage}`}
            className="object-cover h-full w-full min-h-[300px] "
          />
        </div>
    </div>

  )
}

export default Home