import {React, useState} from 'react'
import Input from './Input'
import { MdEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import axios from 'axios';
import toast from 'react-hot-toast';
import Validation from '../Validation';
import { useAuth } from '../context/Authprovider';
import { Link, useNavigate } from 'react-router-dom';


function Login() {

const[authUser,setAuthUser]= useAuth()
const navigate = useNavigate()

  const handleClick = async()=>{
    try {
      
      const user = JSON.parse(localStorage.getItem('bankApp'));
      const email = user.email
      console.log(email)
   
   const res = await axios.post(`api/user/forget-Password?email=${email}`)
 
   if(res.data){
    toast.success(res.data.message)
    navigate('/forgetPassword')
   }

    } catch (error) {
       if(error.response){
      toast.error(error.response.data.message)
      console.log(error)
    }
    }
  }

  const[value,setValue]= useState({
    email:'',
    password:''
  })
 const handleChange = (e)=>{
setValue({
  ...value,
  [e.target.name]:e.target.value
})
 }

 const handleSubmit = async(e)=>{
  e.preventDefault()
Validation(value)
  await axios.post('/api/user/login',value,{
    withCredentials: true
  })
  .then((response=>{
    if(response.data){
      toast.success(response.data.message)
      //localStorage.setItem("bankApp",JSON.stringify(response.data))
      setAuthUser(response.data)
      localStorage.removeItem('bankApp')
    }
  })).catch((error)=>{
    if(error.response){
      toast.error(error.response.data.message)
    }
  })


 }



  return (
    <div className='flex h-screen w-screen items-center justify-center bg-slate-900'>
      
    <form  onSubmit={handleSubmit}   className='border border-black rounded-md px-4 py-6 bg-white  '>
        <h1 className='text-center font-bold text-lg text-green-500'>App Name</h1>
        <h2 className='text-slate-900 font-semibold mb-1'>Login</h2>
<div className='mb-2'>
        
         {/* <label className="input input-bordered flex items-center gap-2 mb-1  text-sm text-gray-400   border-gray-400 h-9">
         <MdEmail /> 
                        <input type="text" className="grow " placeholder="email" />
                   </label>    */}

<Input

                              type="text"
                              name="email"
                              handleChange={handleChange}
                              value={value.email}
                              placeholder="email"
                              icon={<MdEmail />}
                              validation={Validation}
                         />                   
                   {/* <label className="input input-bordered flex items-center gap-2 mb-1  text-sm text-gray-400  border-gray-400 h-9">
                   <TbPassword />
                        <input type="text" className="grow  " placeholder="password" />
                   </label>     */}

 <Input

                              type="password"
                              name="password"
                              handleChange={handleChange}
                              value={value.password}
                              placeholder="password"
                              icon={<TbPassword />}
                              validation={Validation}
                         />                  
                  
                   </div>
                  
                   <div>
          
          <button className='h-9 w-[100%] bg-green-500 hover:bg-green-700  text-white font-semibold rounded-md'>Login</button>
          <h5 className='mt-1 text-center'><span className=' underline underline-offset-2 text-green-500 hover:text-green-700  font-medium cursor-pointer text-sm' onClick={handleClick}>forget password?</span></h5>
          <h5 className='mt-1 text-center'>new User?<Link to='/sign-up' className=' underline underline-offset-2 text-green-500 hover:text-green-600  font-medium cursor-pointer text-sm'>signup here</Link></h5>

        </div>
    </form>

    </div>
  )
}

export default Login
