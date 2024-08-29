import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';

// Object mapping game types to their respective titles
const games = {
  budgeting: 'Budgeting Game',
  saving: 'Saving Game',
  investing: 'Investing Game',
  spending: 'Spending Game',
};

// Styled-components for styling the page
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
  font-family: 'Fredoka', sans-serif;
`;

const GameTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const EmbeddedGame = styled.div`
  width: 80%;
  height: 60%;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

// Modal styles
const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '12px',
    width: '80%',
    height: '70%',
  },
};

// Main GamePage component
const GamePage = () => {
  const location = useLocation(); // Use React Router's useLocation hook
  const [modalIsOpen, setModalIsOpen] = useState(true); // Open modal by default

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const gameUrl = location.state?.gameUrl || ''; // Get the game URL passed from LearnPage, fallback to empty string if undefined
  const gameType = location.state?.gameType || 'Game'; // Get the game type for the title

  return (
    <GameWrapper>
      <GameTitle>{games[gameType]}</GameTitle>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel={`${games[gameType]} Modal`}
        ariaHideApp={false} // Disable hiding app for screen readers (not recommended)
      >
        <EmbeddedGame>
          <iframe
            src={gameUrl}
            title={`${games[gameType]} Interactive Game`}
            allowFullScreen
            scrolling="no"
          />
        </EmbeddedGame>
      </Modal>
    </GameWrapper>
  );
};

export default GamePage;
