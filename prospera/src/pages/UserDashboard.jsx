import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FillerProfilePic from '../media/filler-profile.png'; // Default filler profile picture

const topics = ['Saving Money', 'Investing', 'Budgeting', 'Spending Wisely'];

const UserDashboard = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    profilePicture: FillerProfilePic,
  });
  const [completedStatus, setCompletedStatus] = useState({});

  useEffect(() => {
    // Fetch user profile data from backend
    const userId = localStorage.getItem('userId');
    fetch(`https://prospera-9v1m-backend.vercel.app/user/profile?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile({
          name: data.name,
          email: data.email,
          profilePicture: FillerProfilePic, // Optionally, add a profile picture field in the database
        });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    // Load completion status from localStorage
    const storedStatus = JSON.parse(localStorage.getItem('completedStatus')) || {};
    setCompletedStatus(storedStatus);
  }, []);
  
  const toggleCompletion = (topic) => {
    const userId = localStorage.getItem('userId');
    const updatedStatus = {
      ...completedStatus,
      [topic]: !completedStatus[topic],
    };

    setCompletedStatus(updatedStatus);
    localStorage.setItem(`completedStatus_${userId}`, JSON.stringify(updatedStatus));
  };

  return (
    <DashboardWrapper>
      {/* Profile Card Section
      <ProfileCard>
        <ProfileImage src={profile.profilePicture} alt="Profile" />
        <ProfileName>{profile.name}</ProfileName>
        <ProfileEmail>{profile.email}</ProfileEmail>
        <ProfileMessage>Email admin@gmail.com to change email/password</ProfileMessage>
        <ProfileInput type="file" onChange={(e) => handleProfilePicture(e)} />
      </ProfileCard> */}

      {/* Progress Section */}
      <ProgressSection>
        <ProgressGrid>
          {topics.map((topic) => (
            <TopicColumn key={topic}>
              <ProgressText>{topic}</ProgressText>
              <Circle completed={completedStatus[topic]} onClick={() => toggleCompletion(topic)} />
            </TopicColumn>
          ))}
        </ProgressGrid>

        {/* Progress Key */}
        <ProgressKey>
          <KeyItem>
            <FilledCircle /> Completed
          </KeyItem>
          <KeyItem>
            <EmptyCircle /> Not Completed
          </KeyItem>
        </ProgressKey>
      </ProgressSection>
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
  padding: 200px;
  font-family: 'Fredoka', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  margin-top:150px;
  margin-bottom:90px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const ProgressSection = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 200px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const TopicColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressText = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #333;
  background-color: ${(props) => (props.completed ? '#76b07f' : 'transparent')};

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

const ProgressKey = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin-top: 20px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const KeyItem = styled.div`
  display: flex;
  align-items: center;
`;

const FilledCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #76b07f;
  margin-right: 10px;

  @media (max-width: 480px) {
    width: 15px;
    height: 15px;
  }
`;

const EmptyCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #333;
  background-color: transparent;
  margin-right: 10px;

  @media (max-width: 480px) {
    width: 15px;
    height: 15px;
  }
`;