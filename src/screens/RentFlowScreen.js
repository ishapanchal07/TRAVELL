import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { usePayment } from '../context/PaymentContext';

export default function RentFlowScreen({ route, navigation }) {
    const { handlePaidAction } = usePayment();
    const { item = {}, quantity = 1, selectedSize = null, selectedDuration = 1 } = route.params || {};

    const pricePerDay = item.rent ? parseFloat(item.rent.replace(/[^0-9.]/g, '')) : 24;
    const rentalSubtotal = pricePerDay * selectedDuration * quantity;
    const serviceFee = 12.00;
    const total = rentalSubtotal + serviceFee;

    // Calculate dates based on current date
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + selectedDuration);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="close" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rent Apparel</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.itemCard}>
                    <Image 
                        source={{ uri: item.image }} 
                        style={styles.itemImage} 
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                        transition={300}
                        contentFit="cover"
                    />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>{item.title || 'Apparel Item'}</Text>
                        <Text style={styles.itemRent}>{item.rent || '$24'}/day</Text>
                        {selectedSize && <Text style={styles.itemSubText}>Size: {selectedSize} • Qty: {quantity}</Text>}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Rental Period</Text>
                    <View style={styles.datePickerPlaceholder}>
                        <Ionicons name="calendar-outline" size={20} color="#000000" />
                        <Text style={styles.dateText}>{formatDate(startDate)} - {formatDate(endDate)}, 2024 ({selectedDuration} Days)</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Location</Text>
                    <View style={styles.locationBox}>
                        <Ionicons name="location-outline" size={20} color="#000000" />
                        <Text style={styles.locationText}>Hôtel Lutetia, Paris</Text>
                    </View>
                </View>

                <View style={styles.summaryBox}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Rental ({selectedDuration} days x {quantity})</Text>
                        <Text style={styles.summaryValue}>€{rentalSubtotal}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Cleaning & Service</Text>
                        <Text style={styles.summaryValue}>€{serviceFee}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>€{total}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => handlePaidAction(
                        {
                            id: item.id || item.title || 'Apparel Rental',
                            title: item.title || 'Apparel Rental',
                            price: rentalSubtotal,
                            image: item.image,
                            serviceFee: serviceFee,
                            deliveryFee: 'FREE',
                            section: 'clothing'
                        },
                        'WardrobeStatus',
                        navigation,
                        { successMessage: 'Rental Confirmed!', section: 'clothing' }
                    )}
                >
                    <Text style={styles.confirmBtnText}>Pay Now</Text>
                </TouchableOpacity>
            </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'white',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    scrollContent: {
        padding: 20,
    },
    itemCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        marginBottom: 24,
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    itemDetails: {
        marginLeft: 15,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    itemRent: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000000',
    },
    itemSubText: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 4,
        fontWeight: '600',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#64748B',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    datePickerPlaceholder: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    dateText: {
        marginLeft: 12,
        fontSize: 15,
        fontWeight: '600',
        color: '#0F172A',
    },
    locationBox: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    locationText: {
        marginLeft: 12,
        fontSize: 15,
        fontWeight: '600',
        color: '#0F172A',
    },
    summaryBox: {
        backgroundColor: '#0F172A',
        padding: 24,
        borderRadius: 24,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    summaryLabel: {
        color: '#94A3B8',
        fontSize: 15,
        fontWeight: '500',
    },
    summaryValue: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
        paddingVertical: 4,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
    totalValue: {
        color: 'white',
        fontSize: 26,
        fontWeight: '900',
    },
    footer: {
        padding: 20,
        backgroundColor: 'white',
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
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
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 1,
    },
});
