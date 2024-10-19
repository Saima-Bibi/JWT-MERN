import React, { useState } from 'react'
import { IoMdSend } from "react-icons/io";
import useSendMessage from '../../context/useSendMessage.js';

function TypeSend() {


  const {loading,sendMessages} = useSendMessage()
  const[Message,setMessage]=useState('')

  const handleSubmit = async (e)=>{
    e.preventDefault()
  await sendMessages(Message)
  setMessage('')
  }
  return (
    <form onSubmit={handleSubmit}>
    <div className='flex space-x-2 h-[8vh]  bg-gray-600 '>
      <div className='w-[95%]'>
      <input type="text"
       placeholder="Type here...." 
       value={Message}
       onChange={(e)=> setMessage(e.target.value)}
       className="input input-bordered m-2 h-9 rounded w-full  bg-gray-800 text-gray-300" />
      </div>
     
     <div>
        <button className='' >
        <IoMdSend className='text-3xl m-2 text-white hover:text-black'/>
        </button>
     </div>
    </div>
    </form>
  )
}

export default TypeSend
