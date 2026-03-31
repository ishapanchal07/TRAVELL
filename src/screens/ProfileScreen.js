import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons, FontAwesome5, Octicons } from '@expo/vector-icons';
import AnalyticsService from '../services/AnalyticsService';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const AVATAR_URL = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200';

export default function ProfileScreen({ navigation }) {
    const { userData } = useUser();
    const { isDarkMode, colors } = useTheme();
    const [stats, setStats] = React.useState({
        countries: 12, // Initially 12
        outfits: 45, // Initially 45
        photos: 120 // Initially 120
    });

    useFocusEffect(
        React.useCallback(() => {
            AnalyticsService.logEvent('profile_view');
            // Simulate fetching dynamic counts based on journeys/gallery
            // Since we can't reliably read state from other screens without a global store, 
            // we will simulate the connection logic here.
            
            // In a real app we'd query the database or global state:
            // const journeyCount = globalState.journeys.length;
            // const newCountriesCount = new Set(globalState.journeys.map(j => j.country)).size;
            // const newPhotosCount = globalState.galleryPhotos.length;
            // const newOutfitsCount = globalState.journeys.reduce((acc, j) => acc + j.outfits, 0);
            
            // We can assume a user with no journeys has 0 outfits.
            // For now, let's keep the mock numbers or adjust them based on local storage if we had it.
            // If the user has 0 journeys, outfits would be 0.
            
            // setStats({ countries: newCountriesCount, outfits: newOutfitsCount, photos: newPhotosCount });
        }, [])
    );

    return (
        <View style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <StatusBar style={isDarkMode ? "light" : "dark"} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.headerIconBtn, isDarkMode && { backgroundColor: colors.card }]}>
                    <Feather name="chevron-left" size={20} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>PROFILE</Text>
                <TouchableOpacity 
                    style={[styles.headerIconBtn, isDarkMode && { backgroundColor: colors.card }]} 
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Ionicons name="settings-sharp" size={20} color={colors.text} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Avatar Section */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarRing}>
                        <Image 
                            source={{ uri: userData.profileImage || AVATAR_URL }} 
                            style={styles.avatarImage} 
                            placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                            transition={300}
                        />
                    </View>
                    <View style={styles.badgeContainer}>
                        <Octicons name="check-circle-fill" size={10} color="white" />
                        <Text style={styles.badgeText}>SILVER NOMAD</Text>
                    </View>
                </View>

                {/* Name */}
                <Text style={[styles.userName, { color: colors.text }]}>{userData.name || 'Chloe Roams'}</Text>

                {/* Stats Card */}
                <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
                    <View style={styles.statCol}>
                        <Text style={[styles.statValue, { color: colors.text }]}>{stats.countries}</Text>
                        <Text style={styles.statLabel}>COUNTRIES</Text>
                    </View>
                    <View style={[styles.statDivider, { backgroundColor: colors.divider }]} />
                    <View style={styles.statCol}>
                        <Text style={[styles.statValue, { color: colors.text }]}>{stats.outfits}</Text>
                        <Text style={styles.statLabel}>OUTFITS</Text>
                    </View>
                    <View style={[styles.statDivider, { backgroundColor: colors.divider }]} />
                    <View style={styles.statCol}>
                        <Text style={[styles.statValue, { color: colors.text }]}>{stats.photos}</Text>
                        <Text style={styles.statLabel}>PHOTOS</Text>
                    </View>
                </View>

                {/* Menu List */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]} activeOpacity={0.7} onPress={() => navigation.navigate('Journeys')}>
                        <View style={[styles.menuIconContainer, { backgroundColor: colors.background }]}>
                            <Ionicons name="map" size={20} color={colors.text} />
                        </View>
                        <Text style={[styles.menuText, { color: colors.text }]}>My Journeys</Text>
                        <Feather name="chevron-right" size={18} color={colors.border} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]} activeOpacity={0.7} onPress={() => navigation.navigate('Wardrobe')}>
                        <View style={[styles.menuIconContainer, { backgroundColor: colors.background }]}>
                            <MaterialCommunityIcons name="hanger" size={22} color={colors.text} />
                        </View>
                        <Text style={[styles.menuText, { color: colors.text }]}>My Wardrobe</Text>
                        <Feather name="chevron-right" size={18} color={colors.border} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]} activeOpacity={0.7} onPress={() => navigation.navigate('Gallery')}>
                        <View style={[styles.menuIconContainer, { backgroundColor: colors.background }]}>
                            <Ionicons name="images" size={20} color={colors.text} />
                        </View>
                        <Text style={[styles.menuText, { color: colors.text }]}>My Photos</Text>
                        <Feather name="chevron-right" size={18} color={colors.border} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.menuItem, { backgroundColor: colors.card }]}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Transactions')}
                    >
                        <View style={[styles.menuIconContainer, { backgroundColor: colors.background }]}>
                            <Ionicons name="receipt-outline" size={20} color={colors.text} />
                        </View>
                        <Text style={[styles.menuText, { color: colors.text }]}>My Transactions</Text>
                        <Feather name="chevron-right" size={18} color={colors.border} />
                    </TouchableOpacity>
                </View>



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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    headerIconBtn: {
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
    headerTitle: {
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 1,
        color: '#0F172A',
    },
    scrollContent: {
        paddingBottom: 40,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        position: 'relative',
        marginTop: 10,
    },
    avatarRing: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        position: 'absolute',
        bottom: -10,
        borderWidth: 2,
        borderColor: '#FAFAF9',
    },
    badgeText: {
        color: 'white',
        fontSize: 9,
        fontWeight: '800',
        marginLeft: 4,
        letterSpacing: 0.5,
    },
    userName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0F172A',
        marginTop: 25,
        marginBottom: 20,
    },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 24,
        paddingVertical: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
        marginBottom: 20,
    },
    statCol: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000000',
    },
    statLabel: {
        fontSize: 10,
        color: '#94A3B8',
        fontWeight: '600',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#F1F5F9',
    },
    menuContainer: {
        width: '100%',
        marginBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 5,
        elevation: 1,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
    },
    ecoCard: {
        width: '100%',
        backgroundColor: '#000000',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    ecoHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    ecoSubtitle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    ecoScore: {
        color: 'white',
        fontSize: 54,
        fontWeight: '800',
        letterSpacing: -2,
        marginTop: -5,
    },
    leafCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ecoLevelsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    ecoStatusTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
    },
    ecoNextLevel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        fontWeight: '700',
    },
    progressTrack: {
        width: '100%',
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 3,
        marginBottom: 15,
    },
    progressFill: {
        width: '80%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 3,
    },
    ecoDescText: {
        color: 'white',
        fontSize: 13,
        lineHeight: 20,
        opacity: 0.9,
    }
});
