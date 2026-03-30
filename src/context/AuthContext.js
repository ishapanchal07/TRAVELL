import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasSeenQuiz, setHasSeenQuiz] = useState(false);
    const [userData, setUserData] = useState({
        name: 'Chloe Roams',
        email: 'chloe.roams@example.com',
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200'
    });

    useEffect(() => {
        checkQuizStatus();
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const data = await AsyncStorage.getItem('@user_data');
            if (data) {
                setUserData(JSON.parse(data));
            }
        } catch (error) {
            console.error('Error loading user data', error);
        }
    };

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

    const updateUserData = async (newData) => {
        try {
            // Update state for real-time UI updates
            const updatedData = { ...userData, ...newData };
            setUserData(updatedData);

            // Persist to local storage
            await AsyncStorage.setItem('@user_data', JSON.stringify(updatedData));
            
            // Mock API Sync success
            return { success: true };
        } catch (error) {
            console.error('Error updating user data', error);
            // In case of failure, keep state but notify
            return { success: false, error };
        }
    };

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            login, 
            logout, 
            hasSeenQuiz, 
            markQuizSeen, 
            userData, 
            updateUserData 
        }}>
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

