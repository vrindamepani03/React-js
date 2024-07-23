import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { authState } = useAuth();
  const username = authState.username || 'Guest';

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Welcome, {username}!</h1>
        <p>We're glad to have you here. Enjoy your stay!</p>
      </div>
    </div>
  );
};

export default Home;
