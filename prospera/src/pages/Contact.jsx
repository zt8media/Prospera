import React, { useState } from 'react';

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

  // Handle form submission
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
