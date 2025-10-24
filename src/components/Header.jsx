import axios from "axios";
import { UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/ReduxStore/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      // This deletes the cookie, but data is still there in redux store temporarily

      dispatch(removeUser()); // remove data from redux store

      toast.success("Logged out successfully");

      //redirect user
      navigate("/login");
    } catch (err) {
      // Error logic maybe redirect to error page
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm">
      {/* Left Section */}
      <div className="flex-1 flex items-center gap-2 pl-2">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl flex items-center gap-2"
        >
          <UserRound className="w-5 h-5" />
          DevTinder
        </Link>
      </div>

      {/* Right Section(Photo) only show when user is logged in*/}
      <div className="flex gap-2 pr-4">
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User avatar" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
