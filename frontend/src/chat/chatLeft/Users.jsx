import React from 'react'
import User from './User'
import useGetAllUsers from '../../context/useGetAllUsers'

function Users() {
    const[allUser,loading] = useGetAllUsers()
    console.log(allUser)
    return (
        <div>
            <h1 className='font-semibold px-8 py-2 '>Messages</h1>
            <div className='overflow-y-auto rmScroll' style={{maxHeight:'calc(84vh - 10vh)'}} >
            {allUser.users?.map((user, index)=>(
              <User key={index} user={user}/>
            ))}
           </div>
        </div>
    )
}

export default Users
