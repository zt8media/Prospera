import React, { useState } from 'react';
import styled from 'styled-components';
import ContactImage from '../media/contact-img.png';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.comment) errors.comment = 'Comment is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
      setFormMessage('Thank you for your message! We will get back to you within 24 hours.');
      setFormData({ name: '', email: '', comment: '' });
      setErrors({});
    } else {
      setErrors(errors);
      setFormMessage('');
    }
  };

  return (
    <ContactPageContainer>
      <ContactContent>
        <ImageContainer>
          <StyledImage src={ContactImage} alt="Contact Us" />
        </ImageContainer>
        <FormContainer>
          <ContactTitle>Contact Us</ContactTitle>
          <ContactForm id="contact-form" onSubmit={handleSubmit}>
            <FormField>
              <FormLabel htmlFor="name">Name:</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormField>
            <FormField>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormField>
            <FormField>
              <FormLabel htmlFor="comment">Comment:</FormLabel>
              <FormTextArea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              />
              {errors.comment && <ErrorMessage>{errors.comment}</ErrorMessage>}
            </FormField>
            <SubmitButton type="submit">Submit</SubmitButton>
            {formMessage && <FormMessage>{formMessage}</FormMessage>}
          </ContactForm>
        </FormContainer>
      </ContactContent>
    </ContactPageContainer>
  );
};

export default Contact;

// Styled Components
const ContactPageContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #f9f9f9;
  font-family: 'Fredoka', sans-serif;
  height: 100vh;
`;

const ContactContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 40px;
`;

const ContactTitle = styled.h2`
  font-size: 36px;
  text-align: center;
  color: #76b07f;
  margin-bottom: 30px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
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
 width: 95%;
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

const FormTextArea = styled.textarea`
  width: 95%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Fredoka', sans-serif;
  resize: vertical;

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

const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 14px;
  margin-top: 5px;
`;

const FormMessage = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #76b07f;
  color: white;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  font-family: 'Fredoka', sans-serif;
`;
