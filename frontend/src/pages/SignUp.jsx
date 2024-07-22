import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LogoRed from "../assets/NixorSharkOutlineNormal.png";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();
  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    // prevent page refresh on submit
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(false);

    try {
      // call signup endpoint
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // check success
      if (data.success === false) {
        setSubmitError(data.message);
        setSubmitLoading(false);
        return;
      }
      setSubmitError(null);
      setSubmitLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setSubmitError(error.message);
      setSubmitLoading(false);
    }
  };

  return (
    <div className="p-12 flex flex-col gap-10 font-inter">
      <div className="flex flex-col items-center">
        <img src={LogoRed} className="h-20 w-20 object-contain" />
        <h1 className="font-semibold text-xl">Create an account to continue</h1>
      </div>
      <div className="w-full m-auto">
        <div className="bg-white p-12 rounded-lg border shadow-sm sm:max-w-[580px] mx-auto">
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                id="fullName"
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            </div>
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
              <label htmlFor="">Email address</label>
              <input
                type="email"
                id="email"
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
              disabled={submitLoading}
              className="bg-red-700 text-white p-2 rounded-lg disabled:opacity-80"
            >
              {submitLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>
          <div className="text-light mt-6">
            <span>
              Already have an account?{" "}
              <Link to={"/sign-in"} className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </span>
          </div>
          {submitError !== null && (
            <h1 className="text-red-700 text-sm mt-5">{submitError}</h1>
          )}
        </div>
      </div>
    </div>
  );
}
