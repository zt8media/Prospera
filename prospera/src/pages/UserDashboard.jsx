import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed and configured

const topics = ['Saving Money', 'Investing', 'Budgeting', 'Spending Wisely'];

const UserDashboard = () => {
  const [completedStatus, setCompletedStatus] = useState({});
  const [totalCompleted, setTotalCompleted] = useState(0);

  useEffect(() => {
    const storedStatus = JSON.parse(localStorage.getItem('completedStatus')) || {};
    setCompletedStatus(storedStatus);
    calculateCompletion(storedStatus);
  }, []);

  const toggleCompletion = (topic) => {
    const updatedStatus = {
      ...completedStatus,
      [topic]: !completedStatus[topic],
    };
    setCompletedStatus(updatedStatus);
    localStorage.setItem('completedStatus', JSON.stringify(updatedStatus));
    calculateCompletion(updatedStatus);
  };

  const calculateCompletion = (status) => {
    const total = Object.values(status).filter(status => status).length;
    setTotalCompleted(total);
  };

  return (
    <DashboardWrapper>
      <Title>Your Progress</Title>
      <ProgressBarWrapper>
        <ProgressBar total={totalCompleted / topics.length * 100} />
        <ProgressLabel>{Math.round(totalCompleted / topics.length * 100)}% Complete</ProgressLabel>
      </ProgressBarWrapper>
      <ProgressSection>
        {topics.map((topic, index) => (
          <TopicColumn key={index}>
            <ProgressText>{topic}</ProgressText>
            <Circle onClick={() => toggleCompletion(topic)}>
              {completedStatus[topic] ? <FaCheckCircle color="green" size="2em" /> : <FaRegCircle color="grey" size="2em" />}
            </Circle>
          </TopicColumn>
        ))}
      </ProgressSection>
      <NavigationLinks>
        <Link to="/Learn">Go to the Games Now</Link>
      </NavigationLinks>
    </DashboardWrapper>
  );
};

export default UserDashboard;

// Styled Components
const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 17vw;  // Use viewport width for scaling padding
  font-family: 'Fredoka', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding:100px;  // Fixed padding for smaller screens
  }

  @media (max-width: 480px) {
    padding: 25px;  // Reduced padding for very small screens
  }
`;


const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  background-color: #ddd;
  border-radius: 10px;
  position: relative;
`;

const ProgressBar = styled.div`
  width: ${({ total }) => `${total}%`};
  height: 20px;
  background-color: green;
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
`;

const ProgressLabel = styled.span`
  position: absolute;
  right: 10px;
  top: 2px;
  font-size: 14px;
  color: white;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
`;

const TopicColumn = styled.div`
  margin: 10px;
  text-align: center;
`;

const ProgressText = styled.p`
  font-size: 18px;
  color: #333;
`;

const Circle = styled.div`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const NavigationLinks = styled.div`
  margin-top: 20px;
  a {
    text-decoration: none;
    color: #007bff;
    &:hover {
      text-decoration: underline;
    }
  }
`;
