import React from 'react'
import axios from 'axios';
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import { addFeed } from './utils/feedSlice';
import Base_url from './utils/constant';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Feed = () => {
 const dispatch=useDispatch();
 const feedData=useSelector((state)=>state.feed);
    const getFeed=async()=>{
        try{
            const res=await axios.get(Base_url+"/feed",{withCredentials:true})
            dispatch(addFeed(res.data));
            console.log(res.data)
            
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getFeed();
    },[])
   return (
  feedData?.length > 0 && (
    <div className='max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md'>
      <UserCard user={feedData[0]} />
    </div>
  )
);
}
export default Feed