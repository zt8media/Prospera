import React from 'react';
import video from '../media/hero-video.mp4'
import '../styles/hero.css'

const HeroSection = () => {


  return (
    <>
    <div className="hero-section">
      <video autoPlay loop muted className="hero-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div className="overlay-content">
      <h1 style={{fontFamily:'Shrikhand'}}>Prospera</h1>
      <p>Smart money starts here</p>
   </div>
   </>
  );
};

export default HeroSection;