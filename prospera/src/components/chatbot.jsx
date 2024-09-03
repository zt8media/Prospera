import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import PigImage from '../media/1.png'; // Ensure correct path

// Chatbox Wrapper
const ChatboxWrapper = styled.div`
  position: fixed;
  bottom: 90px; /* Adjusted to be above the pig icon */
  right: 20px;
  width: 350px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
  border: 2px solid #87c38f;
  overflow: hidden;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};

  @media (max-width: 768px) {
    display: none; /* Hide chatbox on mobile devices */
  }
`;

// Chatbox Header
const ChatboxHeader = styled.div`
  background-color: #87c38f;
  color: white;
  padding: 10px;
  font-family: 'Fredoka', sans-serif;
  font-size: 18px;
  text-align: center;
`;

// Chatbox Content
const ChatboxContent = styled.div`
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  font-family: 'Fredoka', sans-serif;
  font-size: 16px;
`;

// Input Area
const ChatboxInput = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  border: none;
  border-top: 1px solid #ccc;
  outline: none;
  font-family: 'Fredoka', sans-serif;
`;

// Bounce animation for the pig icon
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-7px);
  }
`;

// Piggy Icon with bounce effect
const PiggyIcon = styled.img`
  position: fixed;
  bottom: 50px;
  right: 2px;
  width:100px;
  height: auto;
  cursor: pointer;

  &:hover {
    animation: ${bounce} 1s;
  }

  @media (max-width: 768px) {
    display: none; /* Hide piggy icon on mobile devices */
  }
`;

// Glow effect for the Need Help Box
const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 1);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
`;

// Need Help Box
const NeedHelpBox = styled.div`
  position: fixed;
  bottom: 20px; /* Positioned below the pig icon */
  right: 20px;
  background-color: black;
  color: white;
  padding: 5px;
  font-family: 'Fredoka', sans-serif;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;

  &:hover {
    animation: ${glow} 1.5s infinite;
  }

  @media (max-width: 768px) {
    display: none; /* Hide need help box on mobile devices */
  }
`;
// Styled links for predetermined options
const OptionLink = styled(Link)`
  display: block;
  margin-top: 10px;
  padding: 10px;
  background-color: #87c38f;
  color: white;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  font-family: 'Fredoka', sans-serif;
  cursor: pointer;

  &:hover {
    background-color: #76a07e;
  }
`;

const PiggyChatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I help you today?', from: 'bot' },
  ]);
  const [userInput, setUserInput] = useState('');

  const gameRoutes = {
    'Budgeting': '/game/budgeting',
    'Saving Money': '/game/saving',
    'Investing': '/game/investing',
    'Spending Wisely': '/game/spending-wisley',
  };

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = (e) => {
    if (e.key === 'Enter' && userInput.trim()) {
      const newMessages = [...messages, { text: userInput, from: 'user' }];
      setMessages(newMessages);
      setUserInput('');

      // Check for "games" keyword and respond with game links
      if (userInput.toLowerCase().includes('games')) {
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Here are some fun games you can play:', from: 'bot' },
          ]);
        }, 1000);

        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: <OptionLink to={gameRoutes['Budgeting']}>Budgeting Game</OptionLink>, from: 'bot' },
            { text: <OptionLink to={gameRoutes['Saving Money']}>Saving Money Game</OptionLink>, from: 'bot' },
            { text: <OptionLink to={gameRoutes['Investing']}>Investing Game</OptionLink>, from: 'bot' },
            { text: <OptionLink to={gameRoutes['Spending Wisely']}>Spending Wisely Game</OptionLink>, from: 'bot' },
          ]);
        }, 1500);
      } else {
        // Simulate a bot response with options
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Here are some options you can explore:', from: 'bot' },
          ]);
        }, 1000);

        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: <OptionLink to="/">Home</OptionLink>, from: 'bot' },
            { text: <OptionLink to="/Learn">Learn</OptionLink>, from: 'bot' },
            { text: <OptionLink to="/About">About Us</OptionLink>, from: 'bot' },
            { text: <OptionLink to="/Contact">Contact</OptionLink>, from: 'bot' },
            { text: <OptionLink to="/Login">Login</OptionLink>, from: 'bot' },
          ]);
        }, 1500);
      }
    }
  };

  return (
    <>
      <PiggyIcon src={PigImage} alt="Piggy Chat" onClick={toggleChatbox} />
      <NeedHelpBox>Need Help?</NeedHelpBox>
      <ChatboxWrapper isOpen={isOpen}>
        <ChatboxHeader>Piggy Chat</ChatboxHeader>
        <ChatboxContent>
          {messages.map((message, index) => (
            <div key={index} style={{ textAlign: message.from === 'user' ? 'right' : 'left' }}>
              {message.from === 'bot' && typeof message.text === 'string' ? (
                <p>{message.text}</p>
              ) : (
                message.text
              )}
            </div>
          ))}
        </ChatboxContent>
        <ChatboxInput
          type="text"
          placeholder="Ask a question..."
          value={userInput}
          onChange={handleUserInput}
          onKeyDown={handleSend}
        />
      </ChatboxWrapper>
    </>
  );
};

export default PiggyChatbox;
