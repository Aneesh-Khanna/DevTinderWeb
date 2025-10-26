import axios from "axios";
import { UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, LOGO } from "../utils/constants";
import { removeUser } from "../utils/ReduxStore/userSlice";
import { toast } from "react-hot-toast";
import { CheckCircle } from "lucide-react";

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
      const msg = err?.response?.data || "Something went wrong";
      toast.error(msg);
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
          <img
            src={LOGO}
            alt="DevTinder logo"
            className="w-8 h-8 object-contain"
          />
          DevTinder
        </Link>
      </div>

      {/* Right Section(Photo) only show when user is logged in*/}
      <div className="flex gap-2 pr-4">
        {user && (
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-1 cursor-pointer">
              {/* ✅ Verified Tick with Tooltip */}
              {user.isVerified && (
                <div className="relative group inline-block">
                  <CheckCircle
                    size={20}
                    className="text-green-500 cursor-pointer"
                  />

                  {/* Tooltip below */}
                  <span
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1
                 bg-gray-800 text-white text-xs rounded-md px-2 py-1
                 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                 whitespace-nowrap z-10 pointer-events-none select-none"
                  >
                    Verified
                  </span>
                </div>
              )}

              {/* 👤 Avatar */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User avatar" src={user.photoUrl} />
                </div>
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
                <Link to="/changepassword">Change Password</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
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
