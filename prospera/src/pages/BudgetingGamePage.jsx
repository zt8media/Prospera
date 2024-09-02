import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BackButton = styled.button`
  position: absolute;
  top: 110px;
  left: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #00796b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005f56;
  }

  @media (max-width: 768px) {
    top: 100px;
    left: 10px;
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    top: 115px;
    left: 5px;
    padding: 6px 10px;
    font-size: 0.8rem;
  }
`;
 
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
  font-family: 'Fredoka', sans-serif;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 5px;
  }
`;

const GameTitle = styled.h1`
  font-size: 5rem;
  margin-bottom: 20px;
  color: black;

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
`;

const EmbeddedGame = styled.div`
  width: 80%;
  height: 70%;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    width: 90%;
    height: 60%;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 50%;
  }
`;

const BudgetingGamePage = () => {
  const navigate = useNavigate();
  return (
    <GameWrapper>
      <BackButton onClick={() => navigate('/learn')}>Back</BackButton>
      <GameTitle>Budgeting Game</GameTitle>
      <EmbeddedGame>
        <iframe
          src="https://view.genially.com/66cdd7d804104caccaaff26c"
          title="Budgeting Game"
          allowFullScreen
          scrolling="no"
        />
      </EmbeddedGame>
    </GameWrapper>
  );
};

export default BudgetingGamePage;
