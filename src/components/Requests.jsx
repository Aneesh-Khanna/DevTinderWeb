import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/ReduxStore/requestSlice";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast"; // ✅ Toast import

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  // ✅ Review request (accept/reject)
  const reviewRequest = async (status, _id, name) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      // ✅ Show toast
      if (status === "accepted") {
        toast.success(`Request from ${name} Accepted`);
      } else if (status === "rejected") {
        toast(`Request from ${name} Rejected`, { icon: "🚫" });
      }

      // ✅ Delay removal slightly to allow toast to render
      setTimeout(() => {
        dispatch(removeRequest(_id));
      }, 2000);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      toast.error("Couldnt get the requests");
    }
  };

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-lg text-base-content">
        No Requests Found
      </h1>
    );

  return (
    <div className="px-4 py-10">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />{" "}
      {/* ✅ Toast container */}
      <h1 className="text-3xl font-bold text-primary text-center mb-8">
        Connection Requests
      </h1>
      <div className="flex flex-col gap-6 items-center">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          const fullName = `${firstName} ${lastName}`;

          return (
            <div
              key={_id}
              className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-base-300 shadow-md hover:shadow-lg transition-all"
            >
              {/* 👤 Profile Image */}
              <img
                alt="photo"
                src={photoUrl}
                className="w-20 h-20 rounded-full object-cover border border-base-200"
              />

              {/* 📝 Info */}
              <div className="flex-1 text-left md:px-4">
                <h2 className="text-xl font-bold text-base-content">
                  {fullName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-base-content">
                    {age}, {gender}
                  </p>
                )}
                <p className="text-sm text-base-content mt-1">{about}</p>
              </div>

              {/* ✅ Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    reviewRequest("rejected", request._id, fullName)
                  }
                  className="px-4 py-1.5 text-sm border border-red-500 text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-all duration-200 ease-in-out transform hover:scale-[1.05] hover:shadow-md"
                >
                  Reject
                </button>
                <button
                  onClick={() =>
                    reviewRequest("accepted", request._id, fullName)
                  }
                  className="px-4 py-1.5 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out transform hover:scale-[1.05] hover:shadow-md"
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
