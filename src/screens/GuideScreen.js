import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const GUIDES = [
    {
        id: '1',
        name: 'Amélie L.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
        price: '$180/day',
        description: '"Capturing the golden hour at Louvre"',
        category: 'PHOTOGRAPHY'
    },
    {
        id: '2',
        name: 'Julien B.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
        price: '$220/day',
        description: '"Paris\' hidden jazz & wine spots"',
        category: 'NIGHTLIFE'
    },
    {
        id: '3',
        name: 'Léa M.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        price: '$160/day',
        description: '"Le Marais\' secret fashion alleys"',
        category: 'CHIC STYLE'
    },
    {
        id: '4',
        name: 'Marc R.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        price: '$190/day',
        description: '"The untold stories of Montmartre"',
        category: 'HISTORY'
    }
];

export default function GuideScreen({ route, navigation }) {
    const { city = 'Paris' } = route.params || {};
    const [activeFilter, setActiveFilter] = useState('All Experts');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconCircle}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconCircle}>
                    <Feather name="search" size={20} color="#0F172A" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.mainTitle}>Hire an Expert</Text>
                <Text style={styles.subtitle}>Local guides for your best aesthetic in {city}.</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {['All Experts', 'Photography', 'Nightlife', 'History'].map(filter => (
                        <TouchableOpacity
                            key={filter}
                            style={[styles.filterBtn, activeFilter === filter ? styles.filterBtnActive : null]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text style={[styles.filterText, activeFilter === filter ? styles.filterTextActive : null]}>{filter}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.gridContainer}>
                    {GUIDES.map((guide) => {
                        if (activeFilter !== 'All Experts' && guide.category.toUpperCase() !== activeFilter.toUpperCase() && !(activeFilter === 'History' && guide.category === 'CHIC STYLE')) {
                            // Just a simple filter, in real app would match exact
                            if (activeFilter === 'Photography' && guide.category !== 'PHOTOGRAPHY') return null;
                            if (activeFilter === 'Nightlife' && guide.category !== 'NIGHTLIFE') return null;
                            if (activeFilter === 'History' && guide.category !== 'HISTORY' && guide.category !== 'CHIC STYLE') return null;
                        }

                        return (
                            <View key={guide.id} style={styles.card}>
                                <View style={styles.imageContainer}>
                                    <Image 
                                        source={{ uri: guide.image }} 
                                        style={styles.cardImage} 
                                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                        transition={300}
                                        contentFit="cover"
                                    />
                                    <View style={styles.verifiedBadge}>
                                        <MaterialIcons name="verified" size={20} color="#000000" style={{ backgroundColor: 'white', borderRadius: 10, overflow: 'hidden' }} />
                                    </View>
                                    <View style={styles.priceOverlay}>
                                        <Text style={styles.priceText}>{guide.price}</Text>
                                    </View>
                                </View>
                                <Text style={styles.guideName}>{guide.name}</Text>
                                <Text style={styles.guideDesc}>{guide.description}</Text>
                                <View style={styles.categoryPill}>
                                    <Text style={styles.categoryText}>{guide.category}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            <BottomNav activeRoute="Explore" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
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
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        marginBottom: 24,
        lineHeight: 22,
    },
    filterScroll: {
        paddingBottom: 25,
    },
    filterBtn: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        backgroundColor: 'white',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    filterBtnActive: {
        backgroundColor: '#000000',
        borderColor: '#000000',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
    },
    filterTextActive: {
        color: 'white',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: (width - 55) / 2,
        marginBottom: 25,
    },
    imageContainer: {
        width: '100%',
        height: 200,
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 12,
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    verifiedBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    priceOverlay: {
        position: 'absolute',
        bottom: 12,
        left: 12,
    },
    priceText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '800',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    guideName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    guideDesc: {
        fontSize: 13,
        color: '#94A3B8',
        fontStyle: 'italic',
        marginBottom: 10,
        lineHeight: 18,
    },
    categoryPill: {
        backgroundColor: '#F8FAFC',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#000000',
    },
});
