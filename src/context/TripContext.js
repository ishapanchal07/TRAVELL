import React, { createContext, useState, useContext } from 'react';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const [activeTrip, setActiveTrip] = useState(null);

    // Default preferences if no trip is active
    const [preferences, setPreferences] = useState({
        diet: ['Veg'],
        clothingSize: 'M',
        gender: 'Female',
        travelGroup: 'Solo'
    });

    const createTrip = (tripData) => {
        setActiveTrip(tripData);
        if (tripData.preferences) {
            setPreferences(prev => ({ ...prev, ...tripData.preferences }));
        }
    };

    const clearTrip = () => {
        setActiveTrip(null);
    };

    const updatePreferences = (newPrefs) => {
        setPreferences(prev => ({ ...prev, ...newPrefs }));
    };

    return (
        <TripContext.Provider value={{ activeTrip, preferences, createTrip, clearTrip, updatePreferences }}>
            {children}
        </TripContext.Provider>
    );
};

export const useTrip = () => {
    const context = useContext(TripContext);
    if (!context) {
        throw new Error('useTrip must be used within a TripProvider');
    }
    return context;
};
