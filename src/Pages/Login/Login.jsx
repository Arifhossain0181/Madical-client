import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/img/Screenshot 2025-08-20 173715.png";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { useEffect } from 'react';
import { useRef ,useState} from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Login = () => {
    const caPtchaRef = useRef(null);
    const [disabled,setdisabled] = useState(false);
  const {user ,signIn} = useContext(AuthContext);
    useEffect(() => {
        loadCaptchaEnginge(6); // Load captcha with 6 characters
    }, []);
  // Handle form submit
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value; // name attribute দিয়ে access
    const password = e.target.password.value;

    console.log({ email, password });
    alert("Login Successful!");
    signIn(email, password)
    .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        alert("Login Successful!");
        e.target.reset();})
    .catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed: " + error.message);
    }    )

  };
  const handlevalidate = e =>{
    const value = caPtchaRef.current.value;
    console.log(value);
    if (validateCaptcha(value)) {
        setdisabled(true);
  }
  else{
    setdisabled(false);
  }
}

  return (
    <div className="flex flex-col md:flex-row h-[700px] mt-10">
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
                name="email" // added name for form handling
                placeholder="Email"
                className="input w-full bg-gray-200"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password" // added name for form handling
                placeholder="Password"
                className="input w-full bg-gray-200"
                required
              />
            </div>
            {/** caPtcha */}
            <div>
              <label className="label">    <LoadCanvasTemplate /></label>
              <input
               ref={caPtchaRef}
                type="text"
                name="text" // added name for form handling
                placeholder="captcha"
                className="input w-full bg-gray-200"
                required
              />
              <button onClick={handlevalidate} className="btn btn-outline btn-xs w-full">validate</button>
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="link link-hover text-blue-600">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn w-full bg-amber-600 border-0 mt-4"
            >
              Login
            </button>
          </form>

          {/* Register link */}
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link disabled={disabled} to="/register" className="text-amber-600 font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
