import axios from "axios";
import Base_url from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "./utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests||[]);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        Base_url + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(Base_url + "/user/requests/received", {
        withCredentials: true,
      });
     console.log(res.data.data)
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

//   if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

return (
  <div className="min-h-screen bg-base-200 py-10 px-4">
    
    <div className="max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold text-center mb-10 text-white">
        Connection Requests
      </h1>

      <div className="space-y-6">
        {requests.map((request) => {

          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
          } = request.fromUserId;

          return (
            <div
              key={_id}
              className="bg-base-500 border border-base-100 rounded-3xl shadow-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:scale-[1.01] transition-all duration-300"
            >

          
              <div className="flex items-center gap-5 w-full">

             
                <img
                  src={photoUrl}
                  alt="profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-lg"
                />

                {/* User Info */}
                <div className="flex-1">

                  <h2 className="text-2xl font-bold text-black">
                    {firstName} {lastName}
                  </h2>

                  {age && gender && (
                    <p className="text-sm text-gray-400 mt-1">
                      {age}, {gender}
                    </p>
                  )}

                  <p className="text-gray-300 mt-3 leading-relaxed">
                    {about}
                  </p>
                </div>
              </div>

            
              <div className="flex gap-3">

                <button
                  className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md transition-all duration-300"
                  onClick={() =>
                    reviewRequest("rejected", request._id)
                  }
                >
                  Reject
                </button>

                <button
                  className="px-6 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition-all duration-300"
                  onClick={() =>
                    reviewRequest("accepted", request._id)
                  }
                >
                  Accept
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
};
export default Requests;