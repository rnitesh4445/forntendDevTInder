import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import Base_url from './utils/constant';

import { useDispatch } from 'react-redux';
import {removeUser} from './utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const Navbar =()=>{
    const user=useSelector((state)=>state.user);
     const [open, setOpen] = useState(false);
        const dispatch=useDispatch();
     
const navigation=useNavigate();

     const handleLogout=async()=>{

         try{
            await axios.post(Base_url+"/logout",{},{withCredentials:true})
                setOpen(false);
                dispatch(removeUser());
                return navigation("/login")

         }
         catch(err){
            console.log(err);
            }
     }

    return(
        <nav className="navbar bg-gray-300 h-14 flex items-center pl-4 justify-between ">
            <div>
                <h1 className="logo flex">
                <img src="../public/Image/logo.png" alt="DevTinder Logo"  className="h-14" />
               <div className="h-14 flex items-center pl-2 text-2xl"> DevTinder</div>
                
                </h1>
            </div>
            <div>
                {
                    user ? <button onClick={() => setOpen(!open)} className="btn bg-green-500 text-white px-4 py-2 rounded-md mr-4 cursor-pointer">{user.firstName}</button> : <button className="btn bg-blue-500 text-white px-4 py-2 rounded-md mr-4 cursor-pointer">Login</button>
                }
           
             {
                    open && (
                        <div className="absolute right-0 mt-1 w-40 bg-white shadow-lg rounded-lg p-2">

                          <Link to="/profile">
                            <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded cursor-pointer" onClick={()=>setOpen(false)}>
                                Profile
                            </button>
                            </Link>
                            <Link to="/request">
                            <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded cursor-pointer" onClick={()=>setOpen(false)}>
                                Requests
                            </button>
                            </Link>
                            <Link to="/connections">
                                <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded cursor-pointer" onClick={()=>setOpen(false)}>
                                    Connections
                                </button>
                            </Link>

                            <button className="block w-full text-left px-3 py-2 hover:bg-red-100 text-red-500 rounded cursor-pointer"  onClick={handleLogout}>
                                Logout
                            </button>

                        </div>
                    )
                }
                 </div>
        </nav>
    )
}

export default Navbar;