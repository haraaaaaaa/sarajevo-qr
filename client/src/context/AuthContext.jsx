import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        return decodedToken.role;
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Invalid token:", error);
        setUserRole(null);
      }
    }
  }, [token]);

  const authUser = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      setToken(token);
      setUserRole(decodedToken.role);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  };

  const value = useMemo(() => ({ token, userRole, setToken, authUser }), [token, userRole]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext in any component
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
