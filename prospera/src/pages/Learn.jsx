import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const topics = [
  { name: 'Saving Money', color: '#ffff' },
  { name: 'Investing', color: '#87c38f' },
  { name: 'Budgeting', color: '#87c38f' },
  { name: 'Spending Wisely', color: '#ffff' },
];

const ActivityPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Fredoka', sans-serif;
`;

const LargeSquare = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  width: 100%;
  height: 100%;
  max-width: 1900px;
  max-height: 900px;
  background-color: #e0e0e0;
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
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  height: 100%;

  &:hover {
    transform: scale(1.05);
  }

  h2 {
    font-size: 1.5rem;
    color: black;
    padding: 10px;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1rem;
    }
  }
`;

const ModalContent = styled.div`
  background-color:#87c38f;
  color: black;
  padding: 20px;
  max-width: 90%;
  margin: auto;
  border-radius: 12px;
  text-align: center;
  font-family: 'Fredoka', sans-serif;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-family: 'Fredoka', sans-serif;
`;

const ModalParagraph = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  flex: 1;
  font-family: 'Fredoka', sans-serif;
  height: 50vh;
`;

const ModalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FactsList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  text-align: left;
  margin-bottom: 20px;
`;

const ToggleSwitch = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    margin-left: 10px;
    font-size: 1rem;
  }
`;

const Switch = styled.input`
  position: relative;
  width: 50px;
  height: 25px;
  appearance: none;
  background: #ccc;
  outline: none;
  border-radius: 50px;
  cursor: pointer;
  transition: 0.4s;

  &:checked {
    background: black;
  }

  &:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 2.5px;
    left: 5px;
    background: white;
    transition: 0.4s;
  }

  &:checked:before {
    left: 25px;
  }
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: white;
  color:black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #76b07f;
  }
`;

const facts = [
  "Create a monthly budget to track your income and expenses.",
  "Prioritize essential expenses like rent, utilities, and groceries.",
  "Set savings goals and automate transfers to a savings account.",
  "Review and adjust your budget regularly to reflect changes in your income or expenses.",
  "Use budgeting tools or apps to keep track of your spending and stay organized.",
];

const LearnPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [completed, setCompleted] = useState(false);

  const openModal = (topic) => {
    setSelectedTopic(topic);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTopic(null);
  };

  const toggleCompletion = () => {
    setCompleted(!completed);
  };

  // Keep track of modal state in local storage
  useEffect(() => {
    const savedState = localStorage.getItem('activityPageState');
    if (savedState) {
      const { completed } = JSON.parse(savedState);
      setCompleted(completed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('activityPageState', JSON.stringify({ completed }));
  }, [completed]);

  const firstHalfFacts = facts.slice(0, Math.ceil(facts.length / 2));
  const secondHalfFacts = facts.slice(Math.ceil(facts.length / 2));

  return (
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
            padding: '40px',
          },
        }}
      >
        {selectedTopic && (
          <ModalContent>
            <ModalTitle>{selectedTopic.name}</ModalTitle>
            <ModalRow>
              <ModalParagraph>
                Here are some facts about {selectedTopic.name}...
                <FactsList>
                  {firstHalfFacts.map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </FactsList>
              </ModalParagraph>
              <ModalParagraph>
                box 2
              </ModalParagraph>
              <ModalParagraph>
                <FactsList>
                  {secondHalfFacts.map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </FactsList>
              </ModalParagraph>
            </ModalRow>

            <ToggleSwitch>
              <Switch
                type="checkbox"
                checked={completed}
                onChange={toggleCompletion}
              />
              <label>{completed ? 'Completed' : 'Did Not Complete'}</label>
            </ToggleSwitch>

            <Button
              onClick={() =>
                window.location.href = `/game/${selectedTopic.name.toLowerCase()}`
              }
            >
              Play Game
            </Button>
            <Button onClick={closeModal}>Close</Button>
          </ModalContent>
        )}
      </Modal>
    </ActivityPageWrapper>
  );
};

export default LearnPage;
