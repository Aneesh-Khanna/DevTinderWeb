import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "./../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/ReduxStore/feedSlice";
import UserCard from "./UserCard";
import { toast } from "react-hot-toast";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);

  const [page, setPage] = useState(1); // ✅ Track pagination

  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed?page=${page}&limit=10`, {
        withCredentials: true,
      });

      const newUsers = res?.data?.data || [];

      // ✅ Filter out self just in case
      const filtered = newUsers.filter((u) => u._id !== user._id);

      if (filtered.length === 0 && page === 1) {
        toast("No new users found", { icon: "👀" });
      }

      dispatch(addFeed(filtered));
    } catch (err) {
      toast.error("Something went wrong while loading feed");
    }
  };

  // ✅ Initial fetch
  useEffect(() => {
    if (user && (!feed || feed.length === 0)) {
      getFeed();
    }
  }, [user]);

  // ✅ Refill feed when empty
  useEffect(() => {
    if (feed?.length === 0) {
      setPage((prev) => prev + 1);
    }
  }, [feed]);

  // ✅ Fetch next page when page changes
  useEffect(() => {
    if (page > 1) {
      getFeed();
    }
  }, [page]);

  if (!feed) return null;

  if (feed.length === 0)
    return <h1 className="flex justify-center my-10">No new user found!</h1>;

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
