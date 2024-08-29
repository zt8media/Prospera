import React, { useState } from 'react';
import '../styles/accordian.css'

// takes title and content & displays it
const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);
    

// when you click the div, it changes isActive to true/false which will display the content (when true)
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <p style={{fontSize: '20px'}}>{title}</p>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="accordion-content">{content}</div>} 
    </div>
  );
};

export default Accordion;