import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useBooking } from '../context/BookingContext';

export default function PaymentScreen({ route, navigation }) {
    const { expert, totalPrice, selectedDate, selectedTime, duration } = route.params;
    const { addBooking } = useBooking();
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        // Simulate Payment Processing
        setTimeout(async () => {
            const bookingDetails = {
                expertId: expert.id,
                expertName: expert.name,
                expertImage: expert.image,
                date: selectedDate,
                time: selectedTime,
                duration: duration,
                totalAmount: totalPrice.toFixed(0),
                status: 'Confirmed',
                timestamp: new Date().toISOString()
            };
            
            await addBooking(bookingDetails);
            setLoading(false);
            navigation.navigate('BookingConfirmation', { booking: bookingDetails });
        }, 3000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Secure Payment</Text>
                <View style={{ width: 44 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.amountCard}>
                    <Text style={styles.amountLabel}>Payable Amount</Text>
                    <Text style={styles.amountValue}>${totalPrice.toFixed(0)}</Text>
                </View>

                <Text style={styles.paymentTitle}>Select Payment Method</Text>

                <TouchableOpacity style={styles.paymentMethodActive}>
                    <View style={styles.methodLeft}>
                        <Image 
                            source={{ uri: 'https://images.livemint.com/img/2021/04/16/600x338/razorpay-kZfG--621x414@LiveMint_1618585994274.png' }}
                            style={styles.methodIcon}
                        />
                        <Text style={styles.methodName}>Razorpay / UPI</Text>
                    </View>
                    <Ionicons name="radio-button-on" size={24} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.paymentMethod}>
                    <View style={styles.methodLeft}>
                        <FontAwesome name="cc-stripe" size={24} color="#6772E5" />
                        <Text style={[styles.methodName, { marginLeft: 16 }]}>Stripe / Card</Text>
                    </View>
                    <Ionicons name="radio-button-off" size={24} color="#CBD5E1" />
                </TouchableOpacity>

                <View style={styles.securityInfo}>
                    <Ionicons name="shield-checkmark" size={20} color="#10B981" />
                    <Text style={styles.securityText}>100% Secure & Encrypted Payments</Text>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity 
                        style={[styles.payButton, loading && styles.payButtonDisabled]}
                        onPress={handlePayment}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.payButtonText}>Pay Securely</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {loading && (
                <View style={styles.overlay}>
                    <View style={styles.loaderCard}>
                        <ActivityIndicator size="large" color="#000" />
                        <Text style={styles.loaderText}>Processing Payment...</Text>
                        <Text style={styles.loaderSub}>Do not close the app</Text>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    content: {
        flex: 1,
        padding: 24,
    },
    amountCard: {
        backgroundColor: '#000',
        padding: 32,
        borderRadius: 28,
        alignItems: 'center',
        marginBottom: 40,
    },
    amountLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    amountValue: {
        color: 'white',
        fontSize: 48,
        fontWeight: '900',
    },
    paymentTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 20,
    },
    paymentMethodActive: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#000',
        marginBottom: 16,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 16,
    },
    methodLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    methodIcon: {
        width: 40,
        height: 24,
        contentFit: 'contain',
        marginRight: 16,
    },
    methodName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    securityInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    securityText: {
        fontSize: 12,
        color: '#64748B',
        marginLeft: 8,
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 24,
        right: 24,
    },
    payButton: {
        backgroundColor: '#000',
        height: 64,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    payButtonDisabled: {
        opacity: 0.7,
    },
    payButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderCard: {
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 32,
        alignItems: 'center',
        width: width * 0.8,
    },
    loaderText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginTop: 20,
    },
    loaderSub: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 8,
    },
});
