import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import Card from "../components/Card";
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/authBg.png";
import img4 from "../assets/image4.png";
import img5 from "../assets/image5.png";
import img6 from "../assets/image6.jpeg";
import { useRef } from "react";
import { useContext } from "react";
import { userdatacontext } from "../context/usercontext";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
// import img2 from "../assets/image2.jpg"
// import img2 from "../assets/image2.jpg"

function Customize() {

  const { selectedimg,setselectedimg, frontendimg, setFrontendimg, setBackendimg } =
    useContext(userdatacontext);
    const navigate =useNavigate();
  const inputImg = useRef();
  
  const handlefileinput = (e) => {
    const file = e.target.files[0];
    setBackendimg(file);
    setFrontendimg(URL.createObjectURL(file));
    // console.log(file);
    // console.log(URL.createObjectURL(file));
    // navigate("/")
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[#070707] to-[#070752] flex items-center justify-center flex-col">
    <MdOutlineArrowBackIosNew className="font-bold text-2xl text-[white]  cursor-pointer absolute top-15  left-15  "  onClick={()=>navigate("/")} />
      <h1 className="text-[white] font-bold p-[5px] m-[30px] text-2xl">
        Select <span className="text-blue-400">Avatar</span> of Your{" "}
        <span className="text-blue-400"> Virtual Assistant </span>
      </h1>
      <div className="flex items-center justify-center flex-wrap w-[60%] gap-[19px]">
        <Card image={img1} />
        <Card image={img2} />
        <Card image={img3} />
        <Card image={img4} />
        <Card image={img5} />
        <Card image={img6} />
    
      <div
          onClick={() => {
            inputImg.current.click();
            setselectedimg("input") 
             // it is printing previous state cause for current state it will be update and this thing takes time
          }}
          className={`minw-[290px] minh-[220px] border-2 border-[#070765] rounded-2xl overflow-hidden
   hover:shadow-blue-900 
           hover:shadow-2xl  cursor-pointer hover:border-2 hover:border-amber-50
           ${selectedimg == "input" ? "border-2 border-amber-50" : null}
           `}
        >
          <input
            type="file"
            accept="image/*"
            ref={inputImg}
            hidden
            onChange={handlefileinput}
          />
          {!frontendimg && (
            <IoIosAddCircleOutline className="text-9xl text-white" />
          )}
          {frontendimg && (
            <img
              src={frontendimg}
              alt="user eslected img"
              className="object-cover h-full w-[150px] minh-[300px] "
            />
          )}
        </div>
      </div>

      {
        (selectedimg )&& (
          <input
           onClick={()=>{ navigate("/customize2")}}
            type="button"
            className="cursor-pointer font-bold text-[20px] bg-amber-50 rounded-full text-[#06063e] m-[50px] p-[20px] pt-[10px] pb-[10px] hover:shadow-2xl hover:shadow-blue-500 "
            value="Next"
          />
        )
      }
    </div>
  );
}

export default Customize;
