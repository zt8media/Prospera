import React from 'react';
import styled from 'styled-components';

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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

const SpendingGamePage = () => {
  return (
    <GameWrapper>
      <GameTitle>Investing Game</GameTitle>
      <EmbeddedGame>
        <iframe
          src="https://example.com/investing-game-url" // Replace with the correct URL
          title="Investing Game"
          allowFullScreen
          scrolling="no"
        />
      </EmbeddedGame>
    </GameWrapper>
  );
};

export default SpendingGamePage;
