import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions } from 'react-native';
import { ImageBackground } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const TROCADERO_IMG = 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&q=80&w=800';
const RUE_IMG = 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?auto=format&fit=crop&q=80&w=800';
const RIVER_REFLECT_IMG = 'https://images.unsplash.com/photo-1524338198850-8a2ff6322b08?auto=format&fit=crop&q=80&w=800';

export default function PhotoGuideScreen({ navigation }) {
    return (
        <View style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                {/* Header Row */}
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.8}>
                        <Feather name="chevron-left" size={20} color="#0F172A" />
                    </TouchableOpacity>

                    <View style={styles.headerTitles}>
                        <Text style={styles.headerMainText}>Eiffel Tower</Text>
                        <Text style={styles.headerSubText}>PARIS, FRANCE</Text>
                    </View>

                    <View style={styles.goldenHourBadge}>
                        <Ionicons name="sunny" size={10} color="#000000" />
                        <Text style={styles.goldenHourText}>GOLDEN HOUR: 6:42 PM</Text>
                    </View>
                </View>

                {/* Page Title */}
                <View style={styles.pageTitleRow}>
                    <Text style={styles.pageTitle}>Photo Guide</Text>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Feather name="sliders" size={18} color="#0F172A" />
                    </TouchableOpacity>
                </View>

                {/* Card 1: Trocadero */}
                <View style={styles.cardContainer}>
                    <ImageBackground 
                        source={{ uri: TROCADERO_IMG }} 
                        style={styles.cardFrame} 
                        imageStyle={{ borderRadius: 28 }} 
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                        transition={300}
                        contentFit="cover"
                    >
                        <View style={styles.cardOverlay}>
                            {/* Top Tag */}
                            <View style={styles.darkTag}>
                                <Ionicons name="videocam" size={12} color="white" />
                                <Text style={styles.darkTagText}>0.5X WIDE</Text>
                            </View>

                            {/* Bottom Content within Image */}
                            <View style={styles.cardBottomArea}>
                                <Text style={styles.cardTitle}>The Trocadéro Classic</Text>
                                <View style={styles.statsRow}>
                                    <View>
                                        <Text style={styles.statLabel}>BEST TIME</Text>
                                        <Text style={styles.statValue}>Sunrise (6:15 AM)</Text>
                                    </View>
                                    <View style={{ marginLeft: 30 }}>
                                        <Text style={styles.statLabel}>CROWDS</Text>
                                        <View style={styles.crowdBars}>
                                            <View style={[styles.bar, styles.barActive]} />
                                            <View style={styles.bar} />
                                            <View style={styles.bar} />
                                            <View style={styles.bar} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>

                    {/* Floating Guide Box */}
                    <View style={styles.poseGuideContainer}>
                        <View style={styles.poseGuideBox}>
                            <View style={styles.poseIconWrap}>
                                <Ionicons name="body" size={18} color="white" />
                            </View>
                            <View style={styles.poseTexts}>
                                <Text style={styles.poseLabel}>POSE GUIDE</Text>
                                <Text style={styles.poseDesc} numberOfLines={2}>Stand on the ledge. Arch your back slightly & look towards the tower.</Text>
                            </View>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Ionicons name="camera" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Card 2: Rue de l'Universite */}
                <View style={[styles.cardContainer, { marginTop: 10 }]}>
                    <ImageBackground 
                        source={{ uri: RUE_IMG }} 
                        style={styles.cardFrame} 
                        imageStyle={{ borderRadius: 28 }} 
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                        transition={300}
                        contentFit="cover"
                    >
                        <View style={styles.cardOverlay}>
                            <View style={styles.blueTag}>
                                <Text style={styles.blueTagText}>VIRAL SPOT</Text>
                            </View>

                            <View style={styles.cardBottomAreaRow}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.cardTitle}>Rue de l'Université</Text>
                                    <View style={styles.statsRow}>
                                        <View>
                                            <Text style={styles.statLabel}>BEST TIME</Text>
                                            <Text style={styles.statValue}>10 AM - 2 PM</Text>
                                        </View>
                                        <View style={{ marginLeft: 30 }}>
                                            <Text style={styles.statLabel}>CROWDS</Text>
                                            <View style={styles.crowdBars}>
                                                <View style={[styles.bar, styles.barActive]} />
                                                <View style={[styles.bar, styles.barActive]} />
                                                <View style={[styles.bar, styles.barActive]} />
                                                <View style={styles.bar} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Ionicons name="camera" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                {/* Card 3: Seine Reflection */}
                <View style={styles.cardContainer}>
                    <ImageBackground 
                        source={{ uri: RIVER_REFLECT_IMG }} 
                        style={styles.cardFrame} 
                        imageStyle={{ borderRadius: 28 }} 
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                        transition={300}
                        contentFit="cover"
                    >
                        <View style={styles.cardOverlayAlt}>
                            {/* Top Pose Tag */}
                            <View style={styles.poseTopTag}>
                                <Ionicons name="person" size={10} color="#000000" style={{ marginRight: 6 }} />
                                <Text style={styles.poseTopLabel}>POSE GUIDE: <Text style={styles.poseTopDesc}>Sit on the edge, look at the water reflections</Text></Text>
                                <View style={styles.smallActionBtn}>
                                    <Ionicons name="camera" size={10} color="white" />
                                </View>
                            </View>

                            <View style={styles.cardBottomAreaRow}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.cardTitle}>Seine River{'\n'}Reflection</Text>
                                    <View style={styles.statsRow}>
                                        <View>
                                            <Text style={styles.statLabel}>BEST TIME</Text>
                                            <Text style={styles.statValue}>9:00 PM (Twinkle)</Text>
                                        </View>
                                        <View style={{ marginLeft: 30 }}>
                                            <Text style={styles.statLabel}>CROWDS</Text>
                                            <View style={styles.crowdBars}>
                                                <View style={[styles.bar, styles.barActive]} />
                                                <View style={[styles.bar, styles.barActive]} />
                                                <View style={styles.bar} />
                                                <View style={styles.bar} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.actionBtn}>
                                    <Ionicons name="sparkles" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                {/* Ad Card */}
                <View style={styles.adCard}>
                    <MaterialCommunityIcons name="hanger" size={180} color="rgba(255,255,255,0.15)" style={styles.adBgIcon} />
                    <Text style={styles.adTitle}>Need the perfect Parisian outfit?</Text>
                    <Text style={styles.adDesc}>Rent designer berets & trench coats. Delivered to your hotel today.</Text>
                    <TouchableOpacity style={styles.adBtn} activeOpacity={0.9}>
                        <Text style={styles.adBtnText}>BROWSE RENTALS</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    // Header
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 25,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    headerTitles: {
        marginLeft: 15,
        flex: 1,
    },
    headerMainText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
    },
    headerSubText: {
        fontSize: 9,
        fontWeight: '700',
        color: '#64748B',
        letterSpacing: 1,
        marginTop: 2,
    },
    goldenHourBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
    },
    goldenHourText: {
        color: '#000000',
        fontSize: 8,
        fontWeight: '800',
        marginLeft: 4,
        letterSpacing: 0.5,
    },

    // Title
    pageTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    filterBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Cards
    cardContainer: {
        marginBottom: 25,
        position: 'relative',
    },
    cardFrame: {
        width: '100%',
        height: 340,
    },
    cardOverlay: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.15)', // Lighter overlay
        borderRadius: 28,
    },
    cardOverlayAlt: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.3)', // Darker overlay
        borderRadius: 28,
    },

    // Tags
    darkTag: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    darkTagText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '800',
        marginLeft: 6,
        letterSpacing: 0.5,
    },
    blueTag: {
        alignSelf: 'flex-start',
        backgroundColor: '#333333',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    blueTagText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    poseTopTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
    },
    poseTopLabel: {
        color: '#000000',
        fontSize: 9,
        fontWeight: '800',
        flex: 1,
    },
    poseTopDesc: {
        color: 'white',
        fontWeight: '600',
    },
    smallActionBtn: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },

    // Text & Stats
    cardBottomArea: {
        paddingBottom: 20, // Leave room for overlapping box
    },
    cardBottomAreaRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    cardTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 10,
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statLabel: {
        color: '#E2E8F0',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 4,
    },
    statValue: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700',
    },
    crowdBars: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    bar: {
        width: 12,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginRight: 4,
    },
    barActive: {
        backgroundColor: '#333333',
    },
    actionBtn: {
        width: 48,
        height: 48,
        borderRadius: 20,
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },

    // Floating Pose Guide
    poseGuideContainer: {
        position: 'absolute',
        bottom: -20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 20,
        padding: 1,
        overflow: 'hidden',
    },
    poseGuideBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        padding: 12,
        borderRadius: 20,
        backdropFilter: 'blur(20px)',
    },
    poseIconWrap: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    poseTexts: {
        flex: 1,
    },
    poseLabel: {
        color: 'white',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 2,
    },
    poseDesc: {
        color: '#E2E8F0',
        fontSize: 11,
        lineHeight: 16,
    },

    // Ad Card
    adCard: {
        backgroundColor: '#333333',
        borderRadius: 28,
        padding: 24,
        marginTop: 10,
        position: 'relative',
        overflow: 'hidden',
    },
    adBgIcon: {
        position: 'absolute',
        bottom: -40,
        right: -30,
        transform: [{ rotate: '-15deg' }],
    },
    adTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 10,
        width: '80%',
        lineHeight: 28,
    },
    adDesc: {
        color: '#F8FAFC',
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 20,
        width: '75%',
    },
    adBtn: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    adBtnText: {
        color: '#000000',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});
