import React, { useContext } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { userdatacontext } from "../context/usercontext";
function Customize2() {
  const navigate = useNavigate();
  const {selectedname ,setselectedname } = useContext(userdatacontext);
  return (
    <div className="w-full h-[110vh] bg-gradient-to-t from-[#070707] to-[#070752] flex items-center justify-center flex-col">
      <h1 className="text-[white] font-bold p-[5px] m-[30px] text-2xl">
        Enter the <span className="text-blue-400">Name</span> of {" "}
        <span className="text-blue-400">Avatar</span>
      </h1>
      <div className="flex items-center justify-center flex-wrap w-[60%] gap-[19px]">
          <input type="text" className="border-2 border-b-blue-300 w-[100%] h-[50px] text-xl font-bold p-[15px] text-blue-200  rounded-4xl text-center" placeholder="eg : Alpha" 
           onChange={(e)=>{console.log(e.target.value, "selectedanme "); setselectedname(e.target.value)}}
          />
      </div>

     
          <input
          //  here i am not getting the slectedname , dont know why 
           onClick={()=>{console.log("entered name by the user is " , selectedname); navigate("/") }}
            type="button"
            className="cursor-pointer font-bold text-[20px] bg-amber-50 rounded-full text-[#06063e] m-[50px] p-[20px] pt-[10px] pb-[10px] hover:shadow-2xl hover:shadow-blue-500 "
            value="Next"
          />
        
    </div>
  );
}

export default Customize2;
