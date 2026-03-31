import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressContext = createContext();

export function AddressProvider({ children }) {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        loadAddresses();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            saveAddresses();
        }
    }, [addresses, selectedAddressId, isLoaded]);

    const loadAddresses = async () => {
        try {
            const savedAddresses = await AsyncStorage.getItem('@roamster_addresses');
            const savedSelectedId = await AsyncStorage.getItem('@roamster_selected_address');
            
            if (savedAddresses) {
                setAddresses(JSON.parse(savedAddresses));
            }
            if (savedSelectedId) {
                setSelectedAddressId(savedSelectedId);
            }
        } catch (e) {
            console.error('Failed to load addresses', e);
        } finally {
            setIsLoaded(true);
        }
    };

    const saveAddresses = async () => {
        try {
            await AsyncStorage.setItem('@roamster_addresses', JSON.stringify(addresses));
            if (selectedAddressId) {
                await AsyncStorage.setItem('@roamster_selected_address', selectedAddressId);
            } else {
                await AsyncStorage.removeItem('@roamster_selected_address');
            }
        } catch (e) {
            console.error('Failed to save addresses', e);
        }
    };

    const addAddress = (address) => {
        const id = Date.now().toString();
        const newAddress = { ...address, id };
        setAddresses(prev => [...prev, newAddress]);
        
        // Auto-select the newly added address unconditionally
        setSelectedAddressId(id);
    };

    const editAddress = (id, updatedAddress) => {
        setAddresses(prev => prev.map(addr => addr.id === id ? { ...addr, ...updatedAddress } : addr));
    };

    const deleteAddress = (id) => {
        setAddresses(prev => {
            const newAddresses = prev.filter(addr => addr.id !== id);
            // If the deleted address was selected, reset selection
            if (selectedAddressId === id) {
                setSelectedAddressId(newAddresses.length > 0 ? newAddresses[0].id : null);
            }
            return newAddresses;
        });
    };

    const selectAddress = (id) => {
        setSelectedAddressId(id);
    };

    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId) || null;

    return (
        <AddressContext.Provider value={{
            addresses,
            selectedAddressId,
            selectedAddress,
            addAddress,
            editAddress,
            deleteAddress,
            selectAddress
        }}>
            {children}
        </AddressContext.Provider>
    );
}

export const useAddress = () => useContext(AddressContext);
