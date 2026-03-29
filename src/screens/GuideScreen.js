import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import { useBooking } from '../context/BookingContext';
import AvailabilityBadge from '../components/AvailabilityBadge';
import RatingStars from '../components/RatingStars';

const { width } = Dimensions.get('window');

export default function GuideScreen({ route, navigation }) {
    const { city = 'Paris' } = route.params || {};
    const { experts } = useBooking();
    const [activeFilter, setActiveFilter] = useState('All Experts');
    const [showFilters, setShowFilters] = useState(false);
    
    // Advanced Filter State
    const [priceRange, setPriceRange] = useState(300);
    const [minRating, setMinRating] = useState(0);

    const filteredExperts = experts.filter(expert => {
        const matchesCategory = activeFilter === 'All Experts' || expert.category.toLowerCase().includes(activeFilter.toLowerCase());
        const matchesPrice = expert.price <= priceRange;
        const matchesRating = expert.rating >= minRating;
        return matchesCategory && matchesPrice && matchesRating;
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconCircle}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.iconCircle, showFilters && styles.iconCircleActive]}
                    onPress={() => setShowFilters(!showFilters)}
                >
                    <Feather name="sliders" size={20} color={showFilters ? "white" : "#0F172A"} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.mainTitle}>Hire an Expert</Text>
                <Text style={styles.subtitle}>Local guides for your best aesthetic in {city}.</Text>

                {showFilters && (
                    <View style={styles.advancedFilters}>
                        <View style={styles.filterRow}>
                            <Text style={styles.filterLabel}>Max Price: ${priceRange}</Text>
                            <View style={styles.priceOptions}>
                                {[150, 200, 250, 300].map(p => (
                                    <TouchableOpacity 
                                        key={p} 
                                        onPress={() => setPriceRange(p)}
                                        style={[styles.priceTag, priceRange === p && styles.priceTagActive]}
                                    >
                                        <Text style={[styles.priceTagText, priceRange === p && styles.priceTagTextActive]}>${p}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        <View style={styles.filterRow}>
                            <Text style={styles.filterLabel}>Min Rating: {minRating}+</Text>
                            <View style={styles.ratingOptions}>
                                {[0, 4, 4.5, 4.8].map(r => (
                                    <TouchableOpacity 
                                        key={r} 
                                        onPress={() => setMinRating(r)}
                                        style={[styles.ratingTag, minRating === r && styles.ratingTagActive]}
                                    >
                                        <Text style={[styles.ratingTagText, minRating === r && styles.ratingTagTextActive]}>{r === 0 ? 'All' : r + '★'}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                )}

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
                    {filteredExperts.map((guide) => (
                        <TouchableOpacity 
                            key={guide.id} 
                            style={styles.card}
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('ExpertProfile', { expert: guide })}
                        >
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
                                <View style={styles.statusOverlay}>
                                    <AvailabilityBadge status={guide.status} />
                                </View>
                                <View style={styles.priceOverlay}>
                                    <Text style={styles.priceText}>${guide.price}/day</Text>
                                </View>
                            </View>
                            <View style={styles.cardContent}>
                                <Text style={styles.guideName}>{guide.name}</Text>
                                <View style={styles.ratingRow}>
                                    <RatingStars rating={guide.rating} size={12} />
                                    <Text style={styles.ratingCount}>({guide.reviewCount})</Text>
                                </View>
                                <Text style={styles.guideDesc} numberOfLines={2}>{guide.description}</Text>
                                <View style={styles.footerRow}>
                                    <View style={styles.categoryPill}>
                                        <Text style={styles.categoryText}>{guide.category}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={styles.hireMinimal}
                                        onPress={() => navigation.navigate('Booking', { expert: guide })}
                                    >
                                        <Text style={styles.hireMinimalText}>Hire</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
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
    iconCircleActive: {
        backgroundColor: '#000',
    },
    advancedFilters: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 24,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    filterRow: {
        marginBottom: 16,
    },
    filterLabel: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 12,
    },
    priceOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceTag: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
    },
    priceTagActive: {
        backgroundColor: '#000',
    },
    priceTagText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
    },
    priceTagTextActive: {
        color: 'white',
    },
    ratingOptions: {
        flexDirection: 'row',
    },
    ratingTag: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        marginRight: 10,
    },
    ratingTagActive: {
        backgroundColor: '#000',
    },
    ratingTagText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
    },
    ratingTagTextActive: {
        color: 'white',
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
        backgroundColor: 'white',
        borderRadius: 24,
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    imageContainer: {
        width: '100%',
        height: 160,
        position: 'relative',
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
    statusOverlay: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    priceOverlay: {
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    priceText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '800',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        overflow: 'hidden',
    },
    cardContent: {
        padding: 12,
    },
    guideName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingCount: {
        fontSize: 10,
        color: '#94A3B8',
        marginLeft: 4,
        fontWeight: '600',
    },
    guideDesc: {
        fontSize: 12,
        color: '#64748B',
        lineHeight: 18,
        marginBottom: 12,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryPill: {
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    categoryText: {
        fontSize: 9,
        fontWeight: '800',
        color: '#475569',
    },
    hireMinimal: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#000',
        borderRadius: 8,
    },
    hireMinimalText: {
        color: 'white',
        fontSize: 11,
        fontWeight: '800',
    },
});
