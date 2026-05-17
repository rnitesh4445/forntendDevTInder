import axios from "axios";
import BASE_URL from "./utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionSlice"
import { Link } from "react-router-dom";
import Base_url from "./utils/constant";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(Base_url+"/user/connections", {
        withCredentials: true,
      });
      console.log(res)
      dispatch(addConnections(res.data.data));
    } catch (err) {
  
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
  <div className="min-h-screen bg-base-200 py-10 px-4">

    <div className="max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Connections
      </h1>

      <div className="space-y-6">

        {connections.map((connection) => {

          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
          } = connection;

          return (

            <div
              key={_id}
              className="bg-gray-300 border border-gray-700 rounded-3xl shadow-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:scale-[1.01] hover:shadow-blue-500/10 transition-all duration-300"
            >

              {/* Left Section */}
              <div className="flex items-center gap-5 w-full">

                {/* Profile Image */}
                <img
                  alt="photo"
                  src={photoUrl}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                />

                {/* User Info */}
                <div className="flex-1">

                  <h2 className="text-2xl font-bold text-white">
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

              {/* Chat Button */}
             

                <button
                  className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  Chat
                </button>

              

            </div>
          );
        })}
      </div>
    </div>
  </div>
);
};
export default Connections;