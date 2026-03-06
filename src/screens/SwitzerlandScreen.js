import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const SWISS_MAIN = 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800';
const EXP_1 = 'https://images.unsplash.com/photo-1548625361-ec8536eb3553?q=80&w=400&auto=format&fit=crop';
const EXP_2 = 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=400&auto=format&fit=crop';
const RENT_1 = 'https://images.unsplash.com/photo-1572804013309-8c98e2ac0dc8?q=80&w=400&auto=format&fit=crop';
const RENT_2 = 'https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=400&auto=format&fit=crop';
const FOOD_1 = 'https://images.unsplash.com/photo-1621307335607-f31f92eac438?q=80&w=400&auto=format&fit=crop';
const PHOTO_1 = 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=400&auto=format&fit=crop';
const PHOTO_2 = 'https://images.unsplash.com/photo-1558981420-8ceaa10ac250?q=80&w=400&auto=format&fit=crop';

export default function SwitzerlandScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Top White Header */}
            <View style={styles.topHeader}>
                <View style={styles.logoRow}>
                    <View style={styles.logoIconCircle}>
                        <Ionicons name="compass" size={16} color="white" />
                    </View>
                    <Text style={styles.logoText}>Roamster</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Map', { city: 'Switzerland' })}>
                        <Ionicons name="map-outline" size={18} color="#0EA5E9" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconCircle}>
                        <Feather name="search" size={18} color="#0EA5E9" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                {/* Hero Section */}
                <ImageBackground source={{ uri: SWISS_MAIN }} style={styles.heroImage}>
                    <View style={styles.heroOverlay}>
                        <View style={styles.weatherPill}>
                            <Ionicons name="snow" size={14} color="white" />
                            <View style={styles.weatherTextCont}>
                                <Text style={styles.weatherCity}>Zürich Today</Text>
                                <Text style={styles.weatherTemp}>-2°C, Snowy</Text>
                            </View>
                        </View>

                        <View style={styles.heroBottom}>
                            <View style={styles.trendingPill}>
                                <Text style={styles.trendingText}>TRENDING DESTINATION</Text>
                            </View>
                            <Text style={styles.heroTitle}>Switzerland:</Text>
                            <Text style={styles.heroSubtitle}>Alpine Paradise</Text>
                            <Text style={styles.heroDesc}>Discover dramatic peaks, pristine lakes, and world-class chocolates in the heart of Europe.</Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.contentPadding}>

                    {/* Experience Plan */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Experience Plan</Text>
                        <TouchableOpacity><Text style={styles.viewAllText}>View all</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                        <View style={styles.expCard}>
                            <Image source={{ uri: EXP_1 }} style={styles.expImage} />
                            <View style={styles.expTextCont}>
                                <Text style={styles.expTitle}>Jungfraujoch <Text style={{ fontWeight: '800' }}>Train</Text></Text>
                                <Text style={styles.expSub}>4 hours • Scenic Journey</Text>
                            </View>
                        </View>
                        <View style={styles.expCard}>
                            <Image source={{ uri: EXP_2 }} style={styles.expImage} />
                            <View style={styles.expTextCont}>
                                <Text style={styles.expTitle}>Matterhorn <Text style={{ fontWeight: '800' }}>Hike</Text></Text>
                                <Text style={styles.expSub}>5 hours • Nature Trails</Text>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Rent Your Look */}
                    <View style={[styles.sectionHeader, { marginTop: 20 }]}>
                        <Text style={styles.sectionTitle}>Rent Your Look</Text>
                        <View style={styles.luggagePill}>
                            <Text style={styles.luggageText}>LUGGAGE-LESS</Text>
                        </View>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                        <View style={styles.outfitCard}>
                            <Image source={{ uri: RENT_1 }} style={styles.outfitImage} />
                            <View style={[styles.outfitColorIndicator, { backgroundColor: '#38BDF8' }]} />
                            <View style={styles.outfitBotRow}>
                                <View>
                                    <Text style={styles.outfitTitle}>Alpine Edge</Text>
                                    <Text style={styles.outfitPrice}>CHF 60/day</Text>
                                </View>
                                <TouchableOpacity style={styles.rentBtn}>
                                    <Text style={styles.rentBtnText}>RENT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.outfitCard}>
                            <Image source={{ uri: RENT_2 }} style={styles.outfitImage} />
                            <View style={[styles.outfitColorIndicator, { backgroundColor: '#94A3B8' }]} />
                            <View style={styles.outfitBotRow}>
                                <View>
                                    <Text style={styles.outfitTitle}>Cozy Chalet</Text>
                                    <Text style={styles.outfitPrice}>CHF 45/day</Text>
                                </View>
                                <TouchableOpacity style={styles.rentBtn}>
                                    <Text style={styles.rentBtnText}>RENT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Trending Food */}
                    <View style={[styles.sectionHeader, { marginTop: 20 }]}>
                        <Text style={styles.sectionTitle}>Trending Food</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('CityFood', { city: 'Switzerland' })}><Text style={styles.viewAllText}>View all</Text></TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                        <View style={styles.foodCard}>
                            <Image source={{ uri: FOOD_1 }} style={styles.foodImage} />
                            <View style={styles.foodTextCont}>
                                <Text style={styles.foodTitle}>Traditional Cheese Fondue</Text>
                                <Text style={styles.foodSub}>Le Dézaley • 20m wait</Text>
                                <View style={styles.starsRow}>
                                    <Ionicons name="star" size={12} color="#FACC15" />
                                    <Ionicons name="star" size={12} color="#FACC15" />
                                    <Ionicons name="star" size={12} color="#FACC15" />
                                    <Ionicons name="star" size={12} color="#FACC15" />
                                    <Ionicons name="star" size={12} color="#FACC15" />
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Photo Spots */}
                    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Photo Spots</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                        <View style={styles.photoSpotCard}>
                            <Image source={{ uri: PHOTO_1 }} style={styles.photoImage} />
                            <View style={styles.pinOverlay}>
                                <Ionicons name="map" size={12} color="white" />
                            </View>
                            <Text style={styles.photoTitle}>Lake Geneva View</Text>
                        </View>
                        <View style={styles.photoSpotCard}>
                            <Image source={{ uri: PHOTO_2 }} style={styles.photoImage} />
                            <View style={styles.pinOverlay}>
                                <Ionicons name="map" size={12} color="white" />
                            </View>
                            <Text style={styles.photoTitle}>Zermatt Village</Text>
                        </View>
                    </ScrollView>

                    {/* Banner */}
                    <View style={styles.bannerContainer}>
                        <View style={styles.bannerTextContent}>
                            <Text style={styles.bannerTitle}>Conquer The</Text>
                            <Text style={styles.bannerTitle}>Swiss Alps</Text>
                            <Text style={styles.bannerDesc}>Exclusive trail maps &{'\n'}gear rental discounts.</Text>
                            <TouchableOpacity style={styles.bannerButton} activeOpacity={0.8}>
                                <Text style={styles.bannerButtonText}>GO PREMIUM CHF 12</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bannerIconBox}>
                            <Ionicons name="star" size={180} color="rgba(255,255,255,0.2)" />
                        </View>
                    </View>

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
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 12,
        zIndex: 10,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIconCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: '#3B82F6',
        fontSize: 20,
        fontWeight: '800',
        marginLeft: 8,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F0F9FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    scrollContainer: {
        paddingBottom: 100,
    },
    heroImage: {
        width: '100%',
        height: 350,
    },
    heroOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 20,
        justifyContent: 'space-between',
    },
    weatherPill: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    weatherTextCont: {
        marginLeft: 6,
    },
    weatherCity: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 9,
        fontWeight: '600',
    },
    weatherTemp: {
        color: 'white',
        fontSize: 11,
        fontWeight: '700',
    },
    heroBottom: {
        marginBottom: 20,
    },
    trendingPill: {
        backgroundColor: '#38BDF8',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        marginBottom: 10,
    },
    trendingText: {
        color: 'white',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    heroTitle: {
        color: 'white',
        fontSize: 34,
        fontWeight: '900',
    },
    heroSubtitle: {
        color: '#60A5FA',
        fontSize: 34,
        fontWeight: '900',
        marginTop: -5,
        marginBottom: 8,
    },
    heroDesc: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        width: '80%',
    },
    contentPadding: {
        paddingHorizontal: 20,
        paddingTop: 20,
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
    viewAllText: {
        color: '#3B82F6',
        fontSize: 13,
        fontWeight: '600',
    },
    horizontalScroll: {
        paddingBottom: 5,
    },
    expCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: 200,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    expImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    expTextCont: {
        padding: 12,
    },
    expTitle: {
        fontSize: 14,
        color: '#0F172A',
        fontWeight: '500',
    },
    expSub: {
        fontSize: 11,
        color: '#64748B',
        marginTop: 4,
    },
    luggagePill: {
        backgroundColor: '#E0F2FE',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    luggageText: {
        color: '#0EA5E9',
        fontSize: 10,
        fontWeight: '800',
    },
    outfitCard: {
        width: 160,
        backgroundColor: 'white',
        borderRadius: 20,
        marginRight: 15,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    outfitImage: {
        width: '100%',
        height: 180,
        borderRadius: 16,
    },
    outfitColorIndicator: {
        position: 'absolute',
        top: 15,
        right: 15,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#E2E8F0',
        borderWidth: 2,
        borderColor: 'white',
    },
    outfitBotRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 10,
        paddingHorizontal: 4,
        paddingBottom: 4,
    },
    outfitTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0F172A',
    },
    outfitPrice: {
        fontSize: 11,
        color: '#3B82F6',
        fontWeight: '600',
        marginTop: 2,
    },
    rentBtn: {
        backgroundColor: '#38BDF8',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    rentBtnText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '800',
    },
    foodCard: {
        flexDirection: 'row',
        backgroundColor: '#F0F9FF',
        borderRadius: 16,
        padding: 10,
        width: 260,
        marginRight: 15,
        alignItems: 'center',
    },
    foodImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
    },
    foodTextCont: {
        marginLeft: 12,
        flex: 1,
    },
    foodTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    foodSub: {
        fontSize: 11,
        color: '#64748B',
        marginTop: 2,
        marginBottom: 4,
    },
    starsRow: {
        flexDirection: 'row',
    },
    photoSpotCard: {
        width: 150,
        marginRight: 15,
        alignItems: 'center',
    },
    photoImage: {
        width: '100%',
        height: 110,
        borderRadius: 16,
    },
    pinOverlay: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoTitle: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: '600',
        color: '#0F172A',
        textAlign: 'center',
    },
    bannerContainer: {
        marginTop: 30,
        backgroundColor: '#38BDF8',
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 20,
    },
    bannerTextContent: {
        flex: 1,
        zIndex: 2,
    },
    bannerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    bannerDesc: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
        marginTop: 10,
        marginBottom: 20,
        lineHeight: 18,
        paddingRight: 10,
    },
    bannerButton: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    bannerButtonText: {
        color: '#38BDF8',
        fontWeight: '800',
        fontSize: 12,
    },
    bannerIconBox: {
        position: 'absolute',
        right: -40,
        bottom: -30,
        zIndex: 1,
    },
});
