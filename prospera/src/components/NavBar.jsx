import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/nav.css';
import logo from '../media/Navbar-pig.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const closeMobileMenu = () => {
    setIsMobile(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    navigate('/login'); // Navigate to login page
  };

  return (
    <nav className="navbar">
      <div className="nav-logo-container">
        <img src={logo} alt="Prospera Logo" className="nav-logo" />
        <span className="nav-title">Prospera</span>
      </div>
      <ul className={`navlinks ${isMobile ? 'navlinks-mobile' : ''}`}>
        <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
        <li><Link to="/Learn" onClick={closeMobileMenu}>Learn</Link></li>
        <li><Link to="/About" onClick={closeMobileMenu}>About Us</Link></li>
        <li><Link to="/Contact" onClick={closeMobileMenu}>Contact</Link></li>
        {!token ? (
          <li><Link to="/Login" onClick={closeMobileMenu}>Login</Link></li>
        ) : (
          <li><button onClick={handleLogout} className="logout-btn">Sign Out</button></li>
        )}
      </ul>
      <div className="hamburger" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={isMobile ? faTimes : faBars} />
      </div>
    </nav>
  );
};

export default Navbar;
