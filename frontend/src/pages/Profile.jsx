import { useDispatch, useSelector } from "react-redux";
import LogoRed from "../assets/NixorSharkOutlineNormal.png";
import {
  signOutStart,
  signOutSuccess,
  signOutFaliure,
  updateUserStart,
  updateUserSuccess,
  updateUserFaliure,
} from "../redux/user/userSlice.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationStatus from "../components/ApplicationStatus.jsx";

export default function Profile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [signoutLoading, setSignoutLoading] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        const response = await fetch(
          `/api/applicant/checkstatus/${currentUser._id}`
        );
        const data = await response.json();
        if (data.success === false) {
          setApplicationStatus(null);
          return;
        }
        setApplicationStatus(data);
      } catch (error) {
        setApplicationStatus(null);
      }
    };
    fetchApplicationStatus();
  }, [currentUser._id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignOut = async () => {
    try {
      setSignoutLoading(true);
      dispatch(signOutStart());

      const response = await fetch("/api/auth/signout");
      const data = await response.json();

      if (data.success === false) {
        setSignoutLoading(false);
        dispatch(signOutFaliure(data.message));
        return;
      }
      dispatch(signOutSuccess());
      setSignoutLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setSignoutLoading(false);
      dispatch(signOutFaliure(error.message));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setUserUpdateSuccess(false);
      dispatch(updateUserStart());

      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        setUserUpdateSuccess(false);
        dispatch(updateUserFaliure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUserUpdateSuccess(true);
    } catch (error) {
      setUserUpdateSuccess(false);
      dispatch(updateUserFaliure(error.message));
    }
  };

  return (
    <div className="p-12 flex flex-col gap-10 font-inter">
      <div className="flex flex-col items-center">
        <img src={LogoRed} className="h-20 w-20 object-contain" />
        <h1 className="font-semibold text-2xl">
          Hello <span className="text-red-800">{currentUser.username}</span>
        </h1>
      </div>
      <div className="w-full m-auto">
        <div className="bg-white p-12 rounded-lg border shadow-sm sm:max-w-[660px] mx-auto">
          {currentUser && currentUser.userType === "applicant" && (
            <ApplicationStatus applicationStatus={applicationStatus} />
          )}
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
            <p className="text-center my-5">ADD IMAGE HERE</p>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="border rounded-md p-2"
                onChange={handleChange}
                defaultValue={currentUser.fullName}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Username</label>
              <input
                type="text"
                id="username"
                className="border rounded-md p-2"
                onChange={handleChange}
                defaultValue={currentUser.username}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Email</label>
              <input
                type="text"
                id="email"
                className="border rounded-md p-2"
                onChange={handleChange}
                defaultValue={currentUser.email}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Change your password</label>
              <input
                type="password"
                id="password"
                className="border rounded-md p-2"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Date of Birth</label>
              <input
                type="date"
                id="DOB"
                className="border rounded-md p-2"
                onChange={handleChange}
                defaultValue={currentUser.DOB}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-red-700 text-white p-2 rounded-lg disabled:opacity-80"
            >
              {loading
                ? "Updating..."
                : userUpdateSuccess
                ? "Profile updated successfully ✓"
                : "Update Profile"}
            </button>
          </form>
          <button
            onClick={handleSignOut}
            className="text-red-700 mt-10 hover:underline disabled:opacity-80"
            disabled={signoutLoading}
          >
            Sign out
          </button>
          {error ? error : ""}
        </div>
      </div>
    </div>
  );
}
