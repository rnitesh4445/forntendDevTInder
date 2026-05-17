import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import Base_url from './utils/constant';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [error, setError] = useState(null);

  // LOGIN
  const handleLogin = async () => {

    setError("");

    try {

      const res = await axios.post(
        Base_url + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

      return navigation("/");

    } catch (err) {

      setError(err?.response?.data || "Something went wrong");
    }
  };

  // SIGNUP
  const handleSignup = async () => {

    setError("");

    try {

      const res = await axios.post(
        Base_url + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));

      return navigation("/");

    } catch (err) {

      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (

    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-950 flex justify-center items-center px-4'>

      <div className='w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8'>

        {/* HEADING */}
        <h1 className='text-4xl font-extrabold text-white text-center'>
          {isLoginForm ? "Welcome Back" : "Create Account"}
        </h1>

        <p className='text-center text-gray-300 mt-2 mb-8'>
          {isLoginForm
            ? "Login to continue"
            : "Signup and start your journey"}
        </p>

        {/* TWO FIELD GRID */}
        {!isLoginForm && (

          <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>

            {/* FIRST NAME */}
            <div>
              <label className='text-white block mb-2 font-medium'>
                First Name
              </label>

              <input
                type="text"
                value={firstName}
                className='w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-600 text-white outline-none focus:border-pink-500 transition-all'
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* LAST NAME */}
            <div>
              <label className='text-white block mb-2 font-medium'>
                Last Name
              </label>

              <input
                type="text"
                value={lastName}
                className='w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-600 text-white outline-none focus:border-pink-500 transition-all'
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

          </div>
        )}

        {/* EMAIL + PASSWORD */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

          {/* EMAIL */}
          <div>
            <label className='text-white block mb-2 font-medium'>
              Email
            </label>

            <input
              type="email"
              value={emailId}
              className='w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-600 text-white outline-none focus:border-pink-500 transition-all'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className='text-white block mb-2 font-medium'>
              Password
            </label>

            <input
              type="password"
              value={password}
              className='w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-600 text-white outline-none focus:border-pink-500 transition-all'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
             <input
  type="file"
  accept="image/*"
  onChange={handleFile}
/>
        </div>

        {/* ERROR */}
        {error && (
          <p className='text-red-400 text-center mt-5'>
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button
          className='w-full mt-8 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer'
          onClick={isLoginForm ? handleLogin : handleSignup}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>

        {/* TOGGLE */}
        <p
          className='text-center text-gray-300 mt-6 cursor-pointer hover:text-pink-400 transition-all cursor-pointer'
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm
            ? "New User? Signup Here"
            : "Already have an account? Login Here"}
        </p>

      </div>

    </div>
  )
}

export default Login;