import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import appStore from './utils/appStore';
import { useDispatch } from 'react-redux';
import {addUser} from './utils/userSlice';
import Base_url from './utils/constant';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [emailId, setEmail] = React.useState('sneha@gmail.com');
  const [password, setPassword] = React.useState('Sneha@123');
  const dispatch=useDispatch();
  const navigation=useNavigate();
  const [error, setError]=useState(null);
  
const handleLogin = async () =>{
  

try{
    const res=await axios.post(Base_url+"/login",
    {emailId,password},{withCredentials:true})
   
    dispatch(addUser(res.data));
    return navigation("/feed")

}
catch(err){
   
    setError(err.response.data);
}

}

  return (
    <div>
      <div className='max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-3'>Login</h1>
        <h1>Email</h1>
        <input 
          type="email" 
          className='border-2 border-gray-300 rounded-md p-2 mb-4 w-full' 
          value={emailId}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h1>Password</h1>
        <input 
          type="text" 
          className='border-2 border-gray-300 rounded-md p-2 mb-4 w-full' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <button 
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mx-auto block cursor-pointer' 
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
