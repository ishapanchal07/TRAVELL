import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function TransactionDetailScreen({ route, navigation }) {
    const { transaction } = route.params;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconCircle}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order Details</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Status Card */}
                <View style={styles.statusCard}>
                    <View style={styles.statusHeaderRow}>
                        <Text style={styles.orderIdText}>{transaction.id}</Text>
                        <View style={[styles.statusPill, transaction.status === 'Placed' || transaction.status === 'Confirmed' ? styles.statusPillSuccess : styles.statusPillPending]}>
                            <Text style={styles.statusText}>{transaction.status}</Text>
                        </View>
                    </View>
                    <Text style={styles.dateText}>{formatDate(transaction.date)}</Text>
                </View>

                {/* Items List */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Items Ordered</Text>
                    <View style={styles.card}>
                        {transaction.items && transaction.items.map((item, index) => (
                            <View key={index} style={[styles.itemRow, index > 0 && styles.itemRowBorder]}>
                                {item.image && <Image source={{ uri: item.image }} style={styles.itemImage} contentFit="cover" />}
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemTitle}>{item.quantity ? `${item.quantity}x ` : ''}{item.name || item.title}</Text>
                                    <Text style={styles.itemSub}>{[item.selectedSize, item.selectedDuration ? `${item.selectedDuration} day(s)` : null].filter(Boolean).join(' • ')}</Text>
                                </View>
                                <Text style={styles.itemPrice}>{item.price || item.rent || item.buy}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Delivery details if exists */}
                {transaction.deliveryAddress && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Delivery Options</Text>
                        <View style={styles.card}>
                            <View style={styles.addrHeader}>
                                <Ionicons name={transaction.deliveryAddress.label === 'Home' ? "home" : "location"} size={16} color="#000000" />
                                <Text style={styles.addrLabel}>{transaction.deliveryAddress.label || 'Delivery'}</Text>
                            </View>
                            <Text style={styles.addrText}>{transaction.deliveryAddress.fullName} • {transaction.deliveryAddress.phone}</Text>
                            <Text style={styles.addrText}>{transaction.deliveryAddress.addressLine}, {transaction.deliveryAddress.city}</Text>
                        </View>
                    </View>
                )}

                {/* Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Summary</Text>
                    <View style={styles.card}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Payment Method</Text>
                            <Text style={styles.summaryValue}>{transaction.paymentMethod === 'card' ? 'Credit Card' : transaction.paymentMethod === 'upi' ? 'UPI' : transaction.paymentMethod || 'Paid'}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Total Amount</Text>
                            <Text style={styles.summaryTotal}>${Number(transaction.totalAmount).toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
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
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    statusCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    statusHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    orderIdText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    statusPill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusPillSuccess: {
        backgroundColor: '#DCFCE7',
    },
    statusPillPending: {
        backgroundColor: '#F1F5F9',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#16A34A',
    },
    dateText: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 12,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    itemRowBorder: {
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 12,
        marginRight: 16,
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    itemSub: {
        fontSize: 12,
        color: '#64748B',
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '800',
        color: '#0F172A',
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
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '600',
    },
    summaryValue: {
        fontSize: 14,
        color: '#0F172A',
        fontWeight: '700',
    },
    summaryTotal: {
        fontSize: 18,
        fontWeight: '900',
        color: '#000000',
    }
});
