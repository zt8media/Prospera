import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Enter Valid Email';
    }
    if (formData.password.length < 12) {
      newErrors.password = 'Password must be at least 12 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setErrors({ server: data.message || 'Registration failed.' });
      }
    } catch (error) {
      console.error('Error registering:', error);
      setErrors({ server: 'Error registering. Please try again later.' });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            value={formData.name}
            onChange={handleChange}
          />
          <ErrorMessage>{errors.name}</ErrorMessage>
        </FormField>
        <FormField>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <ErrorMessage>{errors.email}</ErrorMessage>
        </FormField>
        <FormField>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
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
  padding: 40px;
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
  width: 100%;
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
