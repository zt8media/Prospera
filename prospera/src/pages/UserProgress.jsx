import React from 'react';
import styled from 'styled-components';

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px;
`;

const Circle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => (props.completed ? 'green' : 'red')};
`;

const UserProgress = ({ progress }) => {
  return (
    <ProgressWrapper>
      {progress.map((status, index) => (
        <Circle key={index} completed={status} />
      ))}
    </ProgressWrapper>
  );
};

export default UserProgress;
