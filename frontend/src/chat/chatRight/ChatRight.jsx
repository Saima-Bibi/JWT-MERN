import React from 'react'
import ChatUser from './ChatUser'
import Messages from './Messages'
import TypeSend from './TypeSend'

function ChatRight() {
  return (
    <div className='w-[70%]  bg-slate-900 text-gray-300 '>
     
    <ChatUser></ChatUser>
    <div className='overflow-y-auto' style={{maxHeight:'calc(92vh - 8vh)'}}>
    <Messages></Messages>
    </div>
   
    <TypeSend></TypeSend>
    </div>
  )
}

export default ChatRight
