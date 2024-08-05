import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { FaRegAddressBook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import axios from 'axios'
import Validation from '../Validation';
import toast from 'react-hot-toast'
import Input from './Input'
import { Link } from 'react-router-dom'


function Signup() {

     const [value, setValue] = useState({
          name: '',
          email: '',
          password: '',
          address: '',
          phone: '',
          image: ''
     })


     const handleChange = (e) => {
          if (e.target.type === 'file') {
               setValue({
                    ...value,
                    image: e.target.files[0]
               })
          }
          else {
               setValue({
                    ...value,
                    [e.target.name]: e.target.value
               })

          }

     }

     const handleSubmit = async (e) => {
          e.preventDefault();
          (Validation(value))
          const formData = new FormData();
          formData.append('name', value.name);
          formData.append('email', value.email);
          formData.append('password', value.password);
          formData.append('address', value.address);
          formData.append('phone', value.phone);
          formData.append('image', value.image);
          await axios.post('http://localhost:4003/user/signup', formData, {
               headers: {
                    'Content-Type': 'multipart/form-data',
               }
          }).then((response) => {
               console.log(response)
               if (response.data) {
                    toast.success(`${response.data.message} 4 digit otp sended to your email`)
                    localStorage.setItem('bankApp', JSON.stringify(response.data.newUser))
               }
          })
               .catch((error) => {
                    if (error.response) {
                         console.log(error.response.data.message)
                         toast.error(error.response.data.message)
                    }
                    console.log(error)
               })


     }
     return (
          <div className='flex h-screen w-screen items-center justify-center bg-slate-900'>

               <form onSubmit={handleSubmit} className='border border-black rounded-md px-4 py-6 bg-white   '>
                    <h1 className='text-center font-bold text-lg text-green-500'>App Name</h1>
                    <h2 className='text-slate-900 font-semibold mb-1'>Signup</h2>
                    <div className='mb-2'>
                         {/* <label className="input input-bordered flex items-center gap-2 mb-1  text-sm text-gray-400  border-gray-400 h-9 ">
                              <FaUser />
                              <input type="text" name='name' onChange={handleChange} value={value.name} className="grow  " placeholder="name" />
                         </label>{error.name && <p className='text-red-600 text-xs mb-2'>{error.name}</p>} */}
                         <Input

                              type="text"
                              name="name"
                              handleChange={handleChange}
                              value={value.name}
                              placeholder="name"
                              icon={<FaUser />}
                              validation={Validation}
                         />

                         {/* <label className="input input-bordered flex items-center gap-2 mb-1  text-sm text-gray-400   border-gray-400 h-9">
                              <MdEmail />
                              <input type="text" name='email' onChange={handleChange} value={value.email} className="grow " placeholder="email" />

                         </label>  {error.email && <p className='text-red-600 text-xs mb-2'>{error.email}</p>} */}

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
                              <input type="password" name='password' onChange={handleChange} value={value.password} className="grow  " placeholder="password" />
                         </label>  {error.password && <p className='text-red-600 text-xs mb-2'>{error.password}</p>} */}

                         <Input

                              type="password"
                              name="password"
                              handleChange={handleChange}
                              value={value.password}
                              placeholder="password"
                              icon={<TbPassword />}
                              validation={Validation}
                         />

                         {/* <label className="input input-bordered flex items-center gap-2 mb-1  text-sm text-gray-400  border-gray-400 h-9">
                              <FaRegAddressBook />
                              <input type="text" name='address' onChange={handleChange} value={value.address} className="grow " placeholder="address" />
                         </label>   {error.address && <p className='text-red-600 text-xs mb-2'>{error.address}</p>} */}
                         <Input

                              type="text"
                              name="address"
                              handleChange={handleChange}
                              value={value.address}
                              placeholder="address"
                              icon={<FaRegAddressBook />}
                              validation={Validation}
                         />
                         {/* <label className="input input-bordered flex items-center gap-2 mb-1  text-sm text-gray-400  border-gray-400 h-9">
                              <FaPhoneAlt />
                              <input type="text" name='phone' onChange={handleChange} value={value.phone} className="grow " placeholder="phone" />
                         </label>  {error.phone && <p className='text-red-600 text-xs mb-2'>{error.phone}</p>} */}
                         <Input

                              type="text"
                              name="phone"
                              handleChange={handleChange}
                              value={value.phone}
                              placeholder="phone"
                              icon={<FaPhoneAlt />}
                              validation={Validation}
                         />
                         <label className="input input-bordered flex items-center gap-2 mb-1  text-sm text-gray-400  border-gray-400 h-9">
                              <input type="file" name='image' onChange={handleChange} className="grow " />
                         </label>
                    </div>

                    <div>

                         <button type='submit' className='h-9 w-[100%] bg-green-500 text-white font-semibold rounded-md'>Signup</button>
                         <h5 className='mt-1 text-center'>already have account?<span className=' text-green-500 font-semibold cursor-pointer '>Login here</span></h5>
                    </div>
               </form>


          </div>
     )
}

export default Signup
