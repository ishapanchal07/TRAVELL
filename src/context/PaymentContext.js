import React, { createContext, useState, useContext } from 'react';

const PaymentContext = createContext();

export function PaymentProvider({ children }) {
    const [paidItems, setPaidItems] = useState([]);

    const addPaidItem = (itemId) => {
        if (!paidItems.includes(itemId)) {
            setPaidItems(prev => [...prev, itemId]);
        }
    };

    const handlePaidAction = (itemData, nextScreen, navigation, customParams = {}) => {
        const itemId = itemData.id || itemData.name || itemData.title;
        const section = customParams.section || itemData.section;
        
        // Strict Isolation: Only allow Food, Clothing, Experiences, Cart, or existing Expert flow
        const isAllowedSection = section === 'food' || section === 'clothing' || section === 'experience' || section === 'cart';
        const isExpert = !!customParams.expert;

        if (!isAllowedSection && !isExpert) {
            console.warn(`[PaymentIsolation] Blocked payment attempt outside allowed sections: ${section}`);
            return;
        }
        
        // Extract numeric price safely
        let numericPrice = 0;
        if (typeof itemData.price === 'number') {
            numericPrice = itemData.price;
        } else if (typeof itemData.price === 'string') {
            const parsed = parseFloat(itemData.price.replace(/[^0-9.]/g, ''));
            numericPrice = isNaN(parsed) ? 0 : parsed;
        } else if (itemData.totalPrice) {
            numericPrice = Number(itemData.totalPrice);
        }

        const isFree = numericPrice === 0 || (typeof itemData.price === 'string' && itemData.price.toUpperCase().includes('FREE'));
        
        if (isFree) {
            console.log(`[PaymentFlow] Item is FREE: Skipping payment for ${itemId}`);
            navigation.navigate(nextScreen, { ...customParams, item: itemData });
            return;
        }

        if (paidItems.includes(itemId)) {
            console.log(`[PaymentFlow] Item already paid: Skipping payment for ${itemId}`);
            navigation.navigate(nextScreen, { ...customParams, item: itemData });
            return;
        }

        console.log(`[PaymentFlow] Initiating payment for ${itemId} in section ${section || 'Expert'}`);
        
        // Ensure price is safely passed
        const finalPrice = numericPrice || customParams.totalPrice || 0;
        
        // If it's a legacy expert booking, pass it via expert prop
        if (isExpert) {
            navigation.navigate('Payment', {
                ...customParams,
                price: finalPrice,
                nextScreen: nextScreen,
                itemId: itemId
            });
            return;
        }

        navigation.navigate('Payment', {
            title: itemData.title || itemData.name || 'Your Order',
            price: finalPrice,
            image: itemData.img || itemData.image,
            serviceFee: itemData.serviceFee || 12,
            deliveryFee: itemData.deliveryFee || 'FREE',
            nextScreen: nextScreen,
            nextParams: { ...customParams, item: itemData, section },
            itemId: itemId,
            section: section
        });
    };

    return (
        <PaymentContext.Provider value={{ paidItems, addPaidItem, handlePaidAction }}>
            {children}
        </PaymentContext.Provider>
    );
}

export const usePayment = () => useContext(PaymentContext);
