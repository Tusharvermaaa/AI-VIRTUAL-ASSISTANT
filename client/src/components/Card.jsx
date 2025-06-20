import React from 'react'

function Card({image , alttag}) {
  return (
    <div className='minw-[290px] h[220px] bg-blue-500 border-2 border-[blue] rounded-2xl overflow-hidden'>
       <img src={image} alt={alttag} className='object-cover h-full w-[150px] min-h-[300px] ' />
    </div>
  )
}

export default Card