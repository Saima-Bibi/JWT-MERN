import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Example chart library

const Dashboard = () => {
  // Sample data for charts
  const data = [
    { name: 'Jan', income: 3000, expense: 2000 },
    { name: 'Feb', income: 3500, expense: 2500 },
    { name: 'Mar', income: 4000, expense: 3000 },
    // Add more data points here
  ];

  return (
    <div className='p-5 overflow-y-auto max-h-screen'>
      {/* Dashboard Header */}
      <header className='mb-6'>
        <h1 className='text-3xl font-bold'>Account Dashboard</h1>
        <p className='text-gray-600'>Overview of your account balances and recent activities.</p>
      </header>

      {/* Grid Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Account Overview */}
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Account Overview</h2>
          <div className='mb-4'>
            <h3 className='font-medium'>Checking Account</h3>
            <p className='text-2xl font-bold'>$1,234.56</p>
          </div>
          <div className='mb-4'>
            <h3 className='font-medium'>Savings Account</h3>
            <p className='text-2xl font-bold'>$3,456.78</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Recent Transactions</h2>
          <ul>
            <li className='border-b py-2'>Deposit: $500 - 01/15/2024</li>
            <li className='border-b py-2'>Withdrawal: $200 - 01/20/2024</li>
            <li className='border-b py-2'>Transfer: $150 - 01/25/2024</li>
            {/* Add more items here */}
          </ul>
        </div>

        {/* Financial Summary */}
        <div className='bg-white p-4 rounded-lg shadow-md lg:col-span-2'>
          <h2 className='text-xl font-semibold mb-4'>Financial Summary</h2>
          <LineChart width={600} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#8884d8" />
            <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
          </LineChart>
        </div>

       

      
       
      </div>
    </div>
  );
};

export default Dashboard;
