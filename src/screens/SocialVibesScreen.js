import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    TextInput,
    ScrollView,
    Dimensions,
} from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const EIFFEL_IMG = 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&q=80&w=800';
const MONTMARTRE_IMG = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800';
const MARAIS_IMG = 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&q=80&w=800';
const SEINE_IMG = 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800';
const AVATAR_IMG = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';

export default function SocialVibesScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.mainTitleBlue}>Discover Vibes</Text>
                        <Text style={styles.subTitleBlue}>PARIS, FRANCE</Text>
                    </View>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: AVATAR_IMG }} style={styles.avatar} />
                        <View style={styles.avatarBadge} />
                    </View>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Feather name="search" size={20} color="#38BDF8" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search your mood..."
                        placeholderTextColor="#94A3B8"
                        style={styles.searchInput}
                    />
                    <Feather name="sliders" size={20} color="#38BDF8" style={styles.filterIcon} />
                </View>

                {/* Golden Hour Glow */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Golden Hour Glow</Text>
                    <TouchableOpacity><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>
                </View>

                <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('PhotoGuide')}>
                    <ImageBackground source={{ uri: EIFFEL_IMG }} style={styles.mainCard} imageStyle={{ borderRadius: 28 }} transition={300}>
                        <View style={styles.mainCardOverlay}>
                            <View style={styles.cardPill}>
                                <View style={styles.pillDot} />
                                <Text style={styles.cardPillText}>PEAK GOLDEN HOUR</Text>
                            </View>

                            <View style={styles.mainCardBottom}>
                                <Text style={styles.cardTitle}>Eiffel Tower{'\n'}Trocadéro</Text>
                                <Text style={styles.cardDesc} numberOfLines={2}>Witness the iron lady illuminate as the Parisian sky turns into a canvas of pink an..</Text>

                                <View style={styles.cardStatsRow}>
                                    <View style={styles.statBox}>
                                        <Text style={styles.statLabel}>CROWD DENSITY</Text>
                                        <View style={styles.barsRow}>
                                            <View style={[styles.densityBar, styles.densityBarActive]} />
                                            <View style={[styles.densityBar, styles.densityBarActive]} />
                                            <View style={styles.densityBar} />
                                            <View style={styles.densityBar} />
                                        </View>
                                    </View>

                                    <View style={styles.statBoxRight}>
                                        <Text style={styles.statLabel}>RATING</Text>
                                        <Text style={styles.ratingText}>4.9</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                {/* Hidden Gems */}
                <View style={[styles.sectionHeader, { marginTop: 25 }]}>
                    <Text style={styles.sectionTitle}>Hidden Gems</Text>
                    <TouchableOpacity><Text style={styles.seeAllText}>Explore More</Text></TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                    {/* Item 1 */}
                    <TouchableOpacity activeOpacity={0.9} style={styles.smallCard}>
                        <ImageBackground source={{ uri: MONTMARTRE_IMG }} style={styles.smallCardImage} imageStyle={{ borderRadius: 20 }} transition={300}>
                            <View style={styles.smallCardOverlay}>
                                <View style={styles.heartButton}>
                                    <Feather name="heart" size={16} color="white" />
                                </View>
                                <View style={styles.smallCardBottom}>
                                    <View style={styles.smallPill}>
                                        <Text style={styles.smallPillText}>QUIET VIBE</Text>
                                    </View>
                                    <Text style={styles.smallCardTitle}>Montmartre Backstreets</Text>
                                    <View style={styles.smallRatingRow}>
                                        <Ionicons name="star" size={10} color="#38BDF8" />
                                        <Text style={styles.smallRatingText}>4.7 Vibe Rating</Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    {/* Item 2 */}
                    <TouchableOpacity activeOpacity={0.9} style={styles.smallCard}>
                        <ImageBackground source={{ uri: MARAIS_IMG }} style={styles.smallCardImage} imageStyle={{ borderRadius: 20 }} transition={300}>
                            <View style={styles.smallCardOverlay}>
                                <View style={{ flex: 1 }} />
                                <View style={styles.smallCardBottom}>
                                    <View style={styles.smallPill}>
                                        <Text style={styles.smallPillText}>ARTISTIC</Text>
                                    </View>
                                    <Text style={styles.smallCardTitle}>Le Marais Courts</Text>
                                    <View style={styles.smallRatingRow}>
                                        <Ionicons name="star" size={10} color="#38BDF8" />
                                        <Text style={styles.smallRatingText}>4.8 Vibe Rating</Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </ScrollView>

                {/* Seine River Banks */}
                <View style={[styles.sectionHeader, { marginTop: 25 }]}>
                    <Text style={styles.sectionTitle}>Seine River Banks</Text>
                </View>

                <View style={styles.videoCardCont}>
                    <ImageBackground source={{ uri: SEINE_IMG }} style={styles.videoImg} imageStyle={{ borderRadius: 24 }} transition={300}>
                        <View style={styles.videoOverlay}>
                            <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
                                <Ionicons name="play" size={24} color="white" style={{ marginLeft: 4 }} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    <View style={styles.videoInfoRow}>
                        <Text style={styles.videoTitle}>Seine River Banks</Text>
                        <View style={styles.romanticPill}>
                            <Text style={styles.romanticPillText}>ROMANTIC</Text>
                        </View>
                    </View>
                    <Text style={styles.videoDesc}>Experience the timeless romance of Parisians socialising along the historic riverbanks at dusk.</Text>

                    <View style={styles.videoTagsRow}>
                        <View style={styles.videoTag}>
                            <Ionicons name="people" size={12} color="#0EA5E9" />
                            <Text style={styles.videoTagText}>High Density</Text>
                        </View>
                        <View style={styles.videoTag}>
                            <Ionicons name="flash" size={12} color="#0EA5E9" />
                            <Text style={styles.videoTagText}>9.8 Energy</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

        </SafeAreaView>
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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 20,
    },
    mainTitleBlue: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0EA5E9',
        letterSpacing: -0.5,
    },
    subTitleBlue: {
        fontSize: 10,
        fontWeight: '800',
        color: '#38BDF8',
        letterSpacing: 1.5,
        marginTop: 2,
    },
    avatarContainer: {
        position: 'relative',
        padding: 4,
        backgroundColor: '#E0F2FE',
        borderRadius: 24,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    avatarBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#38BDF8',
        borderWidth: 2,
        borderColor: '#F8FAFC',
    },

    // Search
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 16,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#334155',
        fontWeight: '500',
        padding: 0,
    },
    filterIcon: {
        marginLeft: 10,
    },

    // Sections
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
        fontSize: 12,
        fontWeight: '700',
        color: '#38BDF8',
    },

    // Main Card
    mainCard: {
        width: '100%',
        height: 380,
        justifyContent: 'space-between',
    },
    mainCardOverlay: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 28,
    },
    cardPill: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.25)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backdropFilter: 'blur(10px)', // doesn't work directly in RN but helps doc
    },
    pillDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'white',
        marginRight: 6,
    },
    cardPillText: {
        color: 'white',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    mainCardBottom: {
        width: '100%',
    },
    cardTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: '800',
        lineHeight: 32,
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10,
    },
    cardDesc: {
        color: '#F1F5F9',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 18,
        marginBottom: 20,
        opacity: 0.9,
    },
    cardStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statBox: {
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        borderRadius: 16,
        padding: 12,
        flex: 1,
        marginRight: 10,
    },
    statBoxRight: {
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 80,
    },
    statLabel: {
        color: '#94A3B8',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    barsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    densityBar: {
        height: 4,
        width: '22%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 2,
    },
    densityBarActive: {
        backgroundColor: '#38BDF8',
    },
    ratingText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },

    // Horizontal Scroll
    horizontalScroll: {
        paddingBottom: 5,
    },
    smallCard: {
        width: 180,
        height: 240,
        marginRight: 15,
    },
    smallCardImage: {
        width: '100%',
        height: '100%',
    },
    smallCardOverlay: {
        flex: 1,
        padding: 15,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: 20,
    },
    heartButton: {
        alignSelf: 'flex-end',
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallCardBottom: {
        justifyContent: 'flex-end',
    },
    smallPill: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 6,
    },
    smallPillText: {
        color: 'white',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    smallCardTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: '800',
        marginBottom: 4,
    },
    smallRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallRatingText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '600',
        marginLeft: 4,
    },

    // Video Section
    videoCardCont: {
        backgroundColor: 'white',
        borderRadius: 28,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 15,
        elevation: 3,
        marginBottom: 20,
    },
    videoImg: {
        width: '100%',
        height: 160,
        marginBottom: 15,
    },
    videoOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    videoTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    romanticPill: {
        backgroundColor: '#0EA5E9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    romanticPillText: {
        color: 'white',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    videoDesc: {
        fontSize: 12,
        color: '#64748B',
        lineHeight: 18,
        marginBottom: 15,
    },
    videoTagsRow: {
        flexDirection: 'row',
    },
    videoTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F9FF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        marginRight: 10,
    },
    videoTagText: {
        color: '#0369A1',
        fontSize: 10,
        fontWeight: '700',
        marginLeft: 6,
    },
});
