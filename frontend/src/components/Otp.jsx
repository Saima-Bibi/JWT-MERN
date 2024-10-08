import React, { useState, useEffect } from 'react'
import { IoKey } from "react-icons/io5";
import Validation from '../Validation';
import axios from 'axios';
import Input from './Input'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


function Otp() {

  const[signAuth,setSignAuth]= useState(false)
  const navigate = useNavigate();
 
  useEffect(()=>{
       if(signAuth){
            navigate('/login')
       }
       
  },[signAuth, navigate])

  const handleClick = async()=>{
    try {
      
      const user = JSON.parse(localStorage.getItem('bankApp'));
      const userId = user._id
      console.log(userId)
   const res = await axios.post(`api/user/resend-Otp?userId=${userId}`)
 
   if(res.data){
    toast.success(res.data.message)
   }

    } catch (error) {
       if(error.response){
      toast.error(error.response.data.message)
      console.log(error)
    }
    }
  }


  const [value, setValue] = useState({
    otp: ''
  })

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }
  const convertedvalue = {
    ...value,
      otp:Number(value.otp)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    Validation(convertedvalue)
    
   
    await axios.post('/api/user/verify-Otp', convertedvalue)
      .then((response) => {
        console.log(response)
        if (response.data) {
          setSignAuth(true)
          toast.success(response.data.message)

       
        
        }
      }).catch((error) => {
        if (error.response) {
          setSignAuth(false)
          toast.error(error.response.data.message)
          navigate('/otp')
        }
      })
  }


  return (
    <div className='flex h-screen w-screen items-center justify-center bg-slate-900'>
      <form onSubmit={handleSubmit}  className='border border-black rounded-md px-4 py-6 bg-white '>
        <h1 className='text-center font-bold text-lg text-green-500 mb-2'>App Name</h1>
        <h2 className='text-slate-900 font-semibold mb-1'>OTP Verification</h2>
        <div className='mb-2'>
          {/* <label className="input input-bordered flex items-center gap-2 mb-1  text-sm text-gray-400  border-gray-400 h-9">
                   <IoKey />
                        <input type="text" className="grow  " placeholder="otp" />
                   </label>     */}
          <Input
            type="number"
            name="otp"
            handleChange={handleChange}
            value={value.otp}
            placeholder="otp"
            icon={<IoKey />}
            validation={Validation}
          />
        </div>
        <div>
          <button 
            type='submit' 
            className='h-9 w-[100%] hover:bg-green-700 bg-green-500 text-white font-semibold rounded-md'>
              Verify
          </button>
          <h5 className='mt-1 text-center'>otp expires in 10 minutes. <span className='underline underline-offset-2 hover:text-green-700 text-green-500 font-medium cursor-pointer text-sm' onClick={handleClick}>resend OTP</span></h5>
        </div>
      </form>
    </div>
  )
}

export default Otp
