import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import PigImage from '../media/1.png';
import ChaChingSound from '../media/cha-ching-7053.mp3';

// Wrapper for the entire component
const PigJokesSection = styled.section`
  background-color: #87c38f;
  padding: 50px 0;
  text-align: center;
  margin-bottom: 0px;
  border-top: 8px solid black; 
  border-bottom: 20px solid black; 
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
  top: -80px; 
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

const AudioButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HearJokeButton = styled.button`
  background-color: #f06292;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-family: 'Fredoka', sans-serif;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #ec407a;
  }
`;

const PigJokes = () => {
  const [joke, setJoke] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [jokeCount, setJokeCount] = useState(0);
  const [shouldBounce, setShouldBounce] = useState(false);
  const audioRef = useRef(new Audio(ChaChingSound));
  const [voices, setVoices] = useState([]);

  // Fetch available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Load voices on component mount
  }, []);

  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/jokes/random');
      setJoke(response.data.setup + ' ' + response.data.punchline);
      setJokeCount(jokeCount + 1);
    } catch (error) {
      setJoke('Failed to fetch a joke.');
    }
  };

  const handlePigClick = () => {
    fetchJoke();
    setShowBubble(true);
    setShouldBounce(true);

    audioRef.current.currentTime = 0;
    audioRef.current.play();

    setTimeout(() => {
      audioRef.current.pause();
    }, 2000);

    setTimeout(() => {
      setShouldBounce(false);
    }, 1000);
  };

  const speakJoke = () => {
    if (joke) {
      const speech = new SpeechSynthesisUtterance(joke);
      
      // Select a specific voice (modify based on the desired voice)
      const selectedVoice = voices.find(voice => voice.name === 'Google UK English Female');
      if (selectedVoice) {
        speech.voice = selectedVoice;
      }

      window.speechSynthesis.speak(speech);
    }
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
        <AudioButtonWrapper>
          <HearJokeButton onClick={speakJoke}>Hear Joke</HearJokeButton>
        </AudioButtonWrapper>
      </PigJokesWrapper>
    </PigJokesSection>
  );
};

export default PigJokes;
