import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const themePalette = {
    light: {
        background: '#F8FAFC',
        card: '#FFFFFF',
        text: '#0F172A',
        subtext: '#64748B',
        primary: '#0F172A', // Dark Blue/Black
        border: '#E2E8F0',
        divider: '#F1F5F9',
        statusBar: 'dark-content',
    },
    dark: {
        background: '#0F172A',
        card: '#1E293B',
        text: '#F8FAFC',
        subtext: '#94A3B8',
        primary: '#38BDF8', // Sky Blue for contrast in dark
        border: '#334155',
        divider: '#1E293B',
        statusBar: 'light-content',
    },
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('user_theme');
            if (savedTheme !== null) {
                setIsDarkMode(JSON.parse(savedTheme));
            }
        } catch (e) {
            console.error('Failed to load theme', e);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleTheme = async () => {
        try {
            const newValue = !isDarkMode;
            setIsDarkMode(newValue);
            await AsyncStorage.setItem('user_theme', JSON.stringify(newValue));
        } catch (e) {
            console.error('Failed to save theme', e);
        }
    };

    const colors = isDarkMode ? themePalette.dark : themePalette.light;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
