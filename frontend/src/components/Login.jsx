import React from 'react'

function Login() {
  return (
    <div>
      
      <div className='flex h-screen w-screen items-center justify-center space-1'>
      
      <form className='border border-black px-4 py-6 '>
          <h1 className='text-center font-bold'>App Name</h1>
          <h2>Signup</h2>
  
          <div className="input input-bordered flex items-center gap-2 bg-slate-900 text-sm text-gray-300  border-gray-400 h-10">
          <FaUser />
                          <input type="text" className="grow " placeholder="name" />
                     </div>
           <label className="input input-bordered flex items-center gap-2 bg-slate-900 text-sm text-gray-300  border-gray-400 h-10">
           <MdEmail /> 
                          <input type="text" className="grow " placeholder="email" />
                     </label>   
                     <label className="input input-bordered flex items-center gap-2 bg-slate-900 text-sm text-gray-300  border-gray-400 h-10">
                     <TbPassword />
                          <input type="text" className="grow " placeholder="password" />
                     </label>    
                     <label className="input input-bordered flex items-center gap-2 bg-slate-900 text-sm text-gray-300  border-gray-400 h-10">
                     <FaRegAddressBook />
                          <input type="text" className="grow " placeholder="address" />
                     </label>   
                     <label className="input input-bordered flex items-center gap-2 bg-slate-900 text-sm text-gray-300  border-gray-400 h-10">
                     <FaPhoneAlt />
                          <input type="text" className="grow " placeholder="phone" />
                     </label>
                     <label className="input input-bordered flex items-center gap-2 bg-slate-900 text-sm text-gray-300  border-gray-400 h-10">
                          <input type="file" className="grow " />
                     </label>
      </form>
  
  
      </div>


    </div>
  )
}

export default Login
