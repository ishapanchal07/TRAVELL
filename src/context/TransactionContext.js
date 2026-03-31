import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TRANSACTIONS_STORAGE_KEY = '@roamster_transactions';

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const storedTransactions = await AsyncStorage.getItem(TRANSACTIONS_STORAGE_KEY);
            if (storedTransactions) {
                setTransactions(JSON.parse(storedTransactions));
            }
        } catch (error) {
            console.error('Failed to load transactions', error);
        } finally {
            setLoading(false);
        }
    };

    const addTransaction = async (transaction) => {
        try {
            const newTransaction = {
                ...transaction,
                id: transaction.id || `ORD-${Math.floor(Math.random() * 1000000)}`,
                date: transaction.date || new Date().toISOString(),
                status: transaction.status || 'Placed',
                timestamp: Date.now()
            };
            
            const updatedTransactions = [newTransaction, ...transactions];
            setTransactions(updatedTransactions);
            await AsyncStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(updatedTransactions));
        } catch (error) {
            console.error('Failed to save transaction', error);
        }
    };

    const clearTransactions = async () => {
        try {
            setTransactions([]);
            await AsyncStorage.removeItem(TRANSACTIONS_STORAGE_KEY);
        } catch (error) {
            console.error('Failed to clear transactions', error);
        }
    };

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, clearTransactions, loading }}>
            {children}
        </TransactionContext.Provider>
    );
}

export const useTransaction = () => useContext(TransactionContext);
