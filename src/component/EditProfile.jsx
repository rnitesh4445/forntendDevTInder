import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import Base_url from './utils/constant'
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        Base_url + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

return (
  <>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-950 flex justify-center items-center px-4 py-10">

      <div className="flex flex-col xl:flex-row gap-10 items-start">

        {/* FORM */}
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

          <h1 className="text-4xl font-extrabold text-white text-center">
            Edit Profile
          </h1>

          <p className="text-gray-300 text-center mt-2 mb-8">
            Update your profile details
          </p>

          {/* TWO FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* First Name */}
            <div>
              <label className="text-white font-medium block mb-2">
                First Name
              </label>

              <input
                type="text"
                value={firstName}
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-600 text-white outline-none focus:border-pink-500 transition-all"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-white font-medium block mb-2">
                Last Name
              </label>

              <input
                type="text"
                value={lastName}
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-600 text-white outline-none focus:border-pink-500 transition-all"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="text-white font-medium block mb-2">
                Photo URL
              </label>

              <input
                type="text"
                value={photoUrl}
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-600 text-white outline-none focus:border-pink-500 transition-all"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            {/* Age */}
            <div>
              <label className="text-white font-medium block mb-2">
                Age
              </label>

              <input
                type="text"
                value={age}
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-600 text-white outline-none focus:border-pink-500 transition-all"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-white font-medium block mb-2">
                Gender
              </label>

              <input
                type="text"
                value={gender}
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-600 text-white outline-none focus:border-pink-500 transition-all"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            {/* About */}
            <div>
              <label className="text-white font-medium block mb-2">
                About
              </label>

              <input
                type="text"
                value={about}
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-600 text-white outline-none focus:border-pink-500 transition-all"
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-center mt-4">
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            className="w-full mt-8 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg"
            onClick={saveProfile}
          >
            Save Profile
          </button>
        </div>

        {/* CARD */}
        <div className="mt-4 xl:mt-0 hover:scale-105 transition-all duration-300">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>

      {/* TOAST */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert bg-green-500 text-white border-none shadow-lg">
            <span>Profile Saved Successfully 🎉</span>
          </div>
        </div>
      )}
    </div>
  </>
);
};
export default EditProfile;