import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { usePayment } from '../context/PaymentContext';

export default function PurchaseFlowScreen({ route, navigation }) {
    const { handlePaidAction } = usePayment();
    const { item = {}, quantity = 1, selectedSize = null } = route.params || {};

    const priceNum = item.buy ? parseFloat(item.buy.replace(/[^0-9.]/g, '')) : 185;
    const subtotal = priceNum * quantity;
    const total = subtotal; // FREE shipping as per UI

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="close" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.itemCard}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.itemImage}
                        contentFit="cover"
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                        transition={300}
                    />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>{item.title || 'Apparel Item'}</Text>
                        <Text style={styles.itemPrice}>{item.buy || '$185'}</Text>
                        {selectedSize && <Text style={styles.itemSubText}>Size: {selectedSize} • Qty: {quantity}</Text>}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shipping Address</Text>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Home</Text>
                            <TouchableOpacity><Text style={styles.editBtn}>Edit</Text></TouchableOpacity>
                        </View>
                        <Text style={styles.addressText}>123 Travel Lane, Adventure City, AC 12345</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.card}>
                        <View style={styles.paymentRow}>
                            <Ionicons name="card" size={24} color="#0F172A" />
                            <Text style={styles.paymentText}>**** **** **** 4589</Text>
                            <TouchableOpacity style={{ marginLeft: 'auto' }}>
                                <Text style={styles.editBtn}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.orderSummary}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal ({quantity} x {item.buy || '$185'})</Text>
                        <Text style={styles.summaryValue}>€{subtotal}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping</Text>
                        <Text style={styles.summaryValue}>FREE</Text>
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
                    style={styles.payBtn}
                    onPress={() => {
                        handlePaidAction(
                            {
                                id: item.id || item.title || 'Apparel Purchase',
                                title: item.title || 'Apparel Purchase',
                                price: subtotal,
                                image: item.image,
                                serviceFee: 0,
                                deliveryFee: 'FREE',
                            },
                            'WardrobeStatus',
                            navigation,
                            { successMessage: 'Purchase Confirmed!' }
                        );
                    }}
                >
                    <Text style={styles.payBtnText}>PAY NOW</Text>
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
    itemPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
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
    },
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    editBtn: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '600',
    },
    addressText: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
    },
    paymentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentText: {
        marginLeft: 12,
        fontSize: 15,
        fontWeight: '600',
        color: '#0F172A',
    },
    orderSummary: {
        marginTop: 10,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        color: '#64748B',
        fontSize: 14,
    },
    summaryValue: {
        color: '#0F172A',
        fontSize: 14,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    totalValue: {
        fontSize: 22,
        fontWeight: '900',
        color: '#0F172A',
    },
    footer: {
        padding: 20,
        backgroundColor: 'white',
        paddingBottom: 35,
    },
    payBtn: {
        backgroundColor: '#0F172A',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    payBtnText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 1,
    },
});
