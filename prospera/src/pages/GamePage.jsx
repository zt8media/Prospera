import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #87c38f; 
  padding: 20px; /* Adjusted padding */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px; /* Adjust padding for mobile */
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: black;
`;

const Title = styled.h1`
  font-size: 3rem; /* Adjusted font size */
  text-align: center;
  margin-bottom: 20px;
  color: white;
  font-family: 'Fredoka', sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem; /* Adjust font size for mobile */
  }
`;

const GameContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 0;
  padding-bottom: 56.25%;
  position: relative;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      <Title>Budgeting</Title>
      <GameContainer>
        <div style={{ width: '100%' }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', paddingTop: '0', height: '0' }}>
            <iframe
              title="Memory Game"
              frameBorder="0"
              width="1200"
              height="675"
              style={{ position: 'absolute', top: '10', left: '0', width: '100%', height: '100%' }}
              src="https://view.genially.com/66cdd7d804104caccaaff26c"
              type="text/html"
              allowScriptAccess="always"
              allowFullScreen
              scrolling="yes"
              allowNetworking="all"
            />
          </div>
        </div>
      </GameContainer>
    </PageWrapper>
  );
};

export default GamePage;
