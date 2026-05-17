import React, { useEffect } from 'react'
import axios from 'axios';
import UserCard from './UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from './utils/feedSlice';
import Base_url from './utils/constant';

const Feed = () => {

  const dispatch = useDispatch();

  const feedData = useSelector((state) => state.feed);

  const getFeed = async () => {

    try {

      const res = await axios.get(
        Base_url + "/feed",
        { withCredentials: true }
      );

      dispatch(addFeed(res.data));

    }
    catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    if (!feedData) {
      getFeed();
    }

  }, []);

  // LOADING
  if (!feedData) {

    return (
      <div className='flex justify-center items-center h-screen'>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // EMPTY FEED
  if (feedData.length === 0) {

    return (
      <h1 className='text-center text-2xl mt-20 font-bold'>
        No New Users Found !
      </h1>
    );
  }

  return (

    <div className='flex justify-center items-center min-h-screen'>

      <div className='hover:scale-105 transition-all duration-300'>

        <UserCard user={feedData[0]} />

      </div>

    </div>
  );
};

export default Feed;