import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useCart } from '../context/CartContext';
import { useAddress } from '../context/AddressContext';
import { usePayment } from '../context/PaymentContext';

const { width } = Dimensions.get('window');

const PAYMENT_METHODS = [
    { id: 'apple', label: 'Apple Pay', icon: 'logo-apple' },
    { id: 'card', label: 'Credit Card', icon: 'card-outline' },
    { id: 'upi', label: 'UPI / Netbanking', icon: 'phone-portrait-outline' },
    { id: 'cod', label: 'Cash on Delivery', icon: 'cash-outline' },
];

export default function CheckoutScreen({ navigation }) {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { selectedAddress } = useAddress();
    const { handlePaidAction } = usePayment();

    const [selectedPayment, setSelectedPayment] = useState('card');

    const handleConfirmOrder = () => {
        // Construct mock order object for the success screen
        const mockOrder = {
            id: `ORD-${Math.floor(Math.random() * 100000)}`,
            title: `${cartItems.length} items from Cart`,
            price: cartTotal,
            image: cartItems[0]?.image || cartItems[0]?.img || '',
            serviceFee: 2.50,
            deliveryFee: "$0.00", // Example
            section: 'cart'
        };

        handlePaidAction(
            mockOrder,
            'OrderTracking',
            navigation,
            { 
                orderItem: { name: mockOrder.title, image: mockOrder.image }, 
                successMessage: 'Order Placed Successfully!', 
                section: 'cart',
                onSuccess: () => {
                    clearCart();
                }
            }
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconCircle}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Delivery Address Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Deliver to</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AddressList', { onSelectGoBack: true })}>
                            <Text style={styles.changeText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {selectedAddress && (
                        <View style={styles.selectedAddrBox}>
                            <View style={styles.addrHeader}>
                                <Ionicons name={selectedAddress.label === 'Home' ? "home" : selectedAddress.label === 'Work' ? "briefcase" : "location"} size={16} color="#000000" />
                                <Text style={styles.addrLabel}>{selectedAddress.label}</Text>
                            </View>
                            <Text style={styles.addrText}>{selectedAddress.fullName} • {selectedAddress.phone}</Text>
                            <Text style={styles.addrText}>{selectedAddress.addressLine}, {selectedAddress.city}</Text>
                        </View>
                    )}
                </View>

                {/* Order Summary Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryBox}>
                        {cartItems.map((item, index) => (
                            <View key={index} style={styles.summaryItem}>
                                <View style={styles.summaryItemInfo}>
                                    <Text style={styles.summaryItemTitle} numberOfLines={1}>{item.quantity}x {item.title || item.name}</Text>
                                    <Text style={styles.summaryItemSub}>
                                        {[item.selectedSize, item.selectedDuration ? `${item.selectedDuration} day(s)` : null].filter(Boolean).join(' • ')}
                                    </Text>
                                </View>
                                <Text style={styles.summaryItemPrice}>{item.price || item.rent || item.buy}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Payment Method Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.paymentOptionsContainer}>
                        {PAYMENT_METHODS.map(method => (
                            <TouchableOpacity 
                                key={method.id}
                                style={[styles.methodCard, selectedPayment === method.id && styles.methodCardActive]}
                                onPress={() => setSelectedPayment(method.id)}
                            >
                                <View style={styles.methodLeft}>
                                    <Ionicons 
                                        name={method.icon} 
                                        size={22} 
                                        color={selectedPayment === method.id ? "#000000" : "#64748B"} 
                                    />
                                    <Text style={[styles.methodLabel, selectedPayment === method.id && styles.methodLabelActive]}>
                                        {method.label}
                                    </Text>
                                </View>
                                <View style={[styles.radioCircle, selectedPayment === method.id && styles.radioCircleActive]}>
                                    {selectedPayment === method.id && <View style={styles.radioInner} />}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total to Pay</Text>
                    <Text style={styles.totalAmount}>${cartTotal.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmOrder}>
                    <Text style={styles.confirmBtnText}>Confirm Order</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    section: {
        marginBottom: 30,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 15,
    },
    changeText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
    selectedAddrBox: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    addrHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    addrLabel: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
        marginLeft: 8,
    },
    addrText: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 22,
    },
    summaryBox: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    summaryItemInfo: {
        flex: 1,
        marginRight: 10,
    },
    summaryItemTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    summaryItemSub: {
        fontSize: 12,
        color: '#64748B',
    },
    summaryItemPrice: {
        fontSize: 15,
        fontWeight: '800',
        color: '#0F172A',
    },
    paymentOptionsContainer: {
        gap: 12,
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    methodCardActive: {
        borderColor: '#0F172A',
        backgroundColor: '#FAFAF9',
    },
    methodLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    methodLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#64748B',
        marginLeft: 12,
    },
    methodLabelActive: {
        color: '#0F172A',
        fontWeight: '700',
    },
    radioCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#CBD5E1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioCircleActive: {
        borderColor: '#000000',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000000',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    totalLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000000',
    },
    confirmBtn: {
        backgroundColor: '#000000',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
    }
});
