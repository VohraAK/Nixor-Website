import { Link, useNavigate } from "react-router-dom";
import LogoRed from "../assets/NixorSharkOutlineNormal.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFaliure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});

  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      // call signin endpoint
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // check success
      if (data.success === false) {
        dispatch(signInFaliure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFaliure(error.message));
    }
  };

  return (
    <div className="p-12 flex flex-col gap-10 font-inter">
      <div className="flex flex-col items-center">
        <img src={LogoRed} className="h-20 w-20 object-contain" />
        <h1 className="font-semibold text-xl">Sign in to your account</h1>
      </div>
      <div className="w-full m-auto">
        <div className="bg-white p-12 rounded-lg border shadow-sm sm:max-w-[580px] mx-auto">
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Username</label>
              <input
                type="text"
                id="username"
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Password</label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-red-700 text-white p-2 rounded-lg disabled:opacity-80"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <div className="text-light">
              <span>
                No account?{" "}
                <Link to={"/sign-up"} className="text-blue-600 hover:underline">
                  Create an account
                </Link>
              </span>
            </div>
          </form>
          {error ? <h1 className="text-red-700 text-sm mt-5">{error}</h1> : ""}
        </div>
      </div>
    </div>
  );
}
