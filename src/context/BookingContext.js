import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPERTS } from '../data/ExpertData';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [experts, setExperts] = useState(EXPERTS);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const storedBookings = await AsyncStorage.getItem('@expert_bookings');
            if (storedBookings) {
                setBookings(JSON.parse(storedBookings));
            }
        } catch (error) {
            console.error('Error loading bookings', error);
        }
    };

    const addBooking = async (booking) => {
        try {
            const newBookings = [...bookings, { ...booking, id: Date.now().toString() }];
            setBookings(newBookings);
            await AsyncStorage.setItem('@expert_bookings', JSON.stringify(newBookings));
        } catch (error) {
            console.error('Error saving booking', error);
        }
    };

    const addReview = (expertId, review) => {
        const updatedExperts = experts.map(expert => {
            if (expert.id === expertId) {
                const newReviews = [review, ...expert.reviews];
                const avgRating = newReviews.reduce((acc, curr) => acc + curr.rating, 0) / newReviews.length;
                return {
                    ...expert,
                    reviews: newReviews,
                    rating: parseFloat(avgRating.toFixed(1)),
                    reviewCount: newReviews.length
                };
            }
            return expert;
        });
        setExperts(updatedExperts);
    };

    const updateExpertStatus = (expertId, status) => {
        setExperts(experts.map(expert => 
            expert.id === expertId ? { ...expert, status } : expert
        ));
    };

    return (
        <BookingContext.Provider value={{ 
            experts, 
            bookings, 
            addBooking, 
            addReview,
            updateExpertStatus
        }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
