import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasSeenQuiz, setHasSeenQuiz] = useState(false);

    useEffect(() => {
        checkQuizStatus();
    }, []);

    const checkQuizStatus = async () => {
        try {
            const status = await AsyncStorage.getItem('@has_seen_quiz');
            if (status === 'true') {
                setHasSeenQuiz(true);
            }
        } catch (error) {
            console.error('Error reading quiz status', error);
        }
    };

    const markQuizSeen = async () => {
        try {
            await AsyncStorage.setItem('@has_seen_quiz', 'true');
            setHasSeenQuiz(true);
        } catch (error) {
            console.error('Error saving quiz status', error);
        }
    };

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, hasSeenQuiz, markQuizSeen }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

