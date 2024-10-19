import axios from 'axios';
import React, {useState}from 'react'
import toast from 'react-hot-toast';
import { SlLogout } from "react-icons/sl";
import Cookies from 'js-cookie'
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
function Logout() {

  const[loading, setLoading]= useState(false)
  const navigate = useNavigate()

const handleLogout = async()=>{
  setLoading(true)
  try {
    
    const res = await axios.post('/api/user/logout')
    if(res.data){
    Cookies.remove('jwt')  
    toast(res.data.message)
    setLoading(false)
    window.location.reload()
    navigate('/login')
    }

  } catch (error) {
    if(error.response){
      localStorage.removeItem('App')
      toast(error.response.data.message)
      console.log(error)
    }
  }
}




  return (
    <div className=''>
      
    <button className='flex gap-2  ml-4'  onClick={handleLogout}>
    <CiLogout className='text-xl  mt-1 hover:bg-slate-600 rounded-md duration-300 cursor-pointer' /> 
    Logout
    </button>
      
    </div>
  )
}

export default Logout
