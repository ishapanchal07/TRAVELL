import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView, Dimensions } from 'react-native';
import { ImageBackground } from 'expo-image';
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const PARIS_IMG = 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&auto=format&fit=crop';
const ROME_IMG = 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600&auto=format&fit=crop';
const ITALY_IMG = 'https://images.unsplash.com/photo-1515542622106-78b28af7815b?auto=format&fit=crop&q=80&w=600';
const SWISS_IMG = 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=600';
const USER_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';

export default function ExploreScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f9fafc" />
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >

                {/* Top Header Row */}
                <View style={styles.topHeaderFlex}>
                    <View>
                        <Text style={styles.brandTitle}>Roamster</Text>
                        <Text style={styles.brandSubtitle}>Pack light, live loud.</Text>
                    </View>
                    <TouchableOpacity style={styles.profileCircle}>
                        <FontAwesome5 name="user-alt" size={18} color="#2563EB" />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchBarContainer}>
                    <Feather name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Where's your next photo op?"
                        placeholderTextColor="#94A3B8"
                    />
                </View>

                {/* Trending Section */}
                <Text style={styles.sectionTitle}>Trending Hotspots</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScroll}
                >
                    {/* Card 1: Switzerland */}
                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Switzerland')} style={styles.destinationCard}>
                        <ImageBackground source={{ uri: SWISS_IMG }} style={styles.cardImage} imageStyle={{ borderRadius: 24 }} transition={300}>
                            <View style={styles.cardOverlay}>
                                <View style={{ flex: 1 }} />
                                <View style={styles.cardBottomText}>
                                    <Text style={styles.cardCity}>Swiss Alps</Text>
                                    <Text style={styles.cardStats}>1.1k roamsters active</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* Card 2: Paris */}
                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Paris')} style={styles.destinationCard}>
                        <ImageBackground source={{ uri: PARIS_IMG }} style={styles.cardImage} imageStyle={{ borderRadius: 24 }} transition={300}>
                            <View style={styles.cardOverlay}>
                                <View style={styles.pillContainer}>
                                    <Text style={styles.pillText}>INFLUENCER PICK</Text>
                                </View>
                                <View style={styles.cardBottomText}>
                                    <Text style={styles.cardCity}>Paris</Text>
                                    <Text style={styles.cardStats}>1.2k roamsters active</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* Card 3: Rome */}
                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Rome')} style={styles.destinationCard}>
                        <ImageBackground source={{ uri: ROME_IMG }} style={styles.cardImage} imageStyle={{ borderRadius: 24 }} transition={300}>
                            <View style={styles.cardOverlay}>
                                <View style={{ flex: 1 }} />
                                <View style={styles.cardBottomText}>
                                    <Text style={styles.cardCity}>Rome</Text>
                                    <Text style={styles.cardStats}>850 roamsters active</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* Card 4: Italy (Amalfi) */}
                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Italy')} style={styles.destinationCard}>
                        <ImageBackground source={{ uri: ITALY_IMG }} style={styles.cardImage} imageStyle={{ borderRadius: 24 }} transition={300}>
                            <View style={styles.cardOverlay}>
                                <View style={{ flex: 1 }} />
                                <View style={styles.cardBottomText}>
                                    <Text style={styles.cardCity}>Amalfi Coast</Text>
                                    <Text style={styles.cardStats}>950 roamsters active</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                </ScrollView>

                {/* Action Banner */}
                <View style={styles.bannerContainer}>
                    <View style={styles.bannerTextContent}>
                        <Text style={styles.bannerTitle}>Zero luggage,</Text>
                        <Text style={styles.bannerTitle}>total style.</Text>
                        <Text style={styles.bannerDesc}>Rent curated outfits based on your destination's vibe.</Text>

                        <TouchableOpacity style={styles.bannerButton} activeOpacity={0.8}>
                            <Text style={styles.bannerButtonText}>Start Style Quiz</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bannerIconBox}>
                        <MaterialCommunityIcons name="hanger" size={80} color="rgba(255,255,255,0.7)" style={{ transform: [{ rotate: '15deg' }] }} />
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
    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 120, // Extra space for floating nav
    },
    // Header
    topHeaderFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    brandTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    brandSubtitle: {
        fontSize: 16,
        color: '#000000',
        marginTop: 4,
        fontWeight: '500',
    },
    profileCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Search
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 24,
        paddingHorizontal: 15,
        height: 52,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#1E293B',
    },

    // Trending Section
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#000000',
        marginBottom: 15,
    },
    horizontalScroll: {
        paddingBottom: 10,
    },
    destinationCard: {
        width: width * 0.6,
        height: 320,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: 24,
        backgroundColor: '#FFF',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)', // Light tint
        borderRadius: 24,
        padding: 15,
        justifyContent: 'space-between',
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
    cardBottomText: {
        marginTop: 'auto',
    },
    cardCity: {
        color: 'white',
        fontSize: 28,
        fontWeight: '800',
    },
    cardStats: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 4,
    },

    // Banner
    bannerContainer: {
        marginTop: 30,
        backgroundColor: '#3B82F6', // Vibrant Blue
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
        fontSize: 14,
        marginTop: 10,
        marginBottom: 20,
        lineHeight: 20,
        paddingRight: 20,
    },
    bannerButton: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
    },
    bannerButtonText: {
        color: '#2563EB',
        fontWeight: '800',
        fontSize: 14,
    },
    bannerIconBox: {
        position: 'absolute',
        right: -10,
        bottom: -15,
        marginBottom: 4,
    },
    navText: {
        fontSize: 9,
        fontWeight: '700',
        color: '#94A3B8',
        marginTop: 4,
    },
    activeNavText: {
        color: '#2563EB',
        marginTop: 0,
    },
});
