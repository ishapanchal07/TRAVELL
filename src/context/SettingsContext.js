import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { translations, getTranslation } from '../i18n/translations';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
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
                if (data.isDarkMode !== undefined) setIsDarkMode(data.isDarkMode);
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
            const currentSettings = { isDarkMode, notificationsOn, language, isPrivate, ...newSettings };
            await AsyncStorage.setItem('user_settings', JSON.stringify(currentSettings));
        } catch (e) {
            console.error('Failed to save settings', e);
        }
    };

    const toggleDarkMode = (value) => {
        setIsDarkMode(value);
        saveSettings({ isDarkMode: value });
    };

    const updateLanguage = (langCode) => {
        setLanguage(langCode);
        saveSettings({ language: langCode });
    };

    const toggleNotifications = async (value) => {
        if (value) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                setNotificationsOn(false);
                saveSettings({ notificationsOn: false });
                return { success: false, error: 'Permission not granted' };
            }
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
            isDarkMode, toggleDarkMode,
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
