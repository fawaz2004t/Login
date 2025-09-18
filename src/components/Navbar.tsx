import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="/logo.png" alt="Company Logo" className="logo" />
      </div>
      <ul className="nav-links">
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={logout} className="logout-btn">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
