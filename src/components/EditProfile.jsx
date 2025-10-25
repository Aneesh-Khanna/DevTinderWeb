import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { XCircle, PlusCircle } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/ReduxStore/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form state
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills || []);
  const [skillInput, setSkillInput] = useState("");

  // UI state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Add skill
  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Save profile
  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      firstName,
      lastName,
      photoUrl,
      age,
      gender,
      about,
      skills,
    };

    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });
      toast.success("Profile saved successfully");
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      const message = err?.response?.data || "Something went wrong. Try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // 🔧 Floating label logic
  const floatingLabel = (value, label) =>
    `absolute left-3 transition-all duration-200 ${
      value ? "top-2 text-sm text-primary" : "top-5 text-base text-base-content"
    }`;

  return (
    <div className="min-h-screen bg-base-100 px-4 py-10">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

      <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
        {/* Form */}
        <form
          onSubmit={handleSave}
          className="w-full max-w-sm p-6 rounded-2xl bg-base-300 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:border hover:border-primary"
        >
          <h2 className="text-2xl font-bold text-primary text-center mb-4 tracking-tight">
            Edit Profile
          </h2>

          <div className="space-y-6">
            {/* First Name */}
            <div className="relative h-20">
              <label className={floatingLabel(firstName, "First Name")}>
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full h-full pt-6 px-3 pb-2 bg-base-100 text-base-content border border-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md hover:border-primary"
              />
            </div>

            {/* Last Name */}
            <div className="relative h-20">
              <label className={floatingLabel(lastName, "Last Name")}>
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full h-full pt-6 px-3 pb-2 bg-base-100 text-base-content border border-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md hover:border-primary"
              />
            </div>

            {/* Photo URL */}
            <div className="relative h-20">
              <label className={floatingLabel(photoUrl, "Photo URL")}>
                Photo URL
              </label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
                className="w-full h-full pt-6 px-3 pb-2 bg-base-100 text-base-content border border-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md hover:border-primary"
              />
            </div>

            {/* Age */}
            <div className="relative h-20">
              <label className={floatingLabel(age, "Age")}>Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="w-full h-full pt-6 px-3 pb-2 bg-base-100 text-base-content border border-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md hover:border-primary"
              />
            </div>

            {/* Gender */}
            {/* Gender */}
            <div className="relative h-20">
              {/* Always-floating label */}
              <label className="absolute left-3 top-2 text-sm text-base-content">
                Gender
              </label>

              {/* Select box */}
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full h-full pt-6 px-3 pb-2 bg-base-100 text-base-content border border-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md hover:border-primary appearance-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {/* Custom arrow */}
              <div className="pointer-events-none absolute right-3 top-[60%] transform -translate-y-1/2 text-base-content text-sm">
                ▼
              </div>
            </div>

            {/* About */}
            <div className="relative h-28">
              <label className={floatingLabel(about, "About")}>About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={4}
                required
                className="w-full h-full pt-6 px-3 pb-2 bg-base-100 text-base-content border border-base-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-md hover:border-primary"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="text-sm text-base-content mb-1 block">
                Skills
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill"
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="btn btn-outline btn-primary"
                >
                  <PlusCircle size={18} />
                </button>
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="badge badge-outline badge-sm px-2 py-1 text-xs rounded-full flex items-center gap-1"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-error hover:text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 border border-error text-error px-3 py-2 text-sm font-medium rounded bg-base-100">
                <XCircle size={16} className="text-error flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn btn-outline btn-error hover:scale-[1.02] transition duration-200"
              >
                Back to Feed
              </button>
              <button
                type="submit"
                className={`btn btn-primary transition duration-200 ${
                  loading ? "btn-disabled" : "hover:scale-[1.02]"
                }`}
              >
                {loading ? (
                  <span className="loading loading-spinner text-base-content"></span>
                ) : (
                  "Save Profile"
                )}
              </button>
            </div>
          </div>
        </form>

        {/*  Live Preview Card */}
        <div className="hidden md:block">
          <UserCard
            user={{
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
              skills,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
