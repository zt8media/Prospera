import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAdmin }) => {
  return (
    <nav>
      <Link to="/activities">Activities</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/about us">About Us</Link>
      {isAdmin && <Link to="/admin">Admin Dashboard</Link>}
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
