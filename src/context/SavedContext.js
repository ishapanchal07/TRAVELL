import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedContext = createContext();

export function SavedProvider({ children }) {
    const [savedGems, setSavedGems] = useState([]);

    useEffect(() => {
        loadSavedGems();
    }, []);

    const loadSavedGems = async () => {
        try {
            const storedGems = await AsyncStorage.getItem('@saved_gems');
            if (storedGems) {
                setSavedGems(JSON.parse(storedGems));
            }
        } catch (error) {
            console.error('Error loading saved gems:', error);
        }
    };

    const toggleSaveGem = async (gem) => {
        try {
            const isSaved = savedGems.some(g => g.id === gem.id);
            let updatedGems;

            if (isSaved) {
                updatedGems = savedGems.filter(g => g.id !== gem.id);
            } else {
                updatedGems = [...savedGems, gem];
            }

            setSavedGems(updatedGems);
            await AsyncStorage.setItem('@saved_gems', JSON.stringify(updatedGems));
        } catch (error) {
            console.error('Error saving gem:', error);
        }
    };

    const isGemSaved = (id) => {
        return savedGems.some(g => g.id === id);
    };

    return (
        <SavedContext.Provider value={{ savedGems, toggleSaveGem, isGemSaved }}>
            {children}
        </SavedContext.Provider>
    );
}

export const useSaved = () => useContext(SavedContext);
