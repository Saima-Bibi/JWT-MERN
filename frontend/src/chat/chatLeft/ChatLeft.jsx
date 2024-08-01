import React from 'react'
import Search from './Search.jsx'
import Users from './Users.jsx'
import Logout from './Logout.jsx'

function ChatLeft() {
  return (
    <div className='w-[30%] bg-black text-gray-300'>
    <Search></Search>
    <Users></Users>
    <Logout></Logout>
    </div>
  )
}

export default ChatLeft
