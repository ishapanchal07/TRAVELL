import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function AdminScreen({ navigation }) {
    const [stats, setStats] = useState({
        activeTrips: 124,
        totalRentals: 856,
        revenue: '$12,450',
        activeUsers: '3.2k'
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Admin Panel</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.statsGrid}>
                    <StatCard title="Active Trips" value={stats.activeTrips} icon="map-marker-path" />
                    <StatCard title="Total Rentals" value={stats.totalRentals} icon="hanger" />
                    <StatCard title="Total Revenue" value={stats.revenue} icon="currency-usd" />
                    <StatCard title="Active Users" value={stats.activeUsers} icon="account-group" />
                </View>

                <Text style={styles.sectionTitle}>Content Management</Text>
                <AdminAction title="Manage Destinations" icon="airplane" />
                <AdminAction title="Manage Catalog" icon="tshirt-crew" />
                <AdminAction title="Food Inventory" icon="food-apple" />
                <AdminAction title="User Feedback" icon="message-draw" />

                <Text style={styles.sectionTitle}>System Status</Text>
                <View style={styles.statusBox}>
                    <View style={styles.statusRow}>
                        <Text style={styles.statusLabel}>API Status</Text>
                        <View style={styles.onlineBadge}>
                            <Text style={styles.onlineText}>ONLINE</Text>
                        </View>
                    </View>
                    <View style={styles.statusRow}>
                        <Text style={styles.statusLabel}>Database</Text>
                        <View style={styles.onlineBadge}>
                            <Text style={styles.onlineText}>ONLINE</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function StatCard({ title, value, icon }) {
    return (
        <View style={styles.statCard}>
            <MaterialCommunityIcons name={icon} size={24} color="#3B82F6" />
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statTitle}>{title}</Text>
        </View>
    );
}

function AdminAction({ title, icon }) {
    return (
        <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
            <View style={styles.actionIconBox}>
                <MaterialCommunityIcons name={icon} size={20} color="#3B82F6" />
            </View>
            <Text style={styles.actionText}>{title}</Text>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'white',
    },
    backBtn: { width: 44, height: 44, justifyContent: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
    scrollContent: { padding: 20 },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    statCard: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    statValue: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 10 },
    statTitle: { fontSize: 12, fontWeight: '600', color: '#94A3B8', marginTop: 4 },
    sectionTitle: { fontSize: 14, fontWeight: '900', color: '#94A3B8', letterSpacing: 1, marginTop: 25, marginBottom: 15 },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        marginBottom: 10,
    },
    actionIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    actionText: { flex: 1, fontSize: 15, fontWeight: '700', color: '#0F172A' },
    statusBox: { backgroundColor: 'white', borderRadius: 20, padding: 20 },
    statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    statusLabel: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
    onlineBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
    onlineText: { color: '#166534', fontSize: 10, fontWeight: '800' },
});
