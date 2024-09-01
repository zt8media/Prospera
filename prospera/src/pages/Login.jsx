import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = true;

    // Validation
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('Enter Valid Email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/activities');
        }
      } else {
        setEmailError(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setEmailError('Error logging in. Please try again later.');
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>Login</LoginTitle>
      <LoginForm onSubmit={handleLogin}>
        <FormField>
          <FormInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ErrorMessage>{emailError}</ErrorMessage>
        </FormField>
        <FormField>
          <FormInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ErrorMessage>{passwordError}</ErrorMessage>
        </FormField>
        <LoginButton type="submit">Login</LoginButton>
      </LoginForm>
      <RegisterPrompt>
        Don’t have an account? <RegisterLink to="/Register">Register here</RegisterLink>
      </RegisterPrompt>
    </LoginContainer>
  );
};

export default LoginPage;

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 140px;
  background-color: #f0f0f0;
  font-family: 'Fredoka', sans-serif;
`;

const LoginTitle = styled.h2`
  font-size: 32px;
  text-align: center;
  color: #5b9365;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  background-color: #ffffff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const FormInput = styled.input`
  width: 92%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  font-family: 'Fredoka', sans-serif;

  &:focus {
    border-color: #5b9365;
    outline: none;
  }
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  background-color: #5b9365;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-family: 'Fredoka', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #76b07f;
  }
`;

const ErrorMessage = styled.small`
  color: #d32f2f;
  font-size: 14px;
  margin-top: 5px;
  display: block;
`;

const RegisterPrompt = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #333;
`;

const RegisterLink = styled(Link)`
  color: #5b9365;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
