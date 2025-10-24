import React from "react";
import { Link, Outlet } from "react-router-dom";
import { 
  FaHome, 
  FaClipboardList, 
  FaUserMd, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaHistory, 
  FaHospital 
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div>
      <div className="drawer drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        
        {/* Main content */}
        <div className="drawer-content p-6">
          <Outlet /> {/* Renders child routes */}
        </div>

        {/* Sidebar */}
        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="is-drawer-close:w-14 is-drawer-open:w-64 bg-base-200 flex flex-col items-start min-h-full">
            {/* Sidebar content */}
            <ul className="menu w-full grow p-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 p-2 rounded hover:bg-amber-500 hover:text-white"
                >
                  <FaHome /> <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/booking"
                  className="flex items-center gap-2 p-2 rounded hover:bg-amber-500 hover:text-white"
                >
                  <FaClipboardList /> <span className="is-drawer-close:hidden">Booking</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/appointmentlist"
                  className="flex items-center gap-2 p-2 rounded hover:bg-amber-500 hover:text-white"
                >
                  <FaClipboardList /> <span className="is-drawer-close:hidden">Appointment List</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/rejectlist"
                  className="flex items-center gap-2 p-2 rounded hover:bg-red-500 hover:text-white"
                >
                  <FaTimesCircle /> <span className="is-drawer-close:hidden">Reject List</span>
                </Link>
              </li>
              
              <li>
                <Link
                  to="/dashboard/approvelist"
                  className="flex items-center gap-2 p-2 rounded hover:bg-green-500 hover:text-white"
                >
                  <FaCheckCircle /> <span className="is-drawer-close:hidden">Approve List</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/history"
                  className="flex items-center gap-2 p-2 rounded hover:bg-amber-500 hover:text-white"
                >
                  <FaHistory /> <span className="is-drawer-close:hidden">History</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/managedoctor"
                  className="flex items-center gap-2 p-2 rounded hover:bg-amber-500 hover:text-white"
                >
                  <FaHospital /> <span className="is-drawer-close:hidden">Manage Doctor</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/appointment"
                  className="flex items-center gap-2 p-2 rounded hover:bg-amber-500 hover:text-white"
                >
                  <FaClipboardList /> <span className="is-drawer-close:hidden">Appointment</span>
                </Link>
              </li>
            </ul>

            {/* Drawer toggle button */}
            <div
              className="m-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Open"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
