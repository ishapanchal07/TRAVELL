import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPERTS } from '../data/ExpertData';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [experts, setExperts] = useState(EXPERTS);
    const [bookings, setBookings] = useState([]);
    const [selectedFood, setSelectedFood] = useState([]);
    const [selectedClothes, setSelectedClothes] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [storedBookings, storedFood, storedClothes] = await Promise.all([
                AsyncStorage.getItem('@expert_bookings'),
                AsyncStorage.getItem('@food_cart'),
                AsyncStorage.getItem('@clothing_cart')
            ]);
            
            if (storedBookings) setBookings(JSON.parse(storedBookings));
            if (storedFood) setSelectedFood(JSON.parse(storedFood));
            if (storedClothes) setSelectedClothes(JSON.parse(storedClothes));
        } catch (error) {
            console.error('Error loading context data', error);
        }
    };

    const addToCart = async (item, section) => {
        if (section !== 'food' && section !== 'clothing') {
            console.warn(`[CartIsolation] Blocked attempt to add item outside Food/Clothing: ${section}`);
            return;
        }

        try {
            if (section === 'food') {
                const newFood = [...selectedFood, { ...item, cartId: Date.now().toString() }];
                setSelectedFood(newFood);
                await AsyncStorage.setItem('@food_cart', JSON.stringify(newFood));
            } else {
                const newClothes = [...selectedClothes, { ...item, cartId: Date.now().toString() }];
                setSelectedClothes(newClothes);
                await AsyncStorage.setItem('@clothing_cart', JSON.stringify(newClothes));
            }
        } catch (error) {
            console.error(`Error adding to ${section} cart`, error);
        }
    };

    const removeFromCart = async (itemId, section) => {
        try {
            if (section === 'food') {
                const newFood = selectedFood.filter(item => (item.id || item.cartId || item.cartId) !== itemId);
                setSelectedFood(newFood);
                await AsyncStorage.setItem('@food_cart', JSON.stringify(newFood));
            } else if (section === 'clothing') {
                const newClothes = selectedClothes.filter(item => (item.id || item.cartId || item.cartId) !== itemId);
                setSelectedClothes(newClothes);
                await AsyncStorage.setItem('@clothing_cart', JSON.stringify(newClothes));
            }
        } catch (error) {
            console.error(`Error removing from ${section} cart`, error);
        }
    };

    const clearCart = async (section) => {
        try {
            if (section === 'food') {
                setSelectedFood([]);
                await AsyncStorage.removeItem('@food_cart');
            } else if (section === 'clothing') {
                setSelectedClothes([]);
                await AsyncStorage.removeItem('@clothing_cart');
            }
        } catch (error) {
            console.error(`Error clearing ${section} cart`, error);
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
            selectedFood,
            selectedClothes,
            addToCart,
            removeFromCart,
            clearCart,
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
