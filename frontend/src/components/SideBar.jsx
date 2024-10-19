import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TiThMenu } from "react-icons/ti";
import { BsBank } from "react-icons/bs";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import Logout from '../chat/chatLeft/Logout';

function SideBar({children}) {



  const [selected, setSelected] = useState('dashboard');

  const handleSelection = (item) => {
    setSelected(item);
  };


const sideItems = (
   <>
  <li className={`hover:bg-green-500 rounded-md ${selected === 'dashboard' ? 'bg-green-500 text-white' : ''}`}
        onClick={() => handleSelection('dashboard')}><Link to="/dashboard"> <RxDashboard className='text-xl'/>DashBoard</Link></li>
     
      <li className={`hover:bg-green-500 rounded-md ${selected === 'transfer' ? 'bg-green-500 text-white' : ''}`}
        onClick={() => handleSelection('transfer')}><Link to="/transfer"> <FaMoneyBillTransfer className='text-xl'/>Transfer Amount</Link></li>
     
      <li className={`hover:bg-green-500 rounded-md ${selected === 'accounts' ? 'bg-green-500 text-white' : ''}`}
        onClick={() => handleSelection('accounts')}><Link to="/accounts"> <MdOutlineAccountBalanceWallet className='text-xl'/> Accounts</Link></li>
      
      <li className={`hover:bg-green-500 rounded-md ${selected === 'beneficiary' ? 'bg-green-500 text-white' : ''}`}
        onClick={() => handleSelection('beneficiary')}><Link to="/beneficiary"><FaPersonCircleCheck className='text-xl'/>Beneficiary</Link></li>
     <li className={`hover:bg-green-500 rounded-md ${selected === 'logout' ? 'bg-green-500 text-white' : ''}`}
        onClick={() => handleSelection('logout')}><Link to="/sign-up"><CiLogin className='text-xl'/>Signup</Link></li>
     <li className={`hover:bg-green-500 rounded-md  flex${selected === 'logout' ? 'bg-green-500 text-white' : ''}`}
        onClick={() => handleSelection('logout')}><Logout /></li>
  </>
)





  return (
    <div className='flex h-screen w-screen'>
      {/* Sidebar with fixed width */}
      <div className="w-[25%] bg-black text-white flex flex-col h-full p-4">
        <h1 className='flex gap-2 text-2xl p-3'>
          <BsBank /> Bank APP
        </h1>
        <ul className="menu gap-5 sm:max-h-screen ">
          {sideItems} 
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-[75%] ">
        
        {/* Page content here */}
        {children}
      </div>
    </div>
  )
}

export default SideBar
