import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src="/logo.png" alt="Company Logo" className="logo-img" />
      </Link>

      <ul className="nav-links">
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
