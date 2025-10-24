import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "./../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/ReduxStore/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch(); // save feed from redux
  const feed = useSelector((store) => store.feed); // get feed from redux

  const getFeed = async () => {
    try {
      if (feed) return; //dont make redudant calls if feed is already there
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      }); // get feed
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      //make error page
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
