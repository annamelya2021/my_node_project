import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../utils/local";
import "./Navigation.css";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      const role = localStorage.getItem('userRole'); // Get the role from localStorage
      setUserRole(role);
    }
  }, [token]);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    localStorage.removeItem('userRole'); // Remove the role from localStorage on logout
    setUserRole(null); // Clear user role in state
    navigate('/');
  };

  return (
    <div className="navbar">
      <nav>
        <ul>
          <div className="nav-links">
            <li><NavLink to="/">Posts</NavLink></li>
            <li><NavLink to="/contacts">Contacts</NavLink></li>
            {userRole === "admin" && <li><NavLink to="/users">Users</NavLink></li>}
          </div>
          <div className="auth-buttons">
            {isLoggedIn ? (
              <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
            ) : (
              <li><NavLink to="/login">Login</NavLink></li>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
