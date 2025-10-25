import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/ReduxStore/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-lg text-base-content">
        No Connections Found
      </h1>
    );

  return (
    <div className="px-4 py-10">
      <h1 className="text-3xl font-bold text-primary text-center mb-8">
        Connections
      </h1>

      <div className="flex flex-col gap-6 items-center">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

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
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-base-content">
                    {age}, {gender}
                  </p>
                )}
                <p className="text-sm text-base-content mt-1">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
