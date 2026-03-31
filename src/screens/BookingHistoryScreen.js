import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';

const BOOKINGS = [
    { id: '1', title: 'Louvre VIP Tour', date: 'Oct 15, 2023', status: 'Upcoming', amount: '$120', img: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=200' },
    { id: '2', title: 'Urban Photography Expert', date: 'Oct 05, 2023', status: 'Completed', amount: '$75', img: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=200' },
    { id: '3', title: 'Swiss Alps Hiking', date: 'Sep 10, 2023', status: 'Completed', amount: '$240', img: 'https://images.unsplash.com/photo-1531366936336-d63c5c96b75f?w=200' },
];

export default function BookingHistoryScreen({ navigation }) {
    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Booking History</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {BOOKINGS.map(item => (
                    <View key={item.id} style={styles.card}>
                        <Image source={{ uri: item.img }} style={styles.img} />
                        <View style={styles.info}>
                            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                            <View style={styles.row}>
                                <View style={[styles.badge, item.status === 'Upcoming' ? styles.badgeUpcoming : styles.badgeCompleted]}>
                                    <Text style={[styles.badgeText, item.status === 'Upcoming' ? styles.textUpcoming : styles.textCompleted]}>{item.status}</Text>
                                </View>
                                <Text style={styles.amount}>{item.amount}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
    headerIconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    headerTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
    content: { padding: 20 },
    card: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 20, padding: 12, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 },
    img: { width: 80, height: 80, borderRadius: 12 },
    info: { flex: 1, marginLeft: 15, justifyContent: 'center' },
    title: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
    date: { fontSize: 13, color: '#64748B', fontWeight: '500', marginBottom: 10 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    badgeUpcoming: { backgroundColor: '#FEF3C7' },
    badgeCompleted: { backgroundColor: '#F1F5F9' },
    badgeText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
    textUpcoming: { color: '#D97706' },
    textCompleted: { color: '#64748B' },
    amount: { fontSize: 16, fontWeight: '800', color: '#0F172A' }
});