import React from 'react'
import User from './User'

function Users() {
    return (
        <div>
            <h1 className='font-semibold px-8 py-2 '>Messages</h1>
            <div className='overflow-y-auto rmScroll' style={{maxHeight:'calc(84vh - 10vh)'}} >
           <User></User>
           <User></User>
           <User></User>
           <User></User>
           <User></User>
           <User></User>
           <User></User>
          
           <User></User>
           <User></User>
           <User></User>
           <User></User>
           </div>
        </div>
    )
}

export default Users
