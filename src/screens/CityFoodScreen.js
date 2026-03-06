import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions, Image as RNImage } from 'react-native';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const CITY_DATA = {
    'Paris': {
        title: 'Parisian Flavors',
        location: 'LE MARAIS, 4TH',
        hiddenGems: [
            {
                id: 'p1',
                image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600',
                badge: 'LOCALS ONLY',
                rating: '4.9',
                title: "L'As du Fallafel",
                price: '$12.00',
                desc: 'The most famous pita in Paris, served with...',
                isVeg: true,
            },
            {
                id: 'p2',
                image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=600',
                badge: 'CHEF PICK',
                rating: '4.8',
                title: 'Steak Frites',
                price: '$28.00',
                desc: 'Classic Parisian bistro dining experience.',
                isVeg: false,
            }
        ],
        popularNearby: [
            { id: 'pn1', image: 'https://images.unsplash.com/photo-1549996647-190b679b33d7?auto=format&fit=crop&q=80&w=400', title: 'Fresh Croissants', subtitle: 'Du Pain et des Idées', price: '$3.50' },
            { id: 'pn2', image: 'https://images.unsplash.com/photo-1626804561081-377b2207936a?auto=format&fit=crop&q=80&w=400', title: 'Macarons Box', subtitle: 'Ladurée Paris', price: '$18.00' }
        ],
        specialties: [
            { id: 's1', iconUrl: 'https://cdn-icons-png.flaticon.com/512/3014/3014491.png', title: "The Jewish Quarter's Best Pitas", desc: 'The 4th Arrondissement is globally renowned for its heritage-rich falafel and pita spots.' },
            { id: 's2', iconUrl: 'https://cdn-icons-png.flaticon.com/512/924/924514.png', title: 'Historical Café Culture', desc: 'Where Hemingway and Sartre once sat. Experience the intellectual pulse of Paris over a petit noir.' }
        ]
    },
    'Rome': {
        title: 'Roman Flavors',
        location: 'TRASTEVERE',
        hiddenGems: [
            {
                id: 'r1',
                image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=600',
                badge: 'LOCALS ONLY',
                rating: '4.9',
                title: 'Pasta Carbonara',
                price: '€14.00',
                desc: 'Authentic Roman pasta with guanciale and egg.',
                isVeg: false,
            },
            {
                id: 'r2',
                image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600',
                badge: 'TOP RATED',
                rating: '4.8',
                title: 'Pizza Margherita',
                price: '€10.00',
                desc: 'Classic wood-fired neapolitan pizza.',
                isVeg: true,
            }
        ],
        popularNearby: [
            { id: 'rn1', image: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?auto=format&fit=crop&q=80&w=400', title: 'Artisan Gelato', subtitle: 'Giolitti', price: '€4.50' },
            { id: 'rn2', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400', title: 'Tiramisu', subtitle: 'Pompi', price: '€5.00' }
        ],
        specialties: [
            { id: 'sr1', iconUrl: 'https://cdn-icons-png.flaticon.com/512/1404/1404945.png', title: 'Traditional Italian Pizza', desc: 'Experience true Italian heritage with every bite.' },
            { id: 'sr2', iconUrl: 'https://cdn-icons-png.flaticon.com/512/3014/3014521.png', title: 'The Pasta Masters', desc: 'Rome is the undisputed king of Carbonara, Cacio e Pepe, and Amatriciana.' }
        ]
    },
    'Switzerland': {
        title: 'Swiss Flavors',
        location: 'ZURICH OLD TOWN',
        hiddenGems: [
            {
                id: 'sw1',
                image: 'https://images.unsplash.com/photo-1621307335607-f31f92eac438?auto=format&fit=crop&q=80&w=600',
                badge: 'WINTER CLASSIC',
                rating: '4.9',
                title: 'Cheese Fondue Set',
                price: 'CHF 32.00',
                desc: 'Melted gruyere and vacherin with crusty bread.',
                isVeg: true,
            },
            {
                id: 'sw2',
                image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&q=80&w=600',
                badge: 'LOCALS ONLY',
                rating: '4.7',
                title: 'Zürcher Geschnetzeltes',
                price: 'CHF 38.00',
                desc: 'Veal in mushroom cream sauce with crispy rösti.',
                isVeg: false,
            }
        ],
        popularNearby: [
            { id: 'swpn1', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=400', title: 'Swiss Chocolate Box', subtitle: 'Läderach', price: 'CHF 25.00' },
            { id: 'swpn2', image: 'https://images.unsplash.com/photo-1555027552-39c438318b7a?auto=format&fit=crop&q=80&w=400', title: 'Raclette Slice', subtitle: 'Alpine Market', price: 'CHF 12.00' }
        ],
        specialties: [
            { id: 'sws1', iconUrl: 'https://cdn-icons-png.flaticon.com/512/3014/3014502.png', title: 'World Famous Chocolatiers', desc: 'Switzerland produces the finest chocolate in the world.' },
            { id: 'sws2', iconUrl: 'https://cdn-icons-png.flaticon.com/512/918/918234.png', title: 'Alpine Dairy Culture', desc: 'Cheese making is deeply ingrained in Swiss traditions.' }
        ]
    },
    'Dubai': {
        title: 'Emirates Flavors',
        location: 'DOWNTOWN DUBAI',
        hiddenGems: [
            {
                id: 'd1',
                image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600',
                badge: 'LOCALS ONLY',
                rating: '4.9',
                title: 'Authentic Shawarma',
                price: 'AED 25.00',
                desc: 'Slow-roasted chicken in freshly baked Arabic bread.',
                isVeg: false,
            },
            {
                id: 'd2',
                image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600',
                badge: 'MUST TRY',
                rating: '4.8',
                title: 'Hummus & Mezze',
                price: 'AED 45.00',
                desc: 'Creamy hummus with fresh falafel and tabbouleh.',
                isVeg: true,
            }
        ],
        popularNearby: [
            { id: 'dn1', image: 'https://images.unsplash.com/photo-1517409477042-43bb2faaca29?auto=format&fit=crop&q=80&w=400', title: 'Luqaimat', subtitle: 'Emirati Desserts', price: 'AED 15.00' },
            { id: 'dn2', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400', title: 'Karak Chai', subtitle: 'Al Farwaniya', price: 'AED 5.00' }
        ],
        specialties: [
            { id: 'ds1', iconUrl: 'https://cdn-icons-png.flaticon.com/512/3014/3014491.png', title: 'The Heart of the Middle East', desc: 'Dubai blends traditional Emirati cuisine with flavors from across the Arab world.' },
            { id: 'ds2', iconUrl: 'https://cdn-icons-png.flaticon.com/512/924/924514.png', title: 'Gold Leaf Dining', desc: 'Experience unmatched luxury with gold-infused gastronomy.' }
        ]
    }
}

export default function CityFoodScreen({ route, navigation }) {
    const { city = 'Paris' } = route.params || {};
    const data = CITY_DATA[city] || CITY_DATA['Paris'];

    const [activeFilter, setActiveFilter] = useState('All');
    const [vegFilter, setVegFilter] = useState('All'); // 'VEG', 'NON-VEG', 'All'

    // Filter logic
    const displayedGems = data.hiddenGems.filter(item => {
        if (vegFilter === 'VEG' && !item.isVeg) return false;
        if (vegFilter === 'NON-VEG' && item.isVeg) return false;
        return true;
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                {/* Top Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
                        <Ionicons name="chevron-back" size={26} color="#0F172A" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconCircle}>
                        <Feather name="search" size={18} color="#0F172A" />
                    </TouchableOpacity>
                </View>

                {/* Title and Location */}
                <Text style={styles.mainTitle}>{data.title}</Text>
                <View style={styles.locationPill}>
                    <Ionicons name="location" size={12} color="#38BDF8" style={{ marginRight: 4 }} />
                    <Text style={styles.locationText}>{data.location}</Text>
                </View>

                {/* Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll} style={{ marginBottom: 15 }}>
                    {['Breakfast', 'Lunch', 'Dinner'].map(filter => (
                        <TouchableOpacity
                            key={filter}
                            style={[styles.filterBtn, activeFilter === filter ? styles.filterBtnActive : null]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text style={[styles.filterText, activeFilter === filter ? styles.filterTextActive : null]}>{filter}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Veg/Non-Veg Toggles */}
                <View style={styles.dietaryFilterContainer}>
                    <TouchableOpacity
                        style={[styles.dietBtn, vegFilter === 'VEG' ? styles.dietBtnActive : styles.dietBtnInactive]}
                        onPress={() => setVegFilter(vegFilter === 'VEG' ? 'All' : 'VEG')}
                    >
                        <Text style={[styles.dietText, vegFilter === 'VEG' ? styles.dietTextActive : styles.dietTextInactive]}>VEG</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.dietBtn, vegFilter === 'NON-VEG' ? styles.dietBtnActive : styles.dietBtnInactive]}
                        onPress={() => setVegFilter(vegFilter === 'NON-VEG' ? 'All' : 'NON-VEG')}
                    >
                        <Text style={[styles.dietText, vegFilter === 'NON-VEG' ? styles.dietTextActive : styles.dietTextInactive]}>NON-VEG</Text>
                    </TouchableOpacity>
                </View>

                {/* Locals' Hidden Gems Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Locals' Hidden Gems</Text>
                    <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                    {displayedGems.map((gem) => (
                        <TouchableOpacity
                            key={gem.id}
                            style={styles.largeCard}
                            onPress={() => navigation.navigate('FoodDetail', { item: gem })}
                        >
                            <View style={styles.largeCardImageContainer}>
                                <Image source={{ uri: gem.image }} style={styles.largeCardImage} />
                                <View style={styles.badgeTopLeft}>
                                    <Text style={styles.badgeText}>{gem.badge}</Text>
                                </View>
                                <View style={styles.badgeTopRight}>
                                    <Ionicons name="star" size={10} color="#FACC15" style={{ marginRight: 3 }} />
                                    <Text style={styles.ratingText}>{gem.rating}</Text>
                                </View>
                            </View>

                            <View style={styles.largeCardContent}>
                                <View style={styles.largeCardTitleRow}>
                                    <Text style={styles.largeCardTitle}>{gem.title}</Text>
                                    <Text style={styles.largeCardPrice}>{gem.price}</Text>
                                </View>
                                <Text style={styles.largeCardDesc} numberOfLines={1}>{gem.desc}</Text>
                                <View style={styles.quickOrderBtn}>
                                    <Text style={styles.quickOrderBtnText}>Quick Order</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Popular Nearby Section */}
                <Text style={[styles.sectionTitle, { marginTop: 10, marginBottom: 15 }]}>Popular Nearby</Text>
                <View style={styles.popularGrid}>
                    {data.popularNearby.map((item) => (
                        <View key={item.id} style={styles.smallCard}>
                            <Image source={{ uri: item.image }} style={styles.smallCardImage} />
                            <View style={styles.smallCardContent}>
                                <Text style={styles.smallCardTitle}>{item.title}</Text>
                                <Text style={styles.smallCardSub}>{item.subtitle}</Text>
                                <View style={styles.smallCardBottomRow}>
                                    <Text style={styles.smallCardPrice}>{item.price}</Text>
                                    <TouchableOpacity style={styles.addBtn}>
                                        <Feather name="plus" size={14} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Specialties Section */}
                <Text style={[styles.sectionTitle, { marginTop: 20, marginBottom: 15 }]}>Specialties of the Area</Text>
                <View style={styles.specialtiesContainer}>
                    {data.specialties.map((spec) => (
                        <View key={spec.id} style={styles.specialtyCard}>
                            <View style={styles.specialtyIconBox}>
                                <RNImage source={{ uri: spec.iconUrl }} style={styles.specialtyIcon} />
                            </View>
                            <View style={styles.specialtyContent}>
                                <Text style={styles.specialtyTitle}>{spec.title}</Text>
                                <Text style={styles.specialtyDesc}>{spec.desc}</Text>
                            </View>
                        </View>
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
        backgroundColor: '#FAFAF9',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 110, // Avoid bottom nav
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 8,
    },
    locationPill: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    locationText: {
        fontSize: 10,
        color: '#64748B',
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    filterScroll: {
        paddingRight: 20,
    },
    filterBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    filterBtnActive: {
        backgroundColor: '#4AA5FC',
    },
    filterText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748B',
    },
    filterTextActive: {
        color: 'white',
    },
    dietaryFilterContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        borderRadius: 20,
        padding: 4,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    dietBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
    },
    dietBtnActive: {
        backgroundColor: '#4AA5FC',
    },
    dietBtnInactive: {
        backgroundColor: 'transparent',
    },
    dietText: {
        fontSize: 12,
        fontWeight: '800',
    },
    dietTextActive: {
        color: 'white',
    },
    dietTextInactive: {
        color: '#94A3B8',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    seeAllText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#38BDF8',
    },
    horizontalScroll: {
        paddingBottom: 10,
    },

    // Large Card (Hidden Gems)
    largeCard: {
        width: 280,
        backgroundColor: 'white',
        borderRadius: 30,
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 15,
        elevation: 5,
        padding: 10,
    },
    largeCardImageContainer: {
        width: '100%',
        height: 160,
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
    },
    largeCardImage: {
        width: '100%',
        height: '100%',
    },
    badgeTopLeft: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#4AA5FC',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    badgeText: {
        color: 'white',
        fontSize: 9,
        fontWeight: '800',
    },
    badgeTopRight: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: '#0F172A',
        fontSize: 10,
        fontWeight: '800',
    },
    largeCardContent: {
        padding: 15,
    },
    largeCardTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    largeCardTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        flex: 1,
    },
    largeCardPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#38BDF8',
    },
    largeCardDesc: {
        fontSize: 12,
        color: '#94A3B8',
        marginBottom: 15,
    },
    quickOrderBtn: {
        backgroundColor: '#60A5FA',
        borderRadius: 16,
        paddingVertical: 12,
        alignItems: 'center',
    },
    quickOrderBtnText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
    },

    // Small Card (Popular Nearby)
    popularGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    smallCard: {
        width: (width - 55) / 2, // 2 columns with margin
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    smallCardImage: {
        width: '100%',
        height: 120,
        borderRadius: 18,
    },
    smallCardContent: {
        padding: 8,
        marginTop: 4,
    },
    smallCardTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#0F172A',
    },
    smallCardSub: {
        fontSize: 10,
        color: '#94A3B8',
        marginTop: 2,
        marginBottom: 8,
    },
    smallCardBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    smallCardPrice: {
        fontSize: 13,
        fontWeight: '700',
        color: '#38BDF8',
    },
    addBtn: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4AA5FC',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Specialties Card
    specialtiesContainer: {},
    specialtyCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
    },
    specialtyIconBox: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    specialtyIcon: {
        width: 30,
        height: 30,
    },
    specialtyContent: {
        flex: 1,
        marginLeft: 15,
    },
    specialtyTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    specialtyDesc: {
        fontSize: 11,
        color: '#94A3B8',
        lineHeight: 16,
    },
});
