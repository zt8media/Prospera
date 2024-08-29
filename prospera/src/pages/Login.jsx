import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small>{emailError}</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small>{passwordError}</small>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="login-link">
        <p>Don't have an account? <Link to="/Register">Register here</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
