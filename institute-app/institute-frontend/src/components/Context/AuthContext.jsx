import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');

  if (token && userData && userData !== "undefined") {
    try {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    } catch (e) {
      console.error("Invalid user data in localStorage:", e);
      localStorage.removeItem('user');
    }
  }
  setLoading(false);
}, []);


    const login = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            login,
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};