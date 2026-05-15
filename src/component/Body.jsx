import React from 'react'
import Navbar from './Navbar'
import { Outlet } from "react-router";
import Footer from './Footer'
import Base_url from './utils/constant';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addUser } from './utils/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Body = () => {
const dispatch=useDispatch();
const  navigation=useNavigate();
const userData=useSelector((state)=>state.user);
const fetchUser=async()=>{
    try{
        const res=await axios.get(Base_url+"/profile/view",
          {
            withCredentials:true
          }
        )
      
      
          dispatch(addUser(res.data));
      }
        
        catch(err){
            if(err)
            {
                return navigation("/login")
            }
        }


       
}


 useEffect(()=>{
          if(!userData){
            fetchUser();
          }
        },[])
  return (
    <div>
      <Navbar />
     <Outlet/>
     <Footer />

    </div>
  )
}

export default Body
