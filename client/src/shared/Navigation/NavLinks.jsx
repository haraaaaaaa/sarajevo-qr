import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useLocation } from "react-router-dom";

const NavLinks = () => {
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleNavLinkClick = () => {
    setActiveLink("/");
  };

  const { token, userRole } = useAuth();

  const links = [
    {
      label: "Lokacije",
      href: "/locations",
    },
    token &&
      userRole === "guide" && {
        label: "Dodaj lokaciju",
        href: "/add-location",
      },
    token &&
      userRole === "admin" && {
        label: "Dodaj vodica",
        href: "/guide-signup",
      },
    !token &&
      !userRole && {
        label: "Prijavi se",
        href: "/signin",
      },
    !token &&
      !userRole && {
        label: "Kreiraj nalog",
        href: "/signup",
      },
    token && {
      label: "Odjavi se",
      href: "/signout",
    },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <NavLink
          to={href}
          key={href}
          className={`outline-orange-400 ${activeLink === href ? "text-orange-500 " : ""}`}
          activeClassName={activeLink === href ? "text-orange-600" : ""}
          onClick={handleNavLinkClick}
        >
          <li className="hover:bg-white cursor-pointer rounded-sm p-2 text-center px-4 transition">{label}</li>
        </NavLink>
      );
    });

  return <ul className="gap-6 z-30 bg-white text-gray-600 font-medium text-md flex items-center">{links}</ul>;
};

export default NavLinks;
