import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(!localStorage.getItem("token") ? null : localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Invalid token:", error);
        setUserRole(null);
      }
    }
  }, [token]);

  const authUser = (token) => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken !== token) {
      localStorage.setItem("token", token);
    }
    setToken(token);
  };

  return <AuthContext.Provider value={{ token, setToken, userRole, authUser }}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
