import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";

function Search() {
    return (
        <div className='h-[10vh]'>
        <div className='px-4 py-6'>
            <form action=''>
                <div className='flex space-x-3  '>
                    <label className="input input-bordered flex items-center gap-2 bg-slate-900 text-gray-300 w-[90%] border-gray-400 h-9">
                        <input type="text" className="grow " placeholder="Search" />
                   </label>

                    <button>
                    <AiOutlineSearch  className='text-4xl p-1  hover:bg-slate-600 rounded-full duration-300 cursor-pointer'/>
                    </button>
                </div>

            </form>
        </div>
        </div>
    )
}

export default Search
