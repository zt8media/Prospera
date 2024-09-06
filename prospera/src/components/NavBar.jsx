import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/nav.css';
import logo from '../media/Navbar-pig.png'; // Logo for navbar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons'; // FontAwesome icons

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const closeMobileMenu = () => {
    setIsMobile(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Remove userId on logout
    navigate('/login'); // Navigate to login page
  };

  const handleUserIconClick = () => {
    if (userId) {
      navigate('/user/dashboard'); // Navigate to dashboard if logged in
    } else {
      navigate('/login'); // Navigate to login if not logged in
    }
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
        {!userId ? (
          <li><Link to="/Login" onClick={closeMobileMenu}>Login</Link></li>
        ) : (
          <>
            <li><button onClick={handleLogout} className="nav-signout-btn">Sign Out</button></li>
            {/* Generic User Icon */}
            <li onClick={handleUserIconClick} className="user-avatar-container">
              <FontAwesomeIcon icon={faUserCircle} className="user-avatar-icon" />
            </li>
          </>
        )}
      </ul>
      <div className="hamburger" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={isMobile ? faTimes : faBars} />
      </div>
    </nav>
  );
};

export default Navbar;
