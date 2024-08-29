import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  let userRole = null;

  if (token) {
    try {
      userRole = JSON.parse(atob(token.split('.')[1])).role;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  return (
    <nav>
      <Link to="/Home">Home</Link>
      <Link to="/Learn">Learn</Link>
      <Link to="/About">About Us</Link>
      <Link to="/Contact">Contact</Link>
      <Link to="/Login">Login</Link>
      {userRole === 'admin' && <Link to="/Admin">Admin Dashboard</Link>}
    </nav>
  );
};

export default Navbar;
