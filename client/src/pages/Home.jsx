import React, { useContext } from 'react'
import { userdatacontext } from '../context/usercontext'

const Home = () => {
  const {selectedname , selectedimg} = useContext(userdatacontext);
  return (
   <div>
       {`${selectedname} is the name of ai assistant `}
       <img src={`${selectedimg}`} alt="" />
    </div>
  )
}

export default Home