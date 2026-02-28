import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const USER_AVATAR = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200';
const REEL_PARIS = 'https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=400';
const REEL_TOKYO = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400';
const IMG_DRESS = 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300';
const IMG_BOOTS = 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=300';
const IMG_BAG = 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=300';
const IMG_PORTRAIT = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300';
const IMG_HAT = 'https://images.unsplash.com/photo-1521369909029-2afed882228c?q=80&w=300';
const IMG_POSTER = 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=400';

export default function GalleryScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Header Row */}
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>My Gallery</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.iconCircle}>
                            <Feather name="search" size={18} color="#0F172A" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.avatarCircle} onPress={() => navigation.navigate('Profile')}>
                            <Image source={{ uri: USER_AVATAR }} style={styles.avatarImage} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Featured Reels Heder */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Featured Reels</Text>
                    <View style={styles.autoGenPill}>
                        <Text style={styles.autoGenText}>AUTO-GENERATED</Text>
                    </View>
                </View>

                {/* Reels Scroll */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.reelsScroll}>
                    <TouchableOpacity style={styles.reelCard} activeOpacity={0.9}>
                        <ImageBackground source={{ uri: REEL_PARIS }} style={styles.reelImage} imageStyle={{ borderRadius: 24 }} transition={300}>
                            <View style={styles.reelOverlay}>
                                <View style={styles.playBtnWrap}>
                                    <Ionicons name="play" size={16} color="white" style={{ marginLeft: 2 }} />
                                </View>
                                <View style={styles.reelBottomText}>
                                    <Text style={styles.reelTitle}>Paris Vibes</Text>
                                    <Text style={styles.reelStats}>12 Photos • 0:15</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.reelCard} activeOpacity={0.9}>
                        <ImageBackground source={{ uri: REEL_TOKYO }} style={styles.reelImage} imageStyle={{ borderRadius: 24 }} transition={300}>
                            <View style={styles.reelOverlay}>
                                <View style={styles.playBtnWrap}>
                                    <Ionicons name="play" size={16} color="white" style={{ marginLeft: 2 }} />
                                </View>
                                <View style={styles.reelBottomText}>
                                    <Text style={styles.reelTitle}>Tokyo Dreams</Text>
                                    <Text style={styles.reelStats}>8 Photos • 0:10</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </ScrollView>

                {/* Destinations Filter */}
                <Text style={styles.filterTitle}>DESTINATIONS</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    <TouchableOpacity style={[styles.filterPill, styles.filterPillActive]}>
                        <Text style={styles.filterTextActive}>All Travels</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterPill}>
                        <Text style={styles.filterText}>Paris '24</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterPill}>
                        <Text style={styles.filterText}>Tokyo City</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Pose Type Filter */}
                <Text style={styles.filterTitle}>POSE TYPE</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    <TouchableOpacity style={styles.filterPillWithIcon}>
                        <MaterialCommunityIcons name="face-man-profile" size={16} color="#475569" style={styles.filterIcon} />
                        <Text style={styles.filterText}>Portraits</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.filterPillWithIcon, styles.filterPillActive]}>
                        <Ionicons name="checkmark-circle" size={16} color="white" style={styles.filterIcon} />
                        <Text style={styles.filterTextActive}>OOTD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterPillWithIcon}>
                        <MaterialCommunityIcons name="image-filter-hdr" size={16} color="#475569" style={styles.filterIcon} />
                        <Text style={styles.filterText}>Landscapes</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Masonry Grid Simulation */}
                <View style={styles.masonryContainer}>
                    {/* Left Column */}
                    <View style={styles.masonryCol}>

                        {/* Rented Outfit Block */}
                        <View style={styles.rentedBlock}>
                            <View style={styles.rentedTopRow}>
                                <View style={styles.hangerIconBg}>
                                    <MaterialCommunityIcons name="shopping" size={14} color="#475569" />
                                </View>
                                <View style={styles.rentedBluePill}>
                                    <Text style={styles.rentedPillText}>RENTED</Text>
                                </View>
                            </View>

                            <Image source={{ uri: IMG_DRESS }} style={styles.rentedMainImg} />

                            <View style={styles.rentedBottomRow}>
                                <View style={styles.rentedSubBg}>
                                    <Image source={{ uri: IMG_BOOTS }} style={styles.rentedSubImg} />
                                </View>
                                <View style={styles.rentedSubBg}>
                                    <Image source={{ uri: IMG_BAG }} style={styles.rentedSubImg} />
                                </View>
                            </View>
                        </View>

                        <Image source={{ uri: IMG_PORTRAIT }} style={styles.portraitImg} />

                        <View style={styles.hatBgBlock}>
                            <Image source={{ uri: IMG_HAT }} style={styles.hatImg} />
                        </View>

                    </View>

                    {/* Right Column */}
                    <View style={styles.masonryCol}>

                        {/* Poster Block */}
                        <ImageBackground source={{ uri: IMG_POSTER }} style={styles.posterBg} imageStyle={{ borderRadius: 24 }}>
                            <View style={styles.posterOverlay}>
                                {/* Top Share Icon */}
                                <View style={styles.shareIconBg}>
                                    <Ionicons name="share-social" size={14} color="white" />
                                </View>

                                {/* Center Text */}
                                <View style={styles.posterCenterText}>
                                    <Text style={styles.posterSub}>URBIMINAL</Text>
                                    <Text style={styles.posterTitle}>PARIS</Text>
                                    <Text style={styles.posterTitle}>WORK</Text>
                                </View>

                                <View style={styles.posterBottomArea}>
                                    <View style={styles.aiPill}>
                                        <Text style={styles.aiText}>AI ENHANCED</Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FCFCFC',
    },
    scrollContent: {
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F1F5F9', // light grey instead of white shadow here to match design
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#FDE68A',
        backgroundColor: '#FDE68A',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    autoGenPill: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    autoGenText: {
        color: '#3B82F6',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    reelsScroll: {
        paddingBottom: 25,
    },
    reelCard: {
        width: 220,
        height: 300,
        borderRadius: 24,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    reelImage: {
        width: '100%',
        height: '100%',
    },
    reelOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 24,
        padding: 16,
        justifyContent: 'space-between',
    },
    playBtnWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.4)',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    reelBottomText: {
        justifyContent: 'flex-end',
    },
    reelTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    reelStats: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 11,
        fontWeight: '600',
        marginTop: 4,
    },
    filterTitle: {
        fontSize: 10,
        color: '#94A3B8',
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 10,
        marginTop: 5,
    },
    filterScroll: {
        paddingBottom: 25,
    },
    filterPill: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginRight: 10,
    },
    filterPillWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginRight: 10,
    },
    filterPillActive: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    filterText: {
        color: '#475569',
        fontSize: 13,
        fontWeight: '600',
    },
    filterTextActive: {
        color: 'white',
        fontSize: 13,
        fontWeight: '700',
    },
    filterIcon: {
        marginRight: 6,
    },
    masonryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    masonryCol: {
        width: '48%',
    },
    // Rented Outfit
    rentedBlock: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    rentedTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    hangerIconBg: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rentedBluePill: {
        backgroundColor: '#60A5FA',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    rentedPillText: {
        color: 'white',
        fontSize: 8,
        fontWeight: '900',
    },
    rentedMainImg: {
        width: '100%',
        height: 120,
        borderRadius: 16,
        marginBottom: 10,
    },
    rentedBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rentedSubBg: {
        width: '48%',
        aspectRatio: 1,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    rentedSubImg: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    portraitImg: {
        width: '100%',
        height: 200,
        borderRadius: 24,
        marginBottom: 15,
    },
    hatBgBlock: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 15,
        width: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 15,
    },
    hatImg: {
        width: '90%',
        height: '90%',
    },
    posterBg: {
        width: '100%',
        height: 400,
        borderRadius: 24,
        marginBottom: 15,
    },
    posterOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 24,
        padding: 16,
        justifyContent: 'space-between',
    },
    shareIconBg: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    posterCenterText: {
        alignItems: 'center',
    },
    posterSub: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 2,
        marginBottom: 8,
    },
    posterTitle: {
        color: 'white',
        fontSize: 32,
        fontWeight: '300',
        letterSpacing: 1,
    },
    posterBottomArea: {
        alignItems: 'center',
        marginBottom: 10,
    },
    aiPill: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    aiText: {
        color: 'white',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.5,
    }
});
