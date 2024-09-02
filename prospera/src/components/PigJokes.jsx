import React, { useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import PigImage from '../media/1.png';
import ChaChingSound from '../media/cha-ching-7053.mp3';

// Wrapper for the entire component
const PigJokesSection = styled.section`
  background-color: #87c38f;
  padding: 50px 0;
  text-align: center;
  margin-bottom: 40px;
  border-top: 10px solid black; /* Add border to top */
  border-bottom: 10px solid black; /* Add border to bottom */
`;

// Title for the Pig Jokes section
const Title = styled.h2`
  color: white;
  font-family: 'Fredoka', sans-serif;
  font-size: 40px;
  margin-bottom: 125px;
`;

// Animation for the pig bounce
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

// Wrapper for the pig and jokes
const PigJokesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const PigImageStyled = styled.img`
  width: 250px;
  height: auto;
  cursor: pointer;
  animation: ${({ shouldBounce }) => (shouldBounce ? bounce : 'none')} 1s;
`;

const ThoughtBubble = styled.div`
  position: absolute;
  bottom: 300px; /* Raise the bubble higher */
  left: 50%;
  transform: translateX(-50%);
  background-color: #f5f5f5;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 15px;
  max-width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: ${({ show }) => (show ? 'block' : 'none')};

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: #f5f5f5 transparent transparent transparent;
  }
`;

const JokeCounter = styled.p`
  color: white;
  font-family: 'Fredoka', sans-serif;
  font-size: 20px;
  margin-top: 20px;
`;

const PigJokes = () => {
  const [joke, setJoke] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [jokeCount, setJokeCount] = useState(0);
  const [shouldBounce, setShouldBounce] = useState(false);

  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/jokes/random');
      setJoke(response.data.setup + ' ' + response.data.punchline);
      setJokeCount(jokeCount + 1); // Increment the joke counter
    } catch (error) {
      setJoke('Failed to fetch a joke.');
    }
  };

  const handlePigClick = () => {
    fetchJoke();
    setShowBubble(true);
    setShouldBounce(true);

    const audio = new Audio(ChaChingSound);
    audio.currentTime = 0;
    audio.play();

    setTimeout(() => {
      audio.pause();
    }, 2000);

    setTimeout(() => {
      setShouldBounce(false);
    }, 1000); // Reset bounce after animation
  };

  return (
    <PigJokesSection>
      <Title>Click the Piggy for a Joke!</Title>
      <PigJokesWrapper>
        <PigImageStyled
          src={PigImage}
          alt="Pig"
          onClick={handlePigClick}
          shouldBounce={shouldBounce}
        />
        <ThoughtBubble show={showBubble}>
          {joke}
        </ThoughtBubble>
        <JokeCounter>Jokes Displayed: {jokeCount}</JokeCounter>
      </PigJokesWrapper>
    </PigJokesSection>
  );
};

export default PigJokes;
