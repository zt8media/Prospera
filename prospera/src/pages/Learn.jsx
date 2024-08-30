import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import ActivityPig from '../media/activity-pig.png';


const topics = [
  { name: 'Saving Money', color: '#ffff' },
  { name: 'Investing', color: '#87c38f' },
  { name: 'Budgeting', color: '#87c38f' },
  { name: 'Spending Wisely', color: '#ffff' },
];

const facts = {
  'Saving Money': [
    'Create a savings goal, like saving for a new game or toy.',
    'Use a piggy bank to start saving money and watch it grow.',
    'Track your allowance to see how much you get and spend.',
    'Save a portion of any money you receive, like birthday money.',
    'Avoid impulse buys by asking yourself if you really need something.',
    'Look for discounts or sales to save money on things you want.',
  ],
  'Investing': [
    'Start saving or investing money early to help it grow over time.',
    'Understand that all investments come with risks and learn about them.',
    'Diversify your investments by spreading them out to reduce risk.',
    'Learn about stocks and how they represent ownership in a company.',
    'Consider using a savings account to keep your money safe and earn interest.',
    'Ask trusted adults for advice on investing to get helpful guidance.',
  ],
  'Budgeting': [
    'Keep a record of what you spend to understand your spending habits.',
    'Plan your spending by creating a budget for things like snacks or games.',
    'Set spending limits in each category of your budget to avoid overspending.',
    'Save a bit each month for expensive items you want to buy.',
    'Check your budget regularly and adjust it if needed.',
    'Use apps or tools to help you stick to your budget.',
  ],
  'Spending Wisely': [
    'Make a list before shopping to avoid buying things you don’t need.',
    'Compare prices and look for discounts before making a purchase.',
    'Avoid high-interest debt by paying off credit cards in full.',
    'Plan major purchases to prevent emotional spending.',
    'Decide if you really need something versus just wanting it.',
  ],
};

const videoUrls = {
  'Saving Money': 'https://www.youtube.com/embed/v-mlEQ7KW5Q',
  'Investing': 'https://www.youtube.com/embed/sMq69Q3fwGc',
  'Budgeting': 'https://www.youtube.com/embed/CbhjhWleKGE',
  'Spending Wisely': 'https://www.youtube.com/embed/aRcXutXvfmM',
};

const gameRoutes = {
  'Budgeting': '/game/budgeting',
  'Saving Money': '/game/saving',
  'Investing': '/game/investing',
  'Spending Wisely': '/game/spending',
};

const getRandomFact = (topic) => {
  const topicFacts = facts[topic] || [];
  return topicFacts[Math.floor(Math.random() * topicFacts.length)];
};

const Logo = styled.img`
  width: 600px;
  height: auto;
  position: absolute;
  top: -120px;
  left: -2px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: rotate(-15deg) scale(1.1);
  }

  @media (max-width: 768px) {
    width: 120px;
    top: 10px;
    left: 10px;
  }

  @media (max-width: 480px) {
    width: 100px;
    top: 5px;
    left: 5px;
  }
`;

const PageTitle = styled.h2`
  display: flex;
  justify-content: center;
  font-family: 'Fredoka', sans-serif;
  font-size: 65px;
  &:hover {
    transform: rotate(3deg) scale(1.2);
    color: #76b07f;
  }
`;

const ActivityPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background-color: #ffff;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Fredoka', sans-serif;
`;

const LargeSquare = styled.div`
  display: grid;
  margin-top: 90px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  width: 90%;
  max-height: 1900px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
`;

const TopicCard = styled.div`
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
  height: 36vh;
  border: solid 2px black;
  width: 85%;
  gap: 5px;

  &:hover {
    transform: scale(1.05);
  }

  &:nth-child(1),
  &:nth-child(2) {
    margin-left: 15%;
  }

  h2 {
    font-size: 4rem;
    color: black;
    padding: 10px;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2rem;
    }

    &:nth-child(1),
    &:nth-child(2) {
      margin-left: 0;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const ModalContent = styled.div`
  background-color: #87c38f;
  color: black;
  padding: 120px 120px;
  max-width: 90%;
  margin: auto;
  border-radius: 12px;
  text-align: center;
  font-family: 'Fredoka', sans-serif;
  border: solid 6px black;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }

  @media (max-width: 480px) {
    padding: 40px 10px;
  }
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-family: 'Fredoka', sans-serif;
  font-size: 55px;

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 30px;
  }
`;

const ModalParagraph = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  border: solid 4px black;
  flex: 1;
  font-family: 'Fredoka', sans-serif;
  height: 35vh;

  @media (max-width: 768px) {
    height: 25vh;
  }

  @media (max-width: 480px) {
    height: auto;
  }
`;

const ModalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 430px) {
    margin-bottom: 10px;
  }
`;

const FactsList = styled.ul`
  font-weight: 600;
  padding-left: 0;
  margin: 0;
  list-style-type: none;
  line-height: 2;
  font-size: 25px;
  text-align: left;

  li {
    padding: 15px 0;
  }

  li:nth-child(even) {
    background-color: #f9f9f9;
  }

  li:nth-child(odd) {
    background-color: #76b07f;
  }
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: solid 3px black;
  border-radius: 5px;
  font-weight: 500;
  font-size: 35px;
  font-family: 'Fredoka', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #76b07f;
  }
`;

const LearnPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [fact1, setFact1] = useState('');
  const [fact3, setFact3] = useState('');

  const openModal = (topic) => {
    setSelectedTopic(topic);
    setFact1(getRandomFact(topic.name));
    setFact3(getRandomFact(topic.name));
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTopic(null);
  };

  const changeFact1 = () => {
    setFact1(getRandomFact(selectedTopic.name));
  };

  const changeFact3 = () => {
    setFact3(getRandomFact(selectedTopic.name));
  };

  const playGame = () => {
    window.location.href = gameRoutes[selectedTopic.name];
  };

  return (
    <>
      <PageTitle>Explore The World of Finance </PageTitle>
      <Logo src={ActivityPig} alt="Activity Pig Logo" />
      <ActivityPageWrapper>
        <LargeSquare>
          {topics.map((topic, index) => (
            <TopicCard
              key={index}
              color={topic.color}
              onClick={() => openModal(topic)}
            >
              <h2>{topic.name}</h2>
            </TopicCard>
          ))}
        </LargeSquare>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
            content: {
              inset: '5%',
              borderRadius: '10px',
              maxWidth: '90%',
              maxHeight: '90%',
              margin: 'auto',
              padding: '20px',
            },
          }}
        >
          {selectedTopic && (
            <ModalContent>
              <ModalTitle>{selectedTopic.name}</ModalTitle>

              <ModalRow>
                <ModalParagraph onClick={changeFact1}>
                  <FactsList>
                    <li>{fact1}</li>
                  </FactsList>
                </ModalParagraph>

                <ModalParagraph>
                  {selectedTopic.name in videoUrls && (
                    <iframe
                      width="100%"
                      height="100%"
                      src={videoUrls[selectedTopic.name]}
                      title={`${selectedTopic.name} Video`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </ModalParagraph>

                <ModalParagraph onClick={changeFact3}>
                  <FactsList>
                    <li>{fact3}</li>
                  </FactsList>
                </ModalParagraph>
              </ModalRow>

              <Button onClick={playGame}>Play Game</Button>
              <Button onClick={closeModal}>Close</Button>
            </ModalContent>
          )}
        </Modal>
      </ActivityPageWrapper>
    </>
  );
};

export default LearnPage;
