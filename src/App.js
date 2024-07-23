import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedPage from './pages/ProtectedPage';
import { AuthProvider } from './context/AuthContext';
import Cookies from 'js-cookie';

const App = () => {
  useEffect(() => {
    const loginMessage = Cookies.get('loginSuccess');
    const registerMessage = Cookies.get('registerSuccess');
    
    if (loginMessage) {
      alert(loginMessage);
      Cookies.remove('loginSuccess');
    }
    
    if (registerMessage) {
      alert(registerMessage);
      Cookies.remove('registerSuccess');
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/protected" element={<ProtectedPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
