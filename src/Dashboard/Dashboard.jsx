import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("welcome");

  return (
    <div className="min-h-screen flex flex-col text-black">
      {/* Navbar */}
      <div className="bg-emerald-950 p-5 h-20 flex items-center justify-between">
        <Navbar />
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="bg-gray-100 w-64 p-5 space-y-4">
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => setActivePage("addDoctor")}
                className="block w-full text-left p-2 rounded hover:bg-emerald-200"
              >
                Add A Doctor
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("allUsers")}
                className="block w-full text-left p-2 rounded hover:bg-emerald-200"
              >
                All Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("manageDoctors")}
                className="block w-full text-left p-2 rounded hover:bg-emerald-200"
              >
                Manage Doctors
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("welcome")}
                className="block w-full text-left p-2 rounded hover:bg-emerald-200"
              >
                Dashboard Home
              </button>
            </li>
            <li>
              <Link
                to="/"
                className="block w-full text-left p-2 rounded hover:bg-emerald-200"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side Content */}
        <div className="flex-1 bg-gray-50 p-5">
          {activePage === "welcome" && (
            <h2 className="text-3xl font-bold text-center mt-10">
              Welcome to Dashboard
            </h2>
          )}

          {activePage === "addDoctor" && (
            <div>
              <h2 className="text-2xl font-bold mb-5">Add a New Doctor</h2>
              <form className="space-y-4 max-w-md">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full border p-2 rounded"
                />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full border p-2 rounded"
                />
                <select className="w-full border p-2 rounded">
                  <option>Teeth Orthodontics</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                </select>
                <input type="file" className="w-full border p-2 rounded" />
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </form>
            </div>
          )}

          {activePage === "manageDoctors" && (
            <div>
              <h2 className="text-2xl font-bold mb-5">Manage Doctors</h2>
              <p>Here will be the list of doctors...</p>
            </div>
          )}

          {activePage === "allUsers" && (
            <div>
              <h2 className="text-2xl font-bold mb-5">All Users</h2>
              <p>Here will be the list of all users...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
