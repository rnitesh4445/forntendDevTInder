import React from "react";

const UserCard = ({ user }) => {

  const { firstName, lastName, photoUrl, about, skills } = user;

  return (
    <div className="flex justify-center mt-10">

      <div className="bg-white w-80 rounded-3xl shadow-2xl overflow-hidden relative">

        {/* Image */}
        <div className="h-[400px]">
          <img
            src={photoUrl}
            alt="user"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-5">

          <h1 className="text-3xl font-bold">
            {firstName} {lastName}
          </h1>

          <p className="text-sm mt-2">
            {about}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-3">
            {skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-5">

            <button className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full font-semibold">
              Ignore
            </button>

            <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full font-semibold">
              Interested
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserCard;