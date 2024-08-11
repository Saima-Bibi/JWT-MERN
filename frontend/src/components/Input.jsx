import React, { useState } from 'react'

function Input({ type, name, handleChange, value, placeholder, icon, validation }) {
    const [error, setError] = useState('')

    const handleInputChange = (e) => {

        handleChange(e);
        const errors = validation({ [name]: e.target.value })
        setError(errors[name] || '')

    }
    return (
        <div>
            <label className="input input-bordered flex items-center gap-2 mb-1  text-sm text-gray-500  border-gray-400 h-9 ">
                {icon}
                <input type={type} name={name} onChange={handleInputChange} value={value} className="grow  " placeholder={placeholder} />
            </label>{error && <p className='text-red-600 text-xs mb-2'>{error}</p>}
        </div>
    )
}

export default Input
