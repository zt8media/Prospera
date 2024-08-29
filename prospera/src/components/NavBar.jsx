import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css'
import logo from '../media/user-solid.svg'

const Navbar = ({ isAdmin }) => {
  return (
    <nav>
      <div className='navlinks'>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/Learn">Learn</Link></li>
      <li><Link to="/About">About Us</Link></li>
      <li><Link to="/Contact">Contact</Link></li>
      <li><Link to="/Login">Login</Link></li>
      {isAdmin && <Link to="/admin">Admin Dashboard</Link>}
      <img src={logo} alt='user-profile-logo' className='user-logo'></img>
      </div>
      
    </nav>
  );
};

export default Navbar;
