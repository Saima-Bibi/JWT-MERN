import React from 'react'
import ChatLeft from '../../chat/chatLeft/ChatLeft'
import ChatRight from '../../chat/chatRight/ChatRight'

export default function Home() {
  return (
    <div className='flex h-screen'>
      <ChatLeft />
      <ChatRight />
    </div> 
  )
}
