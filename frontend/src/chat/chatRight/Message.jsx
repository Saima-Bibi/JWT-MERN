import React from 'react'
import useDecodeToken from '../../context/useDecodeToken.js'

function Message({message}) {
  const { data } = useDecodeToken();
    // console.log(message.SenderId + data.userId )
const itsMe = message.SenderId === data.userId
const chatName = itsMe ? "chat-end": "chat-start"
const chatColor = itsMe ? 'bg-blue-500': ""

const createdAt = new Date(message.createdAt);
const formattedTime = createdAt.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

  return (
    <div className='p-4 text-sm'>
      
      <div className=  {`chat ${chatName}`}>
      <div className={`chat-bubble text-white ${chatColor} `}>
  <div >{message.message}</div>
 
</div>
<div className="chat-footer">{formattedTime}</div>
</div>


    </div>
  )
}

export default Message
