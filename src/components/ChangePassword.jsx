import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false); // toggle for current password
  const [showNew, setShowNew] = useState(false); // toggle for new password

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit password change
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );

      toast.success("Password changed successfully!");
      setFormData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      const msg = err?.response?.data || "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

      <form
        onSubmit={handleSubmit}
        className="bg-base-300 p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Change Password
        </h2>

        {/*  Current Password */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-base-content">
              Current Password
            </span>
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="input input-bordered bg-base-100 text-base-content w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrent((prev) => !prev)}
              className="absolute right-2 top-2 text-base-content"
            >
              {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/*  New Password */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text text-base-content">New Password</span>
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="input input-bordered bg-base-100 text-base-content w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowNew((prev) => !prev)}
              className="absolute right-2 top-2 text-base-content"
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/*  Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-1.5 text-sm bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out transform hover:scale-[1.05] hover:shadow-md"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-1.5 text-sm border border-red-500 text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-all duration-200 ease-in-out transform hover:scale-[1.05] hover:shadow-md"
          >
            Back to Feed
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
