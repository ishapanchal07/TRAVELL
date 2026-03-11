import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

const PARIS_NIGHT = 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=800&auto=format&fit=crop';
const SEOUL_IMG = 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=400';
const BALI_IMG = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400';
const USER_AVATAR = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200';
const SMALL_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50';

export default function JourneysScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('current');
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Header Row */}
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.headerTitle}>My Journeys</Text>
                        <Text style={styles.headerSubtitle}>Collecting memories worldwide</Text>
                    </View>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.iconCircle}>
                            <Ionicons name="notifications-outline" size={18} color="#0F172A" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.avatarCircle} onPress={() => navigation.navigate('Profile')}>
                            <Image 
                                source={{ uri: USER_AVATAR }} 
                                style={styles.avatarImage} 
                                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                transition={300}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity 
                        style={activeTab === 'current' ? styles.tabActive : styles.tabInactive}
                        onPress={() => setActiveTab('current')}
                        activeOpacity={0.8}
                    >
                        <Text style={activeTab === 'current' ? styles.tabTextActive : styles.tabTextInactive}>Current</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={activeTab === 'past' ? styles.tabActive : styles.tabInactive}
                        onPress={() => setActiveTab('past')}
                        activeOpacity={0.8}
                    >
                        <Text style={activeTab === 'past' ? styles.tabTextActive : styles.tabTextInactive}>Past</Text>
                    </TouchableOpacity>
                </View>

                {/* Hero Card */}
                {activeTab === 'current' && (
                <View style={styles.heroCardContainer}>
                    <ImageBackground 
                        source={{ uri: PARIS_NIGHT }} 
                        style={styles.heroBackground} 
                        imageStyle={{ borderRadius: 32 }} 
                        transition={300} 
                        contentFit="cover"
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                    >
                        <View style={styles.heroOverlay}>

                            <View>
                                <View style={styles.happeningPill}>
                                    <Text style={styles.happeningText}>HAPPENING NOW</Text>
                                </View>
                                <View style={styles.dateRow}>
                                    <Ionicons name="calendar-outline" size={14} color="white" />
                                    <Text style={styles.dateText}>OCT 12 – OCT 18</Text>
                                </View>
                                <Text style={styles.cityTitle}>Paris, France</Text>
                            </View>

                            <View>
                                <View style={styles.outfitDeliveryBox}>
                                    <View style={styles.hangerCircle}>
                                        <MaterialCommunityIcons name="hanger" size={20} color="white" />
                                    </View>
                                    <View style={styles.outfitTextBox}>
                                        <View style={styles.outfitTopRow}>
                                            <Text style={styles.outfitLabel}>OUTFIT DELIVERY</Text>
                                            <Octicons name="check-circle-fill" size={10} color="#34D399" style={{ marginLeft: 4 }} />
                                        </View>
                                        <Text style={styles.outfitValue}>3 sets at Hotel Ritz</Text>
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.itineraryButton} activeOpacity={0.9}>
                                    <Ionicons name="map" size={18} color="white" />
                                    <Text style={styles.itineraryBtnText}>View Today's Itinerary</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ImageBackground>
                </View>
                )}

                {/* Past Adventures Header */}
                {activeTab === 'past' && (
                <>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Past Adventures</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>

                {/* Past Adventure List */}
                <TouchableOpacity style={styles.pastCard} activeOpacity={0.8}>
                    <Image 
                        source={{ uri: SEOUL_IMG }} 
                        style={styles.pastCardImage} 
                        contentFit="cover"
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                        transition={300}
                    />
                    <View style={styles.pastCardContent}>
                        <Text style={styles.pastCardTitle}>Seoul, South Korea</Text>
                        <Text style={styles.pastCardDate}>May 15 – May 22, 2023</Text>
                        <View style={styles.memoriesRow}>
                            <View style={styles.miniAvatarWrap}>
                                <Image 
                                    source={{ uri: SMALL_AVATAR }} 
                                    style={styles.miniAvatar} 
                                    placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                    transition={300}
                                />
                            </View>
                            <View style={styles.plusWrap}>
                                <Text style={styles.plusText}>+2</Text>
                            </View>
                            <Text style={styles.memoriesText}>124 MEMORIES</Text>
                        </View>
                    </View>
                    <Feather name="chevron-right" size={20} color="#CBD5E1" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.pastCard} activeOpacity={0.8}>
                    <Image 
                        source={{ uri: BALI_IMG }} 
                        style={styles.pastCardImage} 
                        contentFit="cover"
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                        transition={300}
                    />
                    <View style={styles.pastCardContent}>
                        <Text style={styles.pastCardTitle}>Bali, Indonesia</Text>
                        <Text style={styles.pastCardDate}>Jan 02 – Jan 14, 2023</Text>
                        <View style={styles.memoriesRow}>
                            <View style={styles.miniAvatarWrap}>
                                <Image 
                                    source={{ uri: SMALL_AVATAR }} 
                                    style={styles.miniAvatar} 
                                    placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                    transition={300}
                                />
                            </View>
                            <Text style={styles.memoriesText}>86 MEMORIES</Text>
                        </View>
                    </View>
                    <Feather name="chevron-right" size={20} color="#CBD5E1" />
                </TouchableOpacity>
                </>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAF9',
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
    headerSubtitle: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2,
        fontWeight: '500',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
    avatarCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#3B82F6',
        backgroundColor: '#FDE68A', // Yellowish base
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderRadius: 16,
        padding: 4,
        marginBottom: 25,
    },
    tabActive: {
        flex: 1,
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
    },
    tabInactive: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
    },
    tabTextActive: {
        color: 'white',
        fontWeight: '700',
        fontSize: 14,
    },
    tabTextInactive: {
        color: '#64748B',
        fontWeight: '600',
        fontSize: 14,
    },
    heroCardContainer: {
        width: '100%',
        height: 480,
        borderRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 30,
    },
    heroBackground: {
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 32,
        padding: 24,
        justifyContent: 'space-between',
    },
    happeningPill: {
        backgroundColor: '#3B82F6',
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 15,
    },
    happeningText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    dateText: {
        color: 'white',
        fontSize: 11,
        fontWeight: '700',
        marginLeft: 6,
        letterSpacing: 0.5,
    },
    cityTitle: {
        color: 'white',
        fontSize: 36,
        fontWeight: '900',
        letterSpacing: -1,
    },
    outfitDeliveryBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 24,
        padding: 16,
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    hangerCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outfitTextBox: {
        marginLeft: 15,
        justifyContent: 'center',
    },
    outfitTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    outfitLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 4,
    },
    outfitValue: {
        color: 'white',
        fontSize: 15,
        fontWeight: '800',
    },
    itineraryButton: {
        flexDirection: 'row',
        backgroundColor: '#3B82F6',
        borderRadius: 16,
        paddingVertical: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itineraryBtnText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '800',
        marginLeft: 8,
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
        color: '#3B82F6',
        fontSize: 12,
        fontWeight: '700',
    },
    pastCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 12,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    pastCardImage: {
        width: 70,
        height: 70,
        borderRadius: 16,
    },
    pastCardContent: {
        flex: 1,
        marginLeft: 15,
    },
    pastCardTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#0F172A',
    },
    pastCardDate: {
        fontSize: 11,
        fontWeight: '600',
        color: '#64748B',
        marginTop: 4,
        marginBottom: 10,
    },
    memoriesRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    miniAvatarWrap: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: 'white',
        overflow: 'hidden',
    },
    miniAvatar: {
        width: '100%',
        height: '100%',
    },
    plusWrap: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'white',
        marginLeft: -6,
    },
    plusText: {
        fontSize: 8,
        fontWeight: '800',
        color: '#0F172A',
    },
    memoriesText: {
        fontSize: 9,
        fontWeight: '800',
        color: '#94A3B8',
        marginLeft: 8,
        letterSpacing: 0.5,
    }
});
