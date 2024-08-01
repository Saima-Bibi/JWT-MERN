import React from 'react'

function User() {
  return (
    <div>
      
      <div className='flex space-x-4 px-6 py-3  hover:bg-slate-700 duration-300 cursor-pointer'>
                <div className="avatar online">
                    <div className="w-12 rounded-full ">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className='text-sm'>
                    <h1 className='font-bold'>Saima</h1>
                    <span>abc@gmailcom</span>
                </div>
            </div>

    </div>
  )
}

export default User
