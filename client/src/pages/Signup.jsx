import React, { useContext, useState } from "react";
import { TbMoodLookLeft } from "react-icons/tb";
import { TbMoodLookRight } from "react-icons/tb";
import bgimg from "../assets/authBg.png";
import {  useNavigate } from "react-router-dom";
import { userdatacontext } from "../context/usercontext";
import axios from "axios";
const Signup = () => {
     
        const [showpassword, setshowpassword]=useState(false);
        const [showpassword2, setshowpassword2]=useState(false);
        const navigate = useNavigate();
        const [name , setname]=useState("");
        const [email ,setemail]=useState("");
        const [password , setpassword]=useState("");
        const [password2 , setpassword2]=useState("");
        const {serverurl}=useContext(userdatacontext);

        const  handlesignup= async (e)=>{
            e.preventDefault();
            console.log(serverurl);
            if(password!=password2) navigate("/user/signup");
            const result=await axios.post(`${serverurl}/user/signup`,{email, password, name} , {withCredentials:true});
            console.log(result , " from signup .jsx");

         }


  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <form
        className="w-[90%] h-[600px] max-w-[500px] backdrop-blur-sm flex items-center justify-center gap-[20px] bg-[#00000069] flex-col shadow-2xl shadow-black"
        action="/user/signup"
        type="post"
        onSubmit={handlesignup}
      >
        <h1 className="text-white text-[28px] font-semibold mb-[32px]">
          Register to <span className="text-blue-400">Virtual Assistant</span>{" "}
        </h1>
        <input
          className="text-white w-[80%] border-2 p-[17px] rounded-3xl text-[15px]"
          type="text"
          placeholder="Enter your name"
          onChange={(e)=>{setname(e.target.value)}}
          required
        />
        <input
          className="text-white w-[80%] border-2 p-[17px] rounded-3xl text-[15px]"
          type="email"
          placeholder="Enter your email"
           onChange={(e)=>{setemail(e.target.value)}}
           required
        />
       <div className="text-white w-[80%] rounded-3xl flex items-center justify-center border-2">
          <input
            className="p-[17px] w-[84%] rounded-3xl text-[15px] outline-0"
            type={showpassword?"text":"password"}
            placeholder="Enter Your Password"
             onChange={(e)=>{setpassword(e.target.value)}}
             required
          />
          { showpassword ?
                    <TbMoodLookLeft
                      className="color-white w-[15%] text-[30px] cursor-pointer"
                      onClick={() => setshowpassword(!showpassword)}
                    />:
                     <TbMoodLookRight
                      className="color-white w-[15%] text-[30px] cursor-pointer"
                      onClick={() => setshowpassword(!showpassword)}
                    />}
        </div>
        <div className="text-white w-[80%] rounded-3xl flex items-center justify-center border-2">
          <input
            className="p-[17px] w-[84%] rounded-3xl text-[15px] outline-0"
            type={showpassword2?"text":"password"}
            placeholder="Confirm Your Password"
            onChange={(e)=>{setpassword2(e.target.value)}}
            required
          />
          { showpassword2 ?
                    <TbMoodLookLeft
                      className="color-white w-[15%] text-[30px] cursor-pointer"
                      onClick={() => setshowpassword2(!showpassword2)}
                    />:
                     <TbMoodLookRight
                      className="color-white w-[15%] text-[30px] cursor-pointer"
                      onClick={() => setshowpassword2(!showpassword2)}
                    />}
        </div>
        <button
          className="text-[#3131e4] border-2 p-[17px] rounded-full text-[15px] bg-white cursor-pointer"
          type="submit"
        >
          Register
        </button>
        <p>already have an account ?<span onClick={()=>{navigate("/user/signin")}} className="text-[#c2c2fa] text-xl">signin here</span></p>
      </form>
    </div>
  );
};

export default Signup;
