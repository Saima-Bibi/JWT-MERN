import React from 'react'
import ChatLeft from './chat/chatLeft/ChatLeft'
import ChatRight from './chat/chatRight/ChatRight'
import Signup from './components/Signup'

function App() {
  return (
    <div className='flex h-screen'>

      <Signup></Signup>

     {/* <ChatLeft></ChatLeft>
     <ChatRight></ChatRight> */}
    </div>
  )
}

export default App
