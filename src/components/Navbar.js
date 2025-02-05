import React from 'react';
// import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-[90px] bg-transparent z-50 flex justify-between items-center px-6 md:px-10">
      <div className="flex items-center justify-center bg-transparent">
        <img src={logo} alt="Logo" className="h-[60px] mr-4" />
      </div>

      {/* <div className="nav-button">
        <NavLink
          to="/signup"
          className="text-white bg-[#ba5b38] text-xl font-bold px-4 py-3 rounded-md hover:bg-[#ff9d3d] transition-colors duration-300"
        >
          Sign Up
        </NavLink>
      </div> */}
    </nav>
  );
}

export default Navbar;
