import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/img/Screenshot 2025-08-20 173715.png";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Login = () => {
  const [disabled, setDisabled] = useState(true); // Start with disabled
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // Redirect after login

  useEffect(() => {
    loadCaptchaEnginge(6); // Load captcha with 6 characters
  }, []);

  // Handle form submit
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        const loggedUser  = result.user;
        console.log(loggedUser );
        alert("Login Successful!");
        e.target.reset();
        setDisabled(true); // Reset disabled state after successful login
        navigate(from, { replace: true }); // Navigate to the previous page or home
      })
      
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed: " + error.message);
      });
  };

  const handleValidate = (e) => {
    const value = e.target.value;
    if (validateCaptcha(value)) {
      setDisabled(false); // Enable the button if captcha is valid
    } else {
      setDisabled(true); // Disable the button if captcha is invalid
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[700px] mt-10 text-black">
      {/* Image Section */}
      <div className="md:w-1/2 w-full h-64 md:h-auto">
        <img src={img} alt="Login" className="w-full h-full object-cover" />
      </div>

      {/* Form Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
            Login now!
          </h1>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input w-full bg-gray-200"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input w-full bg-gray-200"
                required
              />
            </div>
            {/** Captcha */}
            <div>
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                onBlur={handleValidate}
                type="text"
                name="text"
                placeholder="captcha"
                className="input w-full bg-gray-200"
                required
              />
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="link link-hover text-blue-600"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={`btn w-full bg-amber-600 border-0 mt-4 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={disabled} // Disable button based on captcha validation
            >
              Login
            </button>
          </form>

          {/* Register link */}
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-amber-600 font-bold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
