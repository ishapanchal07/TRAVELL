import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notificationsOn, setNotificationsOn] = useState(true);
    const [isPrivate, setIsPrivate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const dataStr = await AsyncStorage.getItem('user_settings');
            if (dataStr) {
                const data = JSON.parse(dataStr);
                if (data.isDarkMode !== undefined) setIsDarkMode(data.isDarkMode);
                if (data.notificationsOn !== undefined) setNotificationsOn(data.notificationsOn);
                if (data.isPrivate !== undefined) setIsPrivate(data.isPrivate);
            }
        } catch (e) {
            console.error('Failed to load settings', e);
        } finally {
            setIsLoading(false);
        }
    };

    const saveSettings = async (newSettings) => {
        try {
            const currentSettings = { isDarkMode, notificationsOn, isPrivate, ...newSettings };
            await AsyncStorage.setItem('user_settings', JSON.stringify(currentSettings));
        } catch (e) {
            console.error('Failed to save settings', e);
        }
    };

    const toggleDarkMode = (value) => {
        setIsDarkMode(value);
        saveSettings({ isDarkMode: value });
    };

    const toggleNotifications = (value) => {
        setNotificationsOn(value);
        saveSettings({ notificationsOn: value });
    };

    const togglePrivacy = (value) => {
        setIsPrivate(value);
        saveSettings({ isPrivate: value });
    };

    return (
        <SettingsContext.Provider value={{
            isDarkMode, toggleDarkMode,
            notificationsOn, toggleNotifications,
            isPrivate, togglePrivacy,
            isLoading
        }}>
            {children}
        </SettingsContext.Provider>
    );
};
