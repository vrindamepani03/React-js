import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    message: '',
    token: Cookies.get('token') || '',
    username: Cookies.get('username') || ''
  });

  const register = async ({ username, password }) => {
    try {
      await axios.post('http://localhost:5000/api/register', { username, password });
      Cookies.set('registerSuccess', 'Registration successful! Please log in.', { expires: 1 });
      setAuthState({ ...authState, message: 'Registration successful! Please log in.' });
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : 'Failed to register user';
      setAuthState({ ...authState, message: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const login = async ({ username, password }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      Cookies.set('token', response.data.token, { expires: 1 });
      Cookies.set('username', username, { expires: 1 });
      Cookies.set('loginSuccess', 'Login successful! Welcome back!', { expires: 1 });
      setAuthState({ ...authState, token: response.data.token, username: username, message: 'Login successful! Welcome back!' });
      return true;
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : 'Login failed. Please try again.';
      setAuthState({ ...authState, message: errorMessage });
      return false;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setAuthState({ token: '', username: '' });
  };

  return (
    <AuthContext.Provider value={{ authState, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
