import React from 'react'
import { MdEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { IoKey } from "react-icons/io5";

function Resetpassword() {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-slate-900'>
      
    <form className='border border-black rounded-md px-4 py-6 bg-white w-[25%]  '>
        <h1 className='text-center font-bold text-lg text-green-500'>App Name</h1>
        <h2 className='text-slate-900 font-semibold mb-1'>Reset Password</h2>
<div className='mb-2'>
        
         <label className="input input-bordered flex items-center gap-2 mb-1  text-sm text-gray-400   border-gray-400 h-9">
         <MdEmail /> 
                        <input type="text" className="grow " placeholder="email" />
                   </label>   
                   <label className="input input-bordered flex items-center gap-2 mb-1  text-sm text-gray-400  border-gray-400 h-9">
                   <IoKey />
                        <input type="text" className="grow  " placeholder="otp" />
                   </label>  
                   <label className="input input-bordered flex items-center gap-2 mb-1  text-sm text-gray-400  border-gray-400 h-9">
                   <TbPassword />
                        <input type="text" className="grow  " placeholder="new password" />
                   </label>    
                  
                  
                   </div>
                  
                   <div>
          
          <button className='h-9 w-[100%] bg-green-500 text-white font-semibold rounded-md'>Reset Password</button>
          <h5 className='mt-1 text-center'>otp expires in 10 minutes. <span className=' text-green-500 font-medium cursor-pointer text-sm'>resend OTP</span></h5>
        </div>
    </form>

    </div>
  )
}

export default Resetpassword
