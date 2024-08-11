import React from 'react'
import ChatLeft from './chat/chatLeft/ChatLeft'
import ChatRight from './chat/chatRight/ChatRight'
import Signup from './components/Signup'
import Login from './components/Login'
import Otp from './components/Otp'
import Forgetpassword from './components/Forgetpassword'
import Resetpassword from './components/Resetpassword'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/Authprovider'

function App() {

  const [authUser, setAuthUser] = useAuth()
  console.log(authUser)
  return (
    <div className='flex h-screen'>
      <Routes>
        <Route path='/' element={
          authUser ? (
            <div className='flex h-screen w-screen'>
              <ChatLeft />
              <ChatRight />
            </div>)
            : (<Navigate to='/login' />
            )
        }></Route>

        <Route path='/sign-up' element={<Signup />}></Route>
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />}></Route>
        <Route path='/otp' element={<Otp/>}></Route>

        <Route path='/forgetPassword' element={<Forgetpassword />}></Route>
        <Route path='/resetPassword' element={<Resetpassword />}></Route>
      </Routes>

      {/* <Resetpassword></Resetpassword> */}
      {/* <Forgetpassword></Forgetpassword> */}
      {/* <Otp></Otp> */}
      {/* <Signup></Signup> */}
      {/* <Login></Login> */}

      {/* <ChatLeft></ChatLeft>
     <ChatRight></ChatRight> */}
      <Toaster></Toaster>
    </div>
  )
}

export default App
