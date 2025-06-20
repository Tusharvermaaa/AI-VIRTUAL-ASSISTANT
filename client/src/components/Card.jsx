import React from "react";
import { useContext } from "react";
import { userdatacontext } from "../context/usercontext";

function Card({ image, alttag }) {
  const { selectedimg, setselectedimg } = useContext(userdatacontext);
  return (
    <div
      className={
        `minw-[290px] h-[200px] bg-blue-500 border-2 border-[#070765] rounded-2xl overflow-hidden
  hover:shadow-2xl hover:shadow-blue-900 hover:border-2 hover:border-b-blue-300 cursor-pointer
 ${(selectedimg == image)
          ? "shadow-blue-900 hover:border-2 border-b-blue-400 cursor-pointer "
          : null}

  `}
      onClick={() => 
        {setselectedimg(image)
        console.log(selectedimg)}
      }
    >
      <img
        src={image}
        alt={alttag}
        className="object-cover h-full w-[150px] min-h-[300px] "
      />
    </div>
  );
}

export default Card;
