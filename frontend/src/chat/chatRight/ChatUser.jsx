import React from 'react'

function ChatUser() {
  return (
    <div>
      
      <div className='flex h-[8vh] space-x-2 px-6 py-1 justify-center items-center bg-slate-700  '>
                <div className="avatar online">
                    <div className="w-12 rounded-full ">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div >
                    <h1 className='font-semibold text-md'>Saima</h1>
                    <span className='text-xs'>online</span>
                </div>
            </div>

    </div>
  )
}

export default ChatUser
