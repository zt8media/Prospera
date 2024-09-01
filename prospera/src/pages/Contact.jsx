import React, { useState } from 'react';
import styled from 'styled-components';
import ContactImage from '../media/contact-img.png';

const Contact = () => {
  // const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');

  // function that sends a request to the form endpoint 
  const send = () => {
    axios.post('http://localhost:5173/Contact', {
      name: name,
      email: email,
      comment: comment
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

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
      console.log('Form submitted:');
      setFormMessage('Thank you for your message! We will get back to you within 24 hours.');
      // setFormData({ name: '', email: '', comment: '' }); // Reset form
      setErrors({}); // Clear errors
    } else {
      setErrors(errors);
      setFormMessage('');
    }
  };

  return (
    <main className="contact-page">
      <section id="contact">
        <h2>Contact Us</h2>
        <form id="contact-form" onSubmit={handleSubmit} action='/form'>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
            onChange={(e) => setName(e.target.value)} // Update form data
            />
            {errors.name && <p id="error-message">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p id="error-message">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              value={comment}
            onChange={(e) => setComment(e.target.value)}
            />
            {errors.comment && <p id="error-message">{errors.comment}</p>}
          </div>
          <button type="submit">Submit</button>
          {formMessage && <div id="formMessage">{formMessage}</div>}
        </form>
        {submitted && <p>Thank you! We'll get back to you shortly!</p>}
      </section>
    </main>
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
