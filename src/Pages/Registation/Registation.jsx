import React from "react";
import scenshort from "../../assets/img/Screenshot 2025-08-20 173715.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Registration = () => {

    const {user, createUser} = useContext(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log({ name, username, email, password });
    alert("Account Created Successfully!");
    createUser(email, password)
    .then(result=>{
        console.log(result.user);
        alert("Account Created Successfully!");
        e.target.reset();
    })
    .catch(error =>{
        console.log(error.message)
    })
  };

  return (
    <div className="flex flex-col md:flex-row h-[700px] mt-10">
      {/* Image */}
      <div className="md:w-1/2 w-full h-64 md:h-auto">
        <img
          src={scenshort}
          alt="Doc House"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Registration Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-black">
            Sign UP to Doc House
          </h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="input w-full bg-gray-200"
                required
              />
            </div>
            <div>
              <label className="label">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Your Username"
                className="input w-full bg-gray-200"
                required
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="input w-full bg-gray-200"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="input w-full bg-gray-200"
                required
              />
            </div>

            <div className="text-right">
              <Link className="link link-hover text-blue-600" to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn w-full bg-amber-600 border-0 mt-4"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-600 font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
