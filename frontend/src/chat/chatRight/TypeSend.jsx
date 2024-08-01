import React from 'react'
import { IoMdSend } from "react-icons/io";

function TypeSend() {
  return (
    <div className='flex space-x-2 h-[8vh]  bg-gray-600 '>
      <div className='w-[95%]'>
      <input type="text" placeholder="Type here...." className="input input-bordered m-2 h-9 rounded w-full  bg-gray-800 text-gray-300" />
      </div>
     
     <div>
        <button className=''>
        <IoMdSend className='text-3xl m-2 text-white hover:text-black'/>
        </button>
     </div>
    </div>
  )
}

export default TypeSend
