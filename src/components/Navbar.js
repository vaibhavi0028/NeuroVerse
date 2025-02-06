import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo2.png";
import avatar from "../assets/teamavatar.png";
import info from "../assets/info1.png";

function Navbar() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-[90px] z-50 flex justify-between items-center px-6 md:px-10 transition-all duration-300 ${
        scrolling ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-center bg-transparent">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="h-[50px] mr-4" />
        </NavLink>
      </div>
      <div className="flex items-center justify-center bg-transparent gap-6">
        <NavLink to="/aboutus" className="text-[#ba5b38] text-xl font-bold">
          <img src={info} alt="About NeuroVerse" className="h-[30px] mr-4" />
        </NavLink>
        <NavLink to="/aboutteam" className="text-[#ba5b38] text-xl font-bold">
          <img src={avatar} alt="About Team" className="h-[35px] mr-4" />
        </NavLink>
      </div>

      {/* Uncomment to add Sign Up button */}
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
