import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/ReduxStore/userSlice";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  //  Verify OTP
  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      return toast.error("Enter a valid 6-digit OTP");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/verify-otp`,
        { email: user.email, otp },
        { withCredentials: true }
      );

      toast.success("Email verified successfully! Redirecting to feed...");

      // Update user in Redux
      dispatch(addUser({ ...user, isVerified: true }));

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      const message = err?.response?.data || "Failed to verify OTP";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  //  Resend OTP
  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/resend-otp`,
        { email: user.email },
        { withCredentials: true }
      );
      toast.success("OTP resent successfully!");
    } catch (err) {
      const message = err?.response?.data || "Failed to resend OTP";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-base-100 justify-center items-center px-4">
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      <div className="w-full max-w-sm p-6 rounded-2xl bg-base-300 shadow-lg">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">
          Verify Your Email
        </h2>
        <p className="text-sm text-center mb-4">
          Enter the 6-digit OTP sent to <strong>{user?.email}</strong>
        </p>

        <input
          type="text"
          value={otp}
          maxLength={6}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-base-200 focus:outline-none focus:ring-2 focus:ring-primary text-base-content mb-4"
          placeholder="Enter OTP"
        />

        <button
          onClick={handleVerify}
          className={`btn btn-primary w-full mb-2 ${
            loading ? "loading btn-disabled" : ""
          }`}
        >
          Verify
        </button>

        <button
          onClick={handleResend}
          className={`btn btn-secondary w-full mt-2 ${
            loading ? "loading btn-disabled" : ""
          }`}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
