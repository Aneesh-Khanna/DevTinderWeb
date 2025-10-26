import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "./../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/ReduxStore/userSlice";
import { useEffect } from "react";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((store) => store.user);
  const hideHeaderFooter = location.pathname === "/verifyemail";

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Header only if not verify page */}
      {!hideHeaderFooter && <Header />}

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer always at bottom */}
      <footer className="mt-auto">
        {/* Footer only if not verify page */}
        {!hideHeaderFooter && <Footer />}
      </footer>
    </div>
  );
};

export default Body;
