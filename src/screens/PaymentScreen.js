import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useBooking } from '../context/BookingContext';
import { usePayment } from '../context/PaymentContext';

const { width } = Dimensions.get('window');

export default function PaymentScreen({ route, navigation }) {
    const { 
        title, 
        price, 
        image, 
        serviceFee = 12, 
        deliveryFee = 'FREE', 
        nextScreen, 
        nextParams = {},
        successMessage,
        expert, // Legacy support
        selectedDate,
        selectedTime,
        duration,
        totalPrice, // Legacy support
        itemId
    } = route.params;

    const { addBooking } = useBooking();
    const { addPaidItem } = usePayment();
    const [loading, setLoading] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('card');

    const basePrice = Number(price || totalPrice || 0);
    const itemTitle = title || (expert ? expert.name : 'Your Order');
    const itemImage = image || (expert ? expert.image : null);
    const finalTotal = basePrice + Number(serviceFee);

    const handlePayment = async () => {
        setLoading(true);
        // Simulate Processing
        setTimeout(async () => {
            if (expert) {
                const bookingDetails = {
                    expertId: expert.id,
                    expertName: expert.name,
                    expertImage: expert.image,
                    date: selectedDate,
                    time: selectedTime,
                    duration: duration,
                    totalAmount: finalTotal.toFixed(2),
                    status: 'Confirmed',
                    timestamp: new Date().toISOString()
                };
                await addBooking(bookingDetails);
            }
            if (itemId) {
                addPaidItem(itemId);
            }
            setLoading(false);
            
            const destScreen = nextScreen || (expert ? 'BookingConfirmation' : 'Explore');
            const destParams = expert 
                ? { booking: { ...expert, totalAmount: finalTotal.toFixed(2), date: selectedDate, time: selectedTime, duration, id: Date.now().toString(), expertId: expert.id, expertName: expert.name, expertImage: expert.image } } 
                : nextParams;

            navigation.navigate('PaymentSuccess', { 
                nextScreen: destScreen, 
                nextParams: destParams,
                message: successMessage 
            });
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Item Summary */}
                <View style={styles.summaryCard}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.itemRow}>
                        {itemImage && <Image source={{ uri: itemImage }} style={styles.itemImage} contentFit="cover" />}
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemTitle} numberOfLines={2}>{itemTitle}</Text>
                            <Text style={styles.itemPrice}>${basePrice.toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Subtotal</Text>
                        <Text style={styles.feeValue}>${basePrice.toFixed(2)}</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Service Fee</Text>
                        <Text style={styles.feeValue}>${Number(serviceFee).toFixed(2)}</Text>
                    </View>
                    <View style={styles.feeRow}>
                        <Text style={styles.feeLabel}>Delivery & Return</Text>
                        <View style={styles.freePill}>
                            <Text style={styles.freePillText}>{deliveryFee}</Text>
                        </View>
                    </View>

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>TOTAL PRICE</Text>
                        <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 10, marginBottom: 15 }]}>Payment Method</Text>

                <TouchableOpacity 
                    style={[styles.paymentMethod, selectedMethod === 'card' && styles.paymentMethodActive]} 
                    onPress={() => setSelectedMethod('card')}
                    activeOpacity={0.8}
                >
                    <View style={styles.methodLeft}>
                        <FontAwesome name="cc-stripe" size={24} color={selectedMethod === 'card' ? "#6772E5" : "#94A3B8"} />
                        <Text style={[styles.methodName, { marginLeft: 16 }]}>Stripe / Credit Card</Text>
                    </View>
                    <Ionicons name={selectedMethod === 'card' ? "radio-button-on" : "radio-button-off"} size={24} color={selectedMethod === 'card' ? "#000" : "#CBD5E1"} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.paymentMethod, selectedMethod === 'upi' && styles.paymentMethodActive]} 
                    onPress={() => setSelectedMethod('upi')}
                    activeOpacity={0.8}
                >
                    <View style={styles.methodLeft}>
                        <Image 
                            source={{ uri: 'https://images.livemint.com/img/2021/04/16/600x338/razorpay-kZfG--621x414@LiveMint_1618585994274.png' }}
                            style={[styles.methodIcon, selectedMethod !== 'upi' && { opacity: 0.5 }]}
                        />
                        <Text style={styles.methodName}>Razorpay / UPI</Text>
                    </View>
                    <Ionicons name={selectedMethod === 'upi' ? "radio-button-on" : "radio-button-off"} size={24} color={selectedMethod === 'upi' ? "#000" : "#CBD5E1"} />
                </TouchableOpacity>

                <View style={styles.securityInfo}>
                    <Ionicons name="shield-checkmark" size={16} color="#10B981" />
                    <Text style={styles.securityText}>100% Secure & Encrypted Payments</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity 
                    style={[styles.payButton, loading && styles.payButtonDisabled]}
                    onPress={handlePayment}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.payButtonText}>Pay ${finalTotal.toFixed(2)}</Text>
                    )}
                </TouchableOpacity>
            </View>

            {loading && (
                <View style={styles.overlay}>
                    <View style={styles.loaderCard}>
                        <ActivityIndicator size="large" color="#000" />
                        <Text style={styles.loaderText}>Processing Payment...</Text>
                        <Text style={styles.loaderSub}>Please do not close the app</Text>
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
        paddingVertical: 15,
        backgroundColor: '#F8FAFC',
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 120,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 15,
    },
    summaryCard: {
        backgroundColor: 'white',
        borderRadius: 28,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 15,
        elevation: 2,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 16,
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '800',
        color: '#000000',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 15,
    },
    feeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    feeLabel: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '600',
    },
    feeValue: {
        fontSize: 14,
        color: '#0F172A',
        fontWeight: '700',
    },
    freePill: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    freePillText: {
        color: '#16A34A',
        fontSize: 10,
        fontWeight: '800',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    totalLabel: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '800',
        letterSpacing: 1,
    },
    totalValue: {
        fontSize: 28,
        fontWeight: '900',
        color: '#000000',
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
        marginBottom: 12,
    },
    paymentMethodActive: {
        borderColor: '#000',
        borderWidth: 2,
    },
    methodLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    methodIcon: {
        width: 40,
        height: 24,
        marginRight: 16,
    },
    methodName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    securityInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    securityText: {
        fontSize: 12,
        color: '#64748B',
        marginLeft: 6,
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingTop: 15,
        paddingBottom: 30,
        borderTopWidth: 1,
        borderColor: '#F1F5F9',
    },
    payButton: {
        backgroundColor: '#000',
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    payButtonDisabled: {
        opacity: 0.7,
    },
    payButtonText: {
        color: 'white',
        fontSize: 16,
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
