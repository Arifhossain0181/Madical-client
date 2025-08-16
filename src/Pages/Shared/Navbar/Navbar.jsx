import React from 'react';
import { NavLink } from "react-router-dom";
import img4 from '../../../assets/img/logo.jpg'
const Navbar = () => {
  const links = <>
    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/about'>About</NavLink></li>
    <li><NavLink to='/appointment'>Appointment</NavLink></li>
    <li><NavLink to='/login'>Login</NavLink></li>
  </>;

  return (
    <div className=" navbar  fixed top-0 w-full z-50 text-white">
      <div className="navbar-start">
        <img className='w-18' src={img4} alt="" />
        <a className="btn btn-ghost text-  text-2xl hover:bg-orange-400">Doc House</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      {/* Mobile Menu Button on Right */}
      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" 
                 className="h-5 w-5" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 stroke="currentColor">
              <path strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow right-0">
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
