import React from 'react'
import ChatLeft from './chat/chatLeft/ChatLeft'
import ChatRight from './chat/chatRight/ChatRight'
import Signup from './components/Signup'
import Login from './components/Login'
import Otp from './components/Otp'
import Forgetpassword from './components/Forgetpassword'
import Resetpassword from './components/Resetpassword'

function App() {
  return (
    <div className='flex h-screen'>

{/* <Resetpassword></Resetpassword> */}
{/* <Forgetpassword></Forgetpassword> */}
{/* <Otp></Otp> */}
      <Signup></Signup>
{/* <Login></Login> */}

     {/* <ChatLeft></ChatLeft>
     <ChatRight></ChatRight> */}
    </div>
  )
}

export default App
