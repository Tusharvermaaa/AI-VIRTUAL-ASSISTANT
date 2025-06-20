import React from 'react'
import Card from '../components/Card'
import img1 from "../assets/image1.png"
import img2 from "../assets/image2.jpg"
import img3 from "../assets/authBg.png"
import img4 from "../assets/image4.png"
import img5 from "../assets/image5.png"
import img6 from "../assets/image6.jpeg"
// import img2 from "../assets/image2.jpg"
// import img2 from "../assets/image2.jpg"


 function Customize()  {
  return ( 
    <div className='w-full h-[100vh] bg-gradient-to-t from-[#070707] to-[#070752] flex items-center justify-center flex-col cursor-pointer'>
     <h1 className='text-[white] font-bold p-[5px] m-[30px] text-2xl'>Select Avatar of Your Virtual Assistant </h1>
           <div className="flex items-center justify-center flex-wrap w-[90%] max-w-[55%] gap-[19px]">

              <Card image={img1} />
              <Card image={img2} />
              <Card image={img3}/>
              <Card image={img4}/>
              <Card image={img5}/>
              <Card image={img6}/>
              {/* <Cardtaker/> */}

           </div>


    </div>
  )
}

export default Customize