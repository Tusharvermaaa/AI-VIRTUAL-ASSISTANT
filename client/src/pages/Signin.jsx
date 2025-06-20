import React, { useContext, useState } from "react";
import bgimg from "../assets/authBg.png";
import { TbMoodLookLeft } from "react-icons/tb";
import { TbMoodLookRight } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userdatacontext } from "../context/usercontext";
const Signin = () => {


  const navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { serverurl , setuserdata } = useContext(userdatacontext);
  //    const handlesignin=()=> async {
  async function handlesignin(e) {
    e.preventDefault();
    console.log()
    console.log(serverurl)
    const result = await axios.post(
      `${serverurl}/user/signin`,
      { email, password },
      { withCredentials: true }
    );
    setuserdata(result.data);
    navigate("/")
    console.log(result," is this result , hello rosult boy ");
  }

  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <form
        className="w-[90%] h-[600px] max-w-[500px] backdrop-blur-sm flex items-center justify-center gap-[20px] bg-[#00000069] flex-col shadow-2xl shadow-black"
      onSubmit={ handlesignin}
      >
        <h1 className="text-white text-[28px] font-semibold mb-[32px]">
          Signin to <span className="text-blue-400">Virtual Assistant</span>{" "}
        </h1>

        <input
          className="text-white w-[80%] border-2 p-[17px] rounded-3xl text-[15px]"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
          required
        />
        <div className="text-white w-[80%] rounded-3xl flex items-center justify-center border-2">
          <input
            className="p-[17px] w-[84%] rounded-3xl text-[15px] outline-0"
            type={showpassword ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            required
          />
          {/* <TbMoodLookLeft /> */}
          {showpassword ? (
            <TbMoodLookLeft
              className="color-white w-[15%] text-[30px] cursor-pointer"
              onClick={() => setshowpassword(!showpassword)}
            />
          ) : (
            <TbMoodLookRight
              className="color-white w-[15%] text-[30px] cursor-pointer"
              onClick={() => setshowpassword(!showpassword)}
            />
          )}
        </div>

        <button
          className="text-[#3131e4] border-2 p-[17px] rounded-full text-[15px] bg-white cursor-pointer"
          type="submit"
          
        >
          Sign-up
        </button>
        <p className="text-[15px]">
          don't have an account?{" "}
          <span
            className="text-[#c2c2fa] cursor-pointer font-bold"
            onClick={() => {
              navigate("/signup");
            }}
          >
            signup here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signin;
