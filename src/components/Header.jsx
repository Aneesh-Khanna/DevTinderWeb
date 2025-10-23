import { UserRound } from "lucide-react";

const Header = () => {
  return (
    <div className="navbar bg-base-300 shadow-sm">
      {/* Left Section */}
      <div className="flex-1 flex items-center gap-2 pl-2">
        <a className="btn btn-ghost normal-case text-xl flex items-center gap-2">
          <UserRound className="w-5 h-5" />
          DevTinder
        </a>
      </div>

      {/* Right Section */}
      <div className="flex gap-2 pr-4">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
