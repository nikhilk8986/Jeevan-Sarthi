import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHospitalLoggedIn, setIsHospitalLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [hospitalToken, setHospitalToken] = useState(null);
  const [userType, setUserType] = useState(null); // 'user' or 'hospital'

  useEffect(() => {
    // Check if user or hospital is already logged in on app start
    const storedUserToken = localStorage.getItem('userToken');
    const storedHospitalToken = localStorage.getItem('hospitalToken');
    
    if (storedUserToken) {
      setUserToken(storedUserToken);
      setIsLoggedIn(true);hospitalToken
      setUserType('user');
    } else if (storedHospitalToken) {
      setHospitalToken(storedHospitalToken);
      setIsHospitalLoggedIn(true);
      setUserType('hospital');
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem('userToken', newToken);
    setUserToken(newToken);
    setIsLoggedIn(true);
    setIsHospitalLoggedIn(false);
    setUserType('user');
  };

  const hospitalLogin = (newToken) => {
    localStorage.setItem('hospitalToken', newToken);
    setHospitalToken(newToken);
    setIsHospitalLoggedIn(true);
    setIsLoggedIn(false);
    setUserType('hospital');
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setIsLoggedIn(false);
    setUserType(null);
  };

  const hospitalLogout = () => {
    localStorage.removeItem('hospitalToken');
    setHospitalToken(null);
    setIsHospitalLoggedIn(false);
    setUserType(null);
  };

  const value = {
    isLoggedIn,
    isHospitalLoggedIn,
    userToken,
    hospitalToken,
    userType,
    login, 
    logout,
    hospitalLogin,
    hospitalLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};