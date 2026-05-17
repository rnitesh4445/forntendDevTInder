import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "./utils/feedSlice";
import Base_url from "./utils/constant";

const UserCard = ({ user }) => {

  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    about,
    skills,
    age,
    gender
  } = user;

  const dispatch = useDispatch();

  
  const handleSendRequest = async (status, userId) => {

    try {

      await axios.post(
        Base_url + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div className="flex justify-center mt-10">

      <div className="bg-white w-80 rounded-3xl shadow-2xl overflow-hidden relative hover:scale-105 transition-all duration-300">

      
        <div className="h-[400px]">

          <img
            src={photoUrl}
            alt="user"
            className="w-full h-full object-cover"
          />

        </div>

      
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent text-white p-5">

          {/* NAME */}
          <h1 className="text-3xl font-bold">
            {firstName} {lastName}
          </h1>

       
          {age && gender && (
            <p className="text-sm text-gray-300 mt-1">
              {age}, {gender}
            </p>
          )}

       
          <p className="text-sm mt-3 text-gray-200">
            {about}
          </p>

  
          <div className="flex flex-wrap gap-2 mt-4">

            {skills?.map((skill, index) => (

              <span
                key={index}
                className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold"
              >
                {skill}
              </span>

            ))}

          </div>

      
          <div className="flex justify-between mt-6">

            <button
              className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full font-semibold transition-all cursor-pointer"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>

            <button
              className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full font-semibold transition-all cursor-pointer"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserCard;