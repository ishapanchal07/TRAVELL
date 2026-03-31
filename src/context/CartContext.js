import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        loadCart();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            saveCart();
        }
    }, [cartItems, isLoaded]);

    const loadCart = async () => {
        try {
            const savedCart = await AsyncStorage.getItem('@roamster_cart');
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            }
        } catch (e) {
            console.error('Failed to load cart', e);
        } finally {
            setIsLoaded(true);
        }
    };

    const saveCart = async () => {
        try {
            await AsyncStorage.setItem('@roamster_cart', JSON.stringify(cartItems));
        } catch (e) {
            console.error('Failed to save cart', e);
        }
    };

    const addToCart = (item, quantity = 1, selectedSize = null, selectedDuration = null) => {
        setCartItems(prev => {
            // Check if item already exists (with same size/duration for clothes)
            const existingItemIndex = prev.findIndex(i => 
                i.id === item.id && 
                i.selectedSize === selectedSize && 
                i.selectedDuration === selectedDuration
            );

            if (existingItemIndex > -1) {
                const updated = [...prev];
                updated[existingItemIndex].quantity += quantity;
                return updated;
            }
            return [...prev, { ...item, quantity, selectedSize, selectedDuration }];
        });
    };

    const removeFromCart = (itemId, selectedSize = null, selectedDuration = null) => {
        setCartItems(prev => prev.filter(i => 
            !(i.id === itemId && i.selectedSize === selectedSize && i.selectedDuration === selectedDuration)
        ));
    };

    const updateQuantity = (itemId, delta, selectedSize = null, selectedDuration = null) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === itemId && item.selectedSize === selectedSize && item.selectedDuration === selectedDuration) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const cartTotal = cartItems.reduce((total, item) => {
        // Parse price to number. Assumes format like "$28.00" or "€35/day"
        const priceStr = item.price || item.rent || item.buy || '0';
        const priceVal = parseFloat(priceStr.replace(/[^0-9.]/g, '') || '0');
        return total + (priceVal * item.quantity * (item.selectedDuration || 1));
    }, 0);

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            cartTotal,
            clearCart,
            itemCount: cartItems.reduce((count, item) => count + item.quantity, 0)
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
