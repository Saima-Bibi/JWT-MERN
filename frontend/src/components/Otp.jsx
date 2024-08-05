import React, { useState } from 'react'
import { IoKey } from "react-icons/io5";
import Validation from '../Validation';
import axios from 'axios';
import Input from './Input'
import toast from 'react-hot-toast';

function Otp() {

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
    
   
    await axios.post('http://localhost:4003/user/verify-Otp', convertedvalue)
      .then((response) => {
        console.log(response)
        if (response.data) {
          toast.success(response.data.message)
        }
      }).catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message)
        }
      })
  }


  return (
    <div className='flex h-screen w-screen items-center justify-center bg-slate-900'>
      <form onSubmit={handleSubmit}  className='border border-black rounded-md px-4 py-6 bg-white w-[25%]'>
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
            className='h-9 w-[100%] bg-green-500 text-white font-semibold rounded-md'>
              Verify
          </button>
          <h5 className='mt-1 text-center'>otp expires in 10 minutes. <span className=' text-green-500 font-medium cursor-pointer text-sm'>resend OTP</span></h5>
        </div>
      </form>
    </div>
  )
}

export default Otp
