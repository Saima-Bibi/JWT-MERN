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
import Loading from './components/Loading'
import SideBar from './components/SideBar'
import Dashboard from './components/pages/Dashboard'
import Accounts from './components/pages/Accounts'
import Beneficiary from './components/pages/Beneficiary'
import Logout from './chat/chatLeft/Logout'
import Email from './components/Email'
import Home from './components/pages/Home'


function App() {

  const [authUser, setAuthUser] = useAuth()
  console.log(authUser)
  return (
    <div className=''>




<Routes>
<Route path='/' element={authUser ? (<Home/>):(<Navigate to = '/login'/>)} />
  <Route path='/login' element={ authUser ? (<Navigate to= '/'/>):(<Login/>)} />
  <Route path='/sign-up' element={<Signup />}></Route>
  <Route path='/otp' element={<Otp/>}></Route>
  <Route path='/forgetPassword' element={<Forgetpassword />}></Route>
  <Route path='/email' element={<Email />}></Route>
  <Route path='/resetPassword' element={<Resetpassword />}></Route>
  <Route path='/loading' element={<Loading />}></Route>
  <Route path='/logout' element={<Logout />}></Route>
  
</Routes>

      {/* <SideBar  >


        <Routes>
        <Route path="/" element={
          authUser ? (
          <Navigate to="/dashboard" />):(<Navigate to='/login' />)} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path='/beneficiary' element={<Beneficiary/>}/>
          <Route path='/logout' element={<Logout/>}></Route>
          <Route path='/sign-up' element={<Signup />}></Route>
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />}></Route>
        </Routes>
   

        </SideBar> */}
     {/*  */}

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
