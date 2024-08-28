import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.comment) errors.comment = 'Comment is required';
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
      setFormMessage('Thank you for your message! We will get back to you within 24 hours.');
      setFormData({ name: '', email: '', comment: '' }); // Reset form
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
        <form id="contact-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} // Update form data
            />
            {errors.name && <p id="error-message">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            />
            {errors.email && <p id="error-message">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            />
            {errors.comment && <p id="error-message">{errors.comment}</p>}
          </div>
          <button type="submit">Submit</button>
          {formMessage && <div id="formMessage">{formMessage}</div>}
        </form>
      </section>
    </main>
  );
};

export default Contact;
