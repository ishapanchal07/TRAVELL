import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200';

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        name: 'Chloe Roams',
        email: 'chloe.roams@example.com',
        profileImage: DEFAULT_AVATAR
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            const savedData = await AsyncStorage.getItem('@user_profile_data');
            if (savedData !== null) {
                setUserData(JSON.parse(savedData));
            }
        } catch (e) {
            console.error('Failed to load user profile', e);
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async (newData) => {
        try {
            const updatedData = { ...userData, ...newData };
            setUserData(updatedData);
            await AsyncStorage.setItem('@user_profile_data', JSON.stringify(updatedData));
        } catch (e) {
            console.error('Failed to update user profile', e);
        }
    };

    const updateProfileImage = async (imageUri) => {
        await updateProfile({ profileImage: imageUri });
    };

    return (
        <UserContext.Provider value={{ 
            userData, 
            updateProfile, 
            updateProfileImage,
            isLoading 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
