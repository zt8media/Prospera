import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PigImage from '../media/PigJoke.png'; // Ensure correct path

const PigJokesWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const PigImageStyled = styled.img`
  width: 100px; /* Adjust the size as needed */
  height: auto;
  cursor: pointer;
`;

const ThoughtBubble = styled.div`
  position: absolute;
  left: 120px; /* Adjust based on your layout */
  background-color: #f5f5f5;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 10px;
  max-width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: ${({ show }) => (show ? 'block' : 'none')};
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 20px;
    border-width: 10px;
    border-style: solid;
    border-color: #f5f5f5 transparent transparent transparent;
  }
`;

const PigJokes = () => {
  const [joke, setJoke] = useState('');
  const [showBubble, setShowBubble] = useState(false);

  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/jokes/random');
      setJoke(response.data.setup + ' ' + response.data.punchline);
    } catch (error) {
      setJoke('Failed to fetch a joke.');
    }
  };

  const handlePigClick = () => {
    fetchJoke();
    setShowBubble(true);
  };

  return (
    <PigJokesWrapper>
      <PigImageStyled
        src={PigImage} // Ensure correct path
        alt="Pig"
        onClick={handlePigClick}
      />
      <ThoughtBubble show={showBubble}>
        {joke}
      </ThoughtBubble>
    </PigJokesWrapper>
  );
};

export default PigJokes;
