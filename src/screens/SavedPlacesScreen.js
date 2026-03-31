import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const PLACES = [
    { id: '1', title: 'Louvre Museum', type: 'Attraction', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400' },
    { id: '2', title: 'Gstaad Ski Resort', type: 'Destination', img: 'https://images.unsplash.com/photo-1549140608-5ce421f1c7e9?w=400' },
    { id: '3', title: 'Burj Khalifa', type: 'Attraction', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400' }
];

export default function SavedPlacesScreen({ navigation }) {
    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Saved Places</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {PLACES.map(place => (
                    <TouchableOpacity key={place.id} style={styles.card} activeOpacity={0.8}>
                        <Image source={{ uri: place.img }} style={styles.img} />
                        <TouchableOpacity style={styles.heartBtn}>
                            <Ionicons name="heart" size={20} color="#EF4444" />
                        </TouchableOpacity>
                        <View style={styles.info}>
                            <Text style={styles.title}>{place.title}</Text>
                            <Text style={styles.type}>{place.type}</Text>
                        </View>
                    </TouchableOpacity>
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
    card: { backgroundColor: 'white', borderRadius: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3, overflow: 'hidden' },
    img: { width: '100%', height: 180 },
    heartBtn: { position: 'absolute', top: 15, right: 15, backgroundColor: 'white', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
    info: { padding: 15 },
    title: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
    type: { fontSize: 13, color: '#64748B', fontWeight: '600' }
});