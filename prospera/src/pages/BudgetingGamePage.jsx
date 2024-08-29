import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BackButton = styled.button`
  position: absolute;
  top: 20px;
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
`;
 
const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color:#76b07f;
  font-family: 'Fredoka', sans-serif;
`;

const GameTitle = styled.h1`
  font-size: 5rem;
  margin-bottom: 20px;
  color: #fff;
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
