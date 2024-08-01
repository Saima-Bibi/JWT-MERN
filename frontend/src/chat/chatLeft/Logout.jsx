import React from 'react'
import { SlLogout } from "react-icons/sl";

function Logout() {
  return (
    <div className='h-[10vh]'>
      
    <button className='px-6 py-2 '>
    <SlLogout className='text-4xl p-2  hover:bg-slate-600 rounded-md duration-300 cursor-pointer'/>
    </button>
      
    </div>
  )
}

export default Logout
