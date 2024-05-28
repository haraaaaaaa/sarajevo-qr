import React from "react";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <nav className="font-mont border-b-slate-300 fixed top-0 z-50 w-full p-4 bg-white border shadow-sm ">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <NavLink to="/" className="font-semibold flex items-center">
            SarajevoQR
          </NavLink>
        </div>
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
