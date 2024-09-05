import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

 // Function that sends a request to the register endpoint
 const send = () => {
  axios.post('https://prospera-9v1m-backend.vercel.app/register', {
    name: name,
    email: email,
    password: password,
  })
  .then(function (response) {
    console.log(response);
    setSubmitted(true);
    setName('');
    setEmail('');
    setPassword('');
    navigate('/login');
  })
  .catch(function (error) {
    console.log(error);
  });
};


  const validateForm = () => {
    const newErrors = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Enter Valid Email';
    }
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    send();
    navigate('/login');
    
  };


  return (
    <RegisterContainer>
      <RegisterTitle>Create Your Account</RegisterTitle>
      <RegisterForm onSubmit={handleRegister}>
        <FormField>
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ErrorMessage>{errors.name}</ErrorMessage>
        </FormField>
        <FormField>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ErrorMessage>{errors.email}</ErrorMessage>
        </FormField>
        <FormField>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ErrorMessage>{errors.password}</ErrorMessage>
        </FormField>
        <SubmitButton type="submit">Register</SubmitButton>
        {errors.server && <ErrorMessage>{errors.server}</ErrorMessage>}
      </RegisterForm>
      <LoginPrompt>
        Already Registered? <LoginLink to="/Login">Login here</LoginLink>
      </LoginPrompt>
    </RegisterContainer>
  );
};

export default RegisterPage;

// Styled Components
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px;
  background-color: #f9f9f9;
  font-family: 'Fredoka', sans-serif;
`;

const RegisterTitle = styled.h2`
  font-size: 36px;
  text-align: center;
  color: #76b07f;
  margin-bottom: 30px;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
  display: block;
`;

const FormInput = styled.input`
  width: 93%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Fredoka', sans-serif;

  &:focus {
    border-color: #76b07f;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #76b07f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-family: 'Fredoka', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5b9365;
  }
`;

const ErrorMessage = styled.small`
  color: #d32f2f;
  font-size: 14px;
  margin-top: 5px;
  display: block;
`;

const LoginPrompt = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: #333;
`;

const LoginLink = styled(Link)`
  color: #76b07f;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
