import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const LIKED = [
    { id: '1', title: 'Cozy Café Seine', desc: 'Hidden Gem • Paris' },
    { id: '2', title: 'Secret Mountain Trail', desc: 'Hidden Gem • Switzerland' }
];

export default function LikedItemsScreen({ navigation }) {
    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Liked Gems</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {LIKED.map(item => (
                    <View key={item.id} style={styles.card}>
                        <View style={styles.iconBox}>
                            <Feather name="star" size={24} color="#FBBF24" />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.desc}>{item.desc}</Text>
                        </View>
                        <Ionicons name="heart" size={24} color="#EF4444" />
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
    card: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 20, padding: 15, alignItems: 'center', marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 5, elevation: 2 },
    iconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#FFFBEB', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    info: { flex: 1 },
    title: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
    desc: { fontSize: 13, color: '#64748B', fontWeight: '500' }
});