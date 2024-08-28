import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAdmin }) => {
  return (
    <nav>
      <Link to="/Home">Home</Link>
      <Link to="/Learn">Learn</Link>
      <Link to="/About">About Us</Link>
      <Link to="/Contact">Contact</Link>
      <Link to="/Login">Login</Link>
      {isAdmin && <Link to="/admin">Admin Dashboard</Link>}
    </nav>
  );
};

export default Navbar;
