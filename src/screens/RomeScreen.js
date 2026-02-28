import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { Image, ImageBackground as ExpoImageBackground } from 'expo-image';
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const ROME_MAIN = 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop';
const EXP_1 = 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=400&auto=format&fit=crop';
const EXP_2 = 'https://images.unsplash.com/photo-1600100411132-8419616e25dc?q=80&w=400&auto=format&fit=crop';
const RENT_1 = 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=400&auto=format&fit=crop';
const RENT_2 = 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=400&auto=format&fit=crop';
const FOOD_1 = 'https://images.unsplash.com/photo-1621996311239-50abf8fb6c08?q=80&w=400&auto=format&fit=crop';
const PHOTO_1 = 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?q=80&w=400&auto=format&fit=crop';
const PHOTO_2 = 'https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=400&auto=format&fit=crop';

export default function RomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Top White Header */}
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.logoRow}>
                    <Ionicons name="compass" size={24} color="#3B82F6" />
                    <Text style={styles.logoText}>Roamster</Text>
                </TouchableOpacity>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconCircle}>
                        <FontAwesome5 name="map-marked-alt" size={14} color="#3B82F6" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconCircle}>
                        <Feather name="search" size={16} color="#3B82F6" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                {/* Hero Section */}
                <ImageBackground source={{ uri: ROME_MAIN }} style={styles.heroImage}>
                    <View style={styles.heroOverlay}>
                        <View style={styles.weatherPill}>
                            <Ionicons name="sunny" size={16} color="white" />
                            <View style={styles.weatherTextCont}>
                                <Text style={styles.weatherCity}>Rome Today</Text>
                                <Text style={styles.weatherTemp}>22°C, Sunny</Text>
                            </View>
                        </View>

                        <View style={styles.heroBottom}>
                            <View style={styles.trendingPill}>
                                <Text style={styles.trendingText}>TRENDING DESTINATION</Text>
                            </View>
                            <Text style={styles.heroTitle}>Rome:</Text>
                            <Text style={styles.heroSubtitle}>The Eternal City</Text>
                            <Text style={styles.heroDesc}>Step into history and savor authentic Italian culture.</Text>
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
                                <Text style={styles.expTitle}>Vatican <Text style={{ fontWeight: '800' }}>Museums</Text></Text>
                                <Text style={styles.expSub}>4 hours • Art & History</Text>
                            </View>
                        </View>
                        <View style={styles.expCard}>
                            <Image source={{ uri: EXP_2 }} style={styles.expImage} />
                            <View style={styles.expTextCont}>
                                <Text style={styles.expTitle}>Trevi <Text style={{ fontWeight: '800' }}>Fountain Walk</Text></Text>
                                <Text style={styles.expSub}>2 hours • Culture</Text>
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
                            <View style={styles.outfitColorIndicator} />
                            <View style={styles.outfitBotRow}>
                                <View>
                                    <Text style={styles.outfitTitle}>Roman Holiday</Text>
                                    <Text style={styles.outfitPrice}>€40/day</Text>
                                </View>
                                <TouchableOpacity style={styles.rentBtn}>
                                    <Text style={styles.rentBtnText}>RENT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.outfitCard}>
                            <Image source={{ uri: RENT_2 }} style={styles.outfitImage} />
                            <View style={[styles.outfitColorIndicator, { backgroundColor: '#FDE68A' }]} />
                            <View style={styles.outfitBotRow}>
                                <View>
                                    <Text style={styles.outfitTitle}>Trastevere Casual</Text>
                                    <Text style={styles.outfitPrice}>€35/day</Text>
                                </View>
                                <TouchableOpacity style={styles.rentBtn}>
                                    <Text style={styles.rentBtnText}>RENT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Trending Food */}
                    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Trending Food</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                        <View style={styles.foodCard}>
                            <Image source={{ uri: FOOD_1 }} style={styles.foodImage} />
                            <View style={styles.foodTextCont}>
                                <Text style={styles.foodTitle}>Authentic Carbonara</Text>
                                <Text style={styles.foodSub}>Roscioli • 30m wait</Text>
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
                            <Text style={styles.photoTitle}>Pantheon Square</Text>
                        </View>
                        <View style={styles.photoSpotCard}>
                            <Image source={{ uri: PHOTO_2 }} style={styles.photoImage} />
                            <View style={styles.pinOverlay}>
                                <Ionicons name="map" size={12} color="white" />
                            </View>
                            <Text style={styles.photoTitle}>Piazza Navona</Text>
                        </View>
                    </ScrollView>

                    {/* Banner */}
                    <View style={styles.bannerContainer}>
                        <View style={styles.bannerTextContent}>
                            <Text style={styles.bannerTitle}>Experience Rome's</Text>
                            <Text style={styles.bannerTitle}>Best Secrets</Text>
                            <Text style={styles.bannerDesc}>Exclusive influencer guides & priority outfit delivery.</Text>
                            <TouchableOpacity style={styles.bannerButton} activeOpacity={0.8}>
                                <Text style={styles.bannerButtonText}>GO PREMIUM €9.99</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bannerIconBox}>
                            <FontAwesome5 name="star" size={120} color="rgba(255,255,255,0.2)" solid />
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
    logoText: {
        color: '#3B82F6',
        fontSize: 18,
        fontWeight: '800',
        marginLeft: 6,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#EFF6FF',
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
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    weatherTextCont: {
        marginLeft: 6,
    },
    weatherCity: {
        color: 'white',
        fontSize: 9,
        fontWeight: '500',
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
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    heroTitle: {
        color: 'white',
        fontSize: 32,
        fontWeight: '900',
    },
    heroSubtitle: {
        color: '#60A5FA',
        fontSize: 32,
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
        backgroundColor: '#3B82F6',
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
        marginBottom: 20,
    },
    bannerTextContent: {
        flex: 1,
        zIndex: 2,
    },
    bannerTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    bannerDesc: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 13,
        marginTop: 8,
        marginBottom: 16,
        lineHeight: 18,
        paddingRight: 20,
    },
    bannerButton: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    bannerButtonText: {
        color: '#2563EB',
        fontWeight: '800',
        fontSize: 12,
    },
    bannerIconBox: {
        position: 'absolute',
        right: -30,
        bottom: -20,
        zIndex: 1,
    }
});
