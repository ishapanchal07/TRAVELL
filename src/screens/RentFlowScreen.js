import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function RentFlowScreen({ route, navigation }) {
    const { item = {} } = route.params || {};

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
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>{item.title || 'Apparel Item'}</Text>
                        <Text style={styles.itemRent}>{item.rent || '$24'}/day</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Rental Period</Text>
                    <View style={styles.datePickerPlaceholder}>
                        <Ionicons name="calendar-outline" size={20} color="#3B82F6" />
                        <Text style={styles.dateText}>Sept 12 - Sept 18, 2024 (6 Days)</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Location</Text>
                    <View style={styles.locationBox}>
                        <Ionicons name="location-outline" size={20} color="#3B82F6" />
                        <Text style={styles.locationText}>Hôtel Lutetia, Paris</Text>
                    </View>
                </View>

                <View style={styles.summaryBox}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Rental (6 days)</Text>
                        <Text style={styles.summaryValue}>$144.00</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Cleaning & Service</Text>
                        <Text style={styles.summaryValue}>$12.00</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>$156.00</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={() => navigation.navigate('WardrobeStatus')}
                >
                    <Text style={styles.confirmBtnText}>CONFIRM RENTAL</Text>
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
        color: '#3B82F6',
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
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        color: '#94A3B8',
        fontSize: 14,
    },
    summaryValue: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#334155',
        marginVertical: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    totalValue: {
        color: '#3B82F6',
        fontSize: 24,
        fontWeight: '900',
    },
    footer: {
        padding: 20,
        backgroundColor: 'white',
        paddingBottom: 35,
    },
    confirmBtn: {
        backgroundColor: '#3B82F6',
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
