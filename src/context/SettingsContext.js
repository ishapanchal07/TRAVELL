import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Note: expo-notifications has limited support in Expo Go SDK 53+. 
// We will use a simulated permission flow for development stability in Expo Go.
// For production remote notifications, a Development Build is required.
// import * as Notifications from 'expo-notifications'; 
import { translations, getTranslation } from '../i18n/translations';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [notificationsOn, setNotificationsOn] = useState(false);
    const [language, setLanguage] = useState('en');
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
                if (data.notificationsOn !== undefined) {
                    setNotificationsOn(data.notificationsOn);
                }
                if (data.language !== undefined) setLanguage(data.language);
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
            const currentSettings = { notificationsOn, language, isPrivate, ...newSettings };
            await AsyncStorage.setItem('user_settings', JSON.stringify(currentSettings));
        } catch (e) {
            console.error('Failed to save settings', e);
        }
    };

    const updateLanguage = (langCode) => {
        setLanguage(langCode);
        saveSettings({ language: langCode });
    };

    const toggleNotifications = async (value) => {
        if (value) {
            // Simulated permission request for Expo Go compatibility
            // In a real development build, you would use: await Notifications.requestPermissionsAsync();
            console.log('[Notifications] Simulating permission request...');
            await new Promise(resolve => setTimeout(resolve, 500)); // Brief delay for realism
            
            // For now, we'll always "grant" it in simulation mode
            setNotificationsOn(true);
            saveSettings({ notificationsOn: true });
            return { success: true };
        }
        setNotificationsOn(value);
        saveSettings({ notificationsOn: value });
        return { success: true };
    };

    const togglePrivacy = (value) => {
        setIsPrivate(value);
        saveSettings({ isPrivate: value });
    };

    const getT = (key) => getTranslation(language, key);

    return (
        <SettingsContext.Provider value={{
            notificationsOn, toggleNotifications,
            language, updateLanguage,
            isPrivate, togglePrivacy,
            getT,
            isLoading
        }}>
            {children}
        </SettingsContext.Provider>
    );
};
