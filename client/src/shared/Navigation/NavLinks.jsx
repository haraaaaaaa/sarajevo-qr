import React, { useEffect, useState } from "react";
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

  const links = [
    {
      label: "Lokacije",
      href: "/locations",
    },
    {
      label: "Prijavi se",
      href: "/login",
    },
  ];

  return (
    <ul className="gap-6 z-30 bg-white text-gray-600 font-medium text-md flex items-center">
      {links.map(({ label, href }) => (
        <NavLink
          key={href}
          to={href}
          className={`outline-orange-400 ${activeLink === href ? "text-orange-500 " : ""}`}
          activeClassName={activeLink === href ? "text-orange-600" : ""}
          onClick={handleNavLinkClick}
        >
          <li className="hover:bg-white cursor-pointer rounded-sm p-2 text-center px-4 transition">{label}</li>
        </NavLink>
      ))}
    </ul>
  );
};

export default NavLinks;
