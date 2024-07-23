import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';
import Cookies from 'js-cookie';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const isStrongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    if (!isStrongPassword(password)) {
      setError('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.');
      return;
    }
    try {
      const result = await register({ username, password });
      if (result) {
        Cookies.set('registerSuccess', 'Registration successful! Please log in.', { expires: 1 });
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        setError(errorMessage);
        if (errorMessage === 'User already registered. Please log in.') {
          navigate('/login');
        }
      } else {
        setError('Failed to register user');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">Register</button>
        </form>
        <div className="login-redirect">
          <p>Already have an account?</p>
          <button className="login-button" onClick={() => navigate('/login')}>Log In</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
