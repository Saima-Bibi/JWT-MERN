import axios from 'axios';
import React, {useState}from 'react'
import toast from 'react-hot-toast';
import { SlLogout } from "react-icons/sl";
import Cookies from 'js-cookie'
function Logout() {

  const[loading, setLoading]= useState(false)

const handleLogout = async()=>{
  setLoading(true)
  try {
    
    const res = await axios.post('/api/user/logout')
    if(res.data){
    Cookies.remove('jwt')  
    toast(res.data.message)
    setLoading(false)
    window.location.reload()
    }

  } catch (error) {
    if(error.response){
      toast(error.response.data.message)
      console.log(error)
    }
  }
}




  return (
    <div className='h-[10vh]'>
      
    <button className='px-6 py-2 '>
    <SlLogout className='text-4xl p-2  hover:bg-slate-600 rounded-md duration-300 cursor-pointer' onClick={handleLogout}/>
    </button>
      
    </div>
  )
}

export default Logout
