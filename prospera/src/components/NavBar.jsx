import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css'
import logo from '../media/user-solid.svg'

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
      <div className='navlinks'>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/Learn">Learn</Link></li>
      <li><Link to="/About">About Us</Link></li>
      <li><Link to="/Contact">Contact</Link></li>
      <li><Link to="/Login">Login</Link></li>
      {userRole === 'admin' && <Link to="/Admin">Admin Dashboard</Link>}
      <img src={logo} alt='user-profile-logo' className='user-logo'></img>
      </div>
      
    </nav>
  );
};

export default Navbar;
