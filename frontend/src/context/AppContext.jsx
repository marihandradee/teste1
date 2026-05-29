import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('vc_user');
        return saved ? JSON.parse(saved) : null;
    });
    
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('vc_theme') || 'dark';
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('vc_theme', theme);
    }, [theme]);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('vc_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('vc_user');
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <AppContext.Provider value={{ user, login, logout, theme, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
};