import { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/ReduxStore/userSlice";
import { Toaster, toast } from "react-hot-toast";
import { Eye, EyeOff, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch(); // for redux store
  const navigate = useNavigate(); // to redirect to feed page
  const [mode, setMode] = useState("login"); // Toggle between login/signup
  const [error, setError] = useState(""); // Error message display
  const [loading, setLoading] = useState(false); // Spinner state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const user = useSelector((store) => store.user);
  // to not enable logged in users to go to login page

  // Refs for form fields
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  // 🔧 Handle form submission and make API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 📦 Construct payload from refs
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (mode === "signup") {
      payload.firstName = firstNameRef.current.value;
      payload.lastName = lastNameRef.current.value;
    }

    //  Choose endpoint based on mode
    const endpoint =
      mode === "login" ? BASE_URL + "/login" : BASE_URL + "/signup";

    try {
      //  Make API call
      const res = await axios.post(endpoint, payload, {
        withCredentials: true,
      });
      const user = res?.data;

      // Store user in Redux
      dispatch(addUser(user));

      // ✅ Show success toast
      toast.success(
        `${mode === "login" ? "Logged in" : "Signed up"} successfully`
      );

      //Navigate user to feed page
      navigate("/");
    } catch (err) {
      // ❌ Show error toast
      const message = err?.response?.data || "Something went wrong. Try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="h-screen flex flex-col bg-base-100 overflow-hidden mb-7">
      {/* 🔔 Toast notification container */}
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      {/* 🧱 Form container with reduced top padding */}
      <div className="flex-grow px-4 pt-14 pb-6 flex items-start justify-center overflow-hidden">
        <div className="w-full max-w-sm p-6 mb-8 rounded-2xl bg-base-300 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:border hover:border-primary">
          <h2 className="text-2xl font-bold text-primary text-center mb-4 tracking-tight">
            {mode === "login" ? "Login" : "Sign Up"}
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/*  First Name (Signup only) */}
            {mode === "signup" && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    ref={firstNameRef}
                    required
                    className="peer w-full px-3 pt-6 pb-2 bg-base-100 text-base-content border border-base-200 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md hover:border-primary transition-all duration-200 ease-in-out"
                    placeholder="First Name"
                  />
                  <label className="absolute left-3 top-2 text-sm text-base-content transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary">
                    First Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    ref={lastNameRef}
                    required
                    className="peer w-full px-3 pt-6 pb-2 bg-base-100 text-base-content border border-base-200 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md hover:border-primary transition-all duration-200 ease-in-out"
                    placeholder="Last Name"
                  />
                  <label className="absolute left-3 top-2 text-sm text-base-content transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary">
                    Last Name
                  </label>
                </div>
              </>
            )}

            {/*  Email Field */}
            <div className="relative">
              <input
                type="email"
                ref={emailRef}
                required
                className="peer w-full px-3 pt-6 pb-2 bg-base-100 text-base-content border border-base-200 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md hover:border-primary transition-all duration-200 ease-in-out"
                placeholder="Email"
              />
              <label className="absolute left-3 top-2 text-sm text-base-content transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary">
                Email
              </label>
            </div>

            {/*  Password Field with Eye toggle inside input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                ref={passwordRef}
                required
                className="peer w-full px-3 pt-6 pb-2 bg-base-100 text-base-content border border-base-200 rounded-lg placeholder-transparent pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md hover:border-primary transition-all duration-200 ease-in-out"
                placeholder="Password"
              />
              <label className="absolute left-3 top-2 text-sm text-base-content transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary">
                Password
              </label>
              {/* 👁️ Toggle button inside input */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-base-content hover:text-primary transition-transform duration-200 ${
                  showPassword ? "rotate-180" : "rotate-0"
                }`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/*  Error Message in Netflix-style box */}
            {error && (
              <div className="flex items-center gap-2 border border-error text-error px-3 py-2 text-sm font-medium rounded bg-base-100">
                <XCircle size={16} className="text-error flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/*  Submit Button with Spinner */}
            <button
              type="submit"
              className={`btn btn-primary w-full transition duration-200 ${
                loading ? "btn-disabled" : "hover:scale-[1.01]"
              }`}
            >
              {loading ? (
                <span className="loading loading-spinner text-base-content"></span>
              ) : mode === "login" ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>

            {/*  Mode Toggle Link */}
            <p className="text-sm text-center text-base-content mt-2">
              {mode === "login" ? (
                <>
                  New to DevTinder?{" "}
                  <button
                    type="button"
                    className="link link-primary"
                    onClick={() => setMode("signup")}
                  >
                    Sign up now
                  </button>
                </>
              ) : (
                <>
                  Already a user?{" "}
                  <button
                    type="button"
                    className="link link-primary"
                    onClick={() => setMode("login")}
                  >
                    Login now
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
