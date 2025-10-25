import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/ReduxStore/feedSlice";
import { toast, Toaster } from "react-hot-toast"; // ✅ Toast + Toaster import

const UserCard = ({ user }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  const isFeedPage = location.pathname === "/";

  // Send request and show toast
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));

      // Show toast based on status
      if (status === "interested") {
        toast.success(`Connection Request Sent to ${firstName} ${lastName}`);
      } else if (status === "ignored") {
        toast(`You ignored ${firstName} ${lastName}`, { icon: "🚫" });
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {/* 🔹 Toast container */}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

      {/* 🔹 Inline fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div
        className="w-96 bg-gray-800 text-gray-100 rounded-2xl shadow-lg border border-transparent hover:border-indigo-500 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden"
        style={{ animation: "fadeIn 0.5s ease-out" }}
      >
        {/* 🔹 Image Section */}
        <div className="h-80 overflow-hidden">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>

        {/* 🔹 Content Section */}
        <div className="flex flex-col px-6 pt-4 pb-3 gap-2">
          {/* 🔹 Name */}
          <h2 className="text-lg font-semibold tracking-tight text-indigo-400">
            {firstName + " " + lastName}
          </h2>

          {/* 🔹 Age & Gender */}
          {age && gender && (
            <p className="text-sm text-gray-300">
              {age}, {gender}
            </p>
          )}

          {/* 🔹 About */}
          {about && (
            <p className="text-sm text-gray-400 leading-relaxed">{about}</p>
          )}

          {/* 🔹 Skills */}
          {skills?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs border border-gray-600 rounded-full text-gray-300 hover:border-indigo-400 hover:text-indigo-400 transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* 🔹 Buttons */}
          {isFeedPage && (
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="px-4 py-1.5 text-sm border border-red-500 text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-all duration-200 ease-in-out transform hover:scale-[1.05] hover:shadow-md"
                onClick={() => handleSendRequest("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="px-4 py-1.5 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out transform hover:scale-[1.05] hover:shadow-md"
                onClick={() => handleSendRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserCard;
