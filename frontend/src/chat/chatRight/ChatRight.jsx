import React, { useEffect } from 'react'
import ChatUser from './ChatUser'
import Messages from './Messages'
import TypeSend from './TypeSend'
import useConversation from '../../zustand/useConversation'
import Loading from '../../components/Loading'
import useDecodeToken from '../../context/useDecodeToken'

function ChatRight() {
  const{ selectedConversation, setSelectedConversation}=useConversation()
  
 useEffect(()=>{
  return setSelectedConversation(null)
 },[setSelectedConversation])


  return (

    <div className='w-[70%]  bg-slate-900 text-gray-300 '>
      {!selectedConversation ? (<NoChatSelected/>):(<>
      <div >
     
     <ChatUser></ChatUser>
     <div className='overflow-y-auto' style={{maxHeight:'calc(92vh - 8vh)'}}>
     <Messages></Messages>
     </div>
    
     <TypeSend></TypeSend>
     </div>
      </>)}
    </div>
  )
}

export default ChatRight
 

const NoChatSelected= ()=>{
  const { data } = useDecodeToken();
  return(
    <div  className='flex h-screen items-center justify-center '>
      <h1 className='text-center'>Welcome<span className='text-xl font-semibold'> {data.name}</span>
      <br></br>
      No chat selected
      </h1>
      
      
    </div>
  )
}