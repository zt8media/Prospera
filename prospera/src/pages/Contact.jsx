import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Make sure to import axios
import ContactImage from '../media/contact-img.png';


const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');

  // Function that sends a request to the form endpoint
  const send = () => {
    axios.post('https://prospera-9v1m-backend.vercel.app/contact', {
      name: name,
      email: email,
      comment: comment,
    })
    .then(function (response) {
      console.log(response);
      setFormMessage('Thank you for your message! We will get back to you within 24 hours.');
      setSubmitted(true);
      setName('');
      setEmail('');
      setComment('');
    })
    .catch(function (error) {
      console.log(error);
      setFormMessage('There was an error submitting the form. Please try again.');
    });
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!comment) errors.comment = 'Comment is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      send(); // Call the send function to submit the data
      setErrors({}); // Clear errors
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormField>
            <FormField>
              <FormLabel htmlFor="email">Email:</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormField>
            <FormField>
              <FormLabel htmlFor="comment">Comment:</FormLabel>
              <FormTextArea
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
  flex-direction: row;
  width: 100%;
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 0;
    border-top-right-radius: 12px;
  }
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
