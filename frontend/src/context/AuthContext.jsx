import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [member, setMember] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedMember = localStorage.getItem('member');
    const storedRole = localStorage.getItem('role');

    if (storedToken && storedMember && storedRole) {
      setToken(storedToken);
      setMember(JSON.parse(storedMember));
      setRole(storedRole);
    }
  }, []);

  const login = (userData) => {
    setMember(userData.member);
    setToken(userData.token);
    setRole(userData.role);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('member', JSON.stringify(userData.member));
    localStorage.setItem('role', userData.role);
  };

  const logout = () => {
    setMember(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('member');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ member, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
