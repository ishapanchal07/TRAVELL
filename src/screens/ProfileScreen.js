import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons, FontAwesome5, Octicons } from '@expo/vector-icons';

const AVATAR_URL = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200';

export default function ProfileScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>PROFILE</Text>
                <TouchableOpacity style={styles.headerIconBtn}>
                    <Ionicons name="settings-sharp" size={20} color="#0F172A" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Avatar Section */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarRing}>
                        <Image source={{ uri: AVATAR_URL }} style={styles.avatarImage} />
                    </View>
                    <View style={styles.badgeContainer}>
                        <Octicons name="check-circle-fill" size={10} color="white" />
                        <Text style={styles.badgeText}>SILVER NOMAD</Text>
                    </View>
                </View>

                {/* Name */}
                <Text style={styles.userName}>Chloe Roams</Text>

                {/* Stats Card */}
                <View style={styles.statsCard}>
                    <View style={styles.statCol}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>COUNTRIES</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statCol}>
                        <Text style={styles.statValue}>45</Text>
                        <Text style={styles.statLabel}>OUTFITS</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statCol}>
                        <Text style={styles.statValue}>120</Text>
                        <Text style={styles.statLabel}>PHOTOS</Text>
                    </View>
                </View>

                {/* Menu List */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => navigation.navigate('Journeys')}>
                        <View style={styles.menuIconContainer}>
                            <Ionicons name="map" size={20} color="#3B82F6" />
                        </View>
                        <Text style={styles.menuText}>My Journeys</Text>
                        <Feather name="chevron-right" size={18} color="#CBD5E1" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => navigation.navigate('Wardrobe')}>
                        <View style={styles.menuIconContainer}>
                            <MaterialCommunityIcons name="hanger" size={22} color="#3B82F6" />
                        </View>
                        <Text style={styles.menuText}>My Wardrobe</Text>
                        <Feather name="chevron-right" size={18} color="#CBD5E1" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={() => navigation.navigate('Gallery')}>
                        <View style={styles.menuIconContainer}>
                            <Ionicons name="images" size={20} color="#3B82F6" />
                        </View>
                        <Text style={styles.menuText}>My Photos</Text>
                        <Feather name="chevron-right" size={18} color="#CBD5E1" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('SocialVibes')}
                    >
                        <View style={styles.menuIconContainer}>
                            <Ionicons name="people" size={20} color="#3B82F6" />
                        </View>
                        <Text style={styles.menuText}>My Social</Text>
                        <Feather name="chevron-right" size={18} color="#CBD5E1" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Transactions')}
                    >
                        <View style={styles.menuIconContainer}>
                            <Ionicons name="receipt-outline" size={20} color="#3B82F6" />
                        </View>
                        <Text style={styles.menuText}>My Transactions</Text>
                        <Feather name="chevron-right" size={18} color="#CBD5E1" />
                    </TouchableOpacity>
                </View>

                {/* Eco Card */}
                <View style={styles.ecoCard}>
                    <View style={styles.ecoHeaderRow}>
                        <View>
                            <Text style={styles.ecoSubtitle}>SUSTAINABILITY SCORE</Text>
                            <Text style={styles.ecoScore}>92</Text>
                        </View>
                        <View style={styles.leafCircle}>
                            <Ionicons name="leaf" size={20} color="white" />
                        </View>
                    </View>

                    <View style={styles.ecoLevelsRow}>
                        <Text style={styles.ecoStatusTitle}>Eco Warrior Status</Text>
                        <Text style={styles.ecoNextLevel}>NEXT LEVEL: 100</Text>
                    </View>

                    <View style={styles.progressTrack}>
                        <View style={styles.progressFill} />
                    </View>

                    <Text style={styles.ecoDescText}>
                        You've saved 42kg of carbon by renting outfits instead of buying new this month. Keep it up!
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
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
        borderColor: '#3B82F6',
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
        backgroundColor: '#3B82F6',
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
        color: '#3B82F6',
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
        backgroundColor: '#EFF6FF',
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
        backgroundColor: '#4B8DF8',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#3B82F6',
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
