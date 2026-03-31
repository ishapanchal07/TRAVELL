import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DESTINATIONS = [
    {
        id: '1',
        city: 'Switzerland',
        stats: '1.1k roamsters active',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=600',
        route: 'Switzerland'
    },
    {
        id: '2',
        city: 'Dubai',
        stats: '2.3k roamsters active',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop',
        route: 'Dubai'
    },
    {
        id: '3',
        city: 'Paris',
        stats: '1.2k roamsters active',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop',
        route: 'Paris',
        badge: 'INFLUENCER PICK'
    },
    {
        id: '4',
        city: 'Rome',
        stats: '850 roamsters active',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600&auto=format&fit=crop',
        route: 'Rome'
    }
];

export default function AllDestinationsScreen({ navigation }) {
    return (
        <View style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Trending Hotspots</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {DESTINATIONS.map((dest) => (
                    <TouchableOpacity
                        key={dest.id}
                        style={styles.card}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate(dest.route)}
                    >
                        <ImageBackground 
                            source={{ uri: dest.image }} 
                            style={styles.cardImage} 
                            imageStyle={{ borderRadius: 24 }}
                            placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                            transition={300}
                            contentFit="cover"
                        >
                            <View style={styles.overlay}>
                                {dest.badge && (
                                    <View style={styles.pillContainer}>
                                        <Text style={styles.pillText}>{dest.badge}</Text>
                                    </View>
                                )}
                                <View style={{ flex: 1 }} />
                                <View style={styles.cardBottom}>
                                    <Text style={styles.cityText}>{dest.city}</Text>
                                    <View style={styles.statsRow}>
                                        <Ionicons name="people" size={12} color="#FFFFFF" style={{ marginRight: 5 }} />
                                        <Text style={styles.statsText}>{dest.stats}</Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAF9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backBtn: {
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
        fontSize: 20,
        fontWeight: '900',
        color: '#0F172A',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        width: '100%',
        height: 220,
        marginBottom: 20,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 20,
    },
    pillContainer: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    pillText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#0F172A',
    },
    cardBottom: {
        marginTop: 'auto',
    },
    cityText: {
        color: 'white',
        fontSize: 28,
        fontWeight: '800',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    statsText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 12,
        fontWeight: '500',
    },
});
