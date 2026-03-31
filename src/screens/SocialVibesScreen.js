import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView, Dimensions } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ShareService from '../services/ShareService';
import { useAuth } from '../context/AuthContext';
import { useSaved } from '../context/SavedContext';

const { width } = Dimensions.get('window');

const EIFFEL_IMG = 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=1200';
const PARIS_STREET_IMG = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800';
const GEM1_IMG = 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800';
const GEM2_IMG = 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=800';
const CREMIEUX_IMG = 'https://images.unsplash.com/photo-1554101869-77e237303f88?auto=format&fit=crop&q=80&w=800';
const PALAIS_ROYAL_IMG = 'https://images.unsplash.com/photo-1549144365-51fb80ee2c21?auto=format&fit=crop&q=80&w=800';
const AVATAR_IMG = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';

const GEMS = [
    { id: 'g1', title: 'Montmartre Backstreets', image: PARIS_STREET_IMG, rating: '4.7', vibe: 'QUIET VIBE' },
    { id: 'g2', title: 'Hidden Gems 1', image: GEM1_IMG, rating: '4.8', vibe: 'ARTISTIC' },
    { id: 'g3', title: 'Hidden Gems 2', image: GEM2_IMG, rating: '4.9', vibe: 'LOCAL' },
    { id: 'g4', title: 'Rue Crémieux', image: CREMIEUX_IMG, rating: '4.8', vibe: 'COLORFUL' },
    { id: 'g5', title: 'Palais Royal Columns', image: PALAIS_ROYAL_IMG, rating: '4.9', vibe: 'MINIMAL' }
];

export default function SocialVibesScreen({ navigation }) {
    const { isLoggedIn } = useAuth();
    const { toggleSaveGem, isGemSaved } = useSaved();

    const displayGems = isLoggedIn ? GEMS : GEMS.slice(0, 2);

    const handleShare = async (item) => {
        await ShareService.shareItem({
            title: item.title,
            description: item.desc || item.vibe,
            image: item.image || item.img
        });
    };

    const handleExploreMore = () => {
        if (!isLoggedIn) {
            navigation.navigate('Login');
        } else {
            navigation.navigate('AllPlaces', {
                title: 'Hidden Gems',
                items: GEMS.map(g => ({ ...g, img: g.image, sub: g.vibe }))
            });
        }
    };
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
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Feather name="search" size={20} color="#000000" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search your mood..."
                        placeholderTextColor="#94A3B8"
                        style={styles.searchInput}
                        onSubmitEditing={() => {
                            import('react-native').then(({ Alert }) => {
                                Alert.alert("Search", "Searching for vibes...");
                            });
                        }}
                    />
                    <Feather name="sliders" size={20} color="#000000" style={styles.filterIcon} />
                </View>

                {/* Golden Hour Glow */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Golden Hour Glow</Text>
                </View>

                <TouchableOpacity 
                    activeOpacity={0.9} 
                    onPress={() => navigation.navigate('ExperienceDetail', { 
                        item: {
                            id: 'golden-hour-eiffel',
                            title: 'Eiffel Tower Trocadéro',
                            sub: 'PEAK GOLDEN HOUR',
                            img: EIFFEL_IMG,
                            duration: '2-3 HRS',
                            fee: '€25/pp',
                            bestTime: 'EVENING',
                            crowd: 'High',
                            desc: 'Witness the iron lady illuminate as the Parisian sky turns into a canvas of pink and gold. This is the ultimate photo opportunity in Paris.'
                        }
                    })}
                >
                    <ImageBackground
                        source={{ uri: EIFFEL_IMG }}
                        style={styles.mainCard}
                        imageStyle={{ borderRadius: 28 }}
                        transition={300}
                        contentFit="cover"
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                    >
                        <View style={styles.mainCardOverlay}>
                            <View style={styles.cardHeaderActions}>
                                <View style={styles.cardPill}>
                                    <View style={styles.pillDot} />
                                    <Text style={styles.cardPillText}>PEAK GOLDEN HOUR</Text>
                                </View>
                                <View style={styles.topRightActions}>
                                    <TouchableOpacity 
                                        style={styles.actionCircle} 
                                        onPress={() => handleShare({
                                            title: 'Eiffel Tower Trocadéro',
                                            desc: 'Witness the iron lady illuminate as the Parisian sky turns into a canvas of pink and gold.',
                                            img: EIFFEL_IMG
                                        })}
                                    >
                                        <Feather name="share-2" size={16} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={styles.actionCircle}
                                        onPress={() => toggleSaveGem({ id: 'golden-hour-eiffel', title: 'Eiffel Tower Trocadéro', img: EIFFEL_IMG })}
                                    >
                                        <Ionicons 
                                            name={isGemSaved('golden-hour-eiffel') ? "heart" : "heart-outline"} 
                                            size={18} 
                                            color={isGemSaved('golden-hour-eiffel') ? "#EF4444" : "white"} 
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.mainCardBottom}>
                                <View style={styles.smartInfoRow}>
                                    <View style={styles.infoBadge}>
                                        <Feather name="clock" size={10} color="white" />
                                        <Text style={styles.infoBadgeText}>2-3 HRS</Text>
                                    </View>
                                    <View style={styles.infoBadge}>
                                        <Feather name="layers" size={10} color="white" />
                                        <Text style={styles.infoBadgeText}>€25/pp</Text>
                                    </View>
                                    <View style={styles.infoBadge}>
                                        <Feather name="sun" size={10} color="white" />
                                        <Text style={styles.infoBadgeText}>EVENING</Text>
                                    </View>
                                </View>
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
                    <TouchableOpacity onPress={handleExploreMore}>
                        <Text style={styles.seeAllText}>Explore More</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                    {displayGems.map((gem) => (
                        <TouchableOpacity 
                            key={gem.id} 
                            activeOpacity={0.9} 
                            style={styles.smallCard}
                            onPress={() => navigation.navigate('FoodDetail', { item: gem })}
                        >
                            <ImageBackground
                                source={{ uri: gem.image }}
                                style={styles.smallCardImage}
                                imageStyle={{ borderRadius: 20 }}
                                transition={300}
                                contentFit="cover"
                                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                            >
                                <View style={styles.smallCardOverlay}>
                                    <TouchableOpacity 
                                        style={styles.heartButton}
                                        onPress={() => toggleSaveGem(gem)}
                                        activeOpacity={0.8}
                                    >
                                        {isGemSaved(gem.id) ? (
                                            <Ionicons name="heart" size={16} color="#EF4444" />
                                        ) : (
                                            <Feather name="heart" size={16} color="white" />
                                        )}
                                    </TouchableOpacity>
                                    <View style={styles.smallCardBottom}>
                                        <View style={styles.smallPill}>
                                            <Text style={styles.smallPillText}>{gem.vibe}</Text>
                                        </View>
                                        <Text style={styles.smallCardTitle}>{gem.title}</Text>
                                        <View style={styles.smallRatingRow}>
                                            <Ionicons name="star" size={10} color="#000000" />
                                            <Text style={styles.smallRatingText}>{gem.rating} Vibe Rating</Text>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Seine River Banks */}
                <View style={[styles.sectionHeader, { marginTop: 25 }]}>
                    <Text style={styles.sectionTitle}>Seine River Banks</Text>
                </View>

                <View style={styles.videoCardCont}>
                    <TouchableOpacity 
                        activeOpacity={0.9} 
                        style={styles.videoImg}
                        onPress={() => {
                            import('react-native').then(({ Alert }) => {
                                Alert.alert("Video", "Playing 360° vibe summary...");
                            });
                        }}
                    >
                        <ImageBackground
                            source={{ uri: GEM1_IMG }}
                            style={StyleSheet.absoluteFill}
                            imageStyle={{ borderRadius: 24 }}
                            contentFit="cover"
                            placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                            transition={300}
                        >
                            <View style={styles.videoOverlay}>
                                <View style={styles.playButton}>
                                    <Ionicons name="play" size={24} color="white" style={{ marginLeft: 4 }} />
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={styles.videoInfoRow}>
                        <Text style={styles.videoTitle}>Seine River Banks</Text>
                        <View style={styles.romanticPill}>
                            <Text style={styles.romanticPillText}>ROMANTIC</Text>
                        </View>
                    </View>
                    <Text style={styles.videoDesc}>Experience the timeless romance of Parisians socialising along the historic riverbanks at dusk.</Text>

                    <View style={styles.videoTagsRow}>
                        <View style={styles.videoTag}>
                            <Ionicons name="people" size={12} color="#000000" />
                            <Text style={styles.videoTagText}>High Density</Text>
                        </View>
                        <View style={styles.videoTag}>
                            <Ionicons name="flash" size={12} color="#000000" />
                            <Text style={styles.videoTagText}>9.8 Energy</Text>
                        </View>
                    </View>
                </View>

                {/* Recommended for You */}
                <View style={[styles.sectionHeader, { marginTop: 25 }]}>
                    <Text style={styles.sectionTitle}>Recommended for You</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RecommendedList', { 
                        items: [
                            { id: 'rec1', title: 'Palais Royal', sub: 'History • 1h', img: PALAIS_ROYAL_IMG, duration: '1h', fee: 'Free', bestTime: 'Morning', crowd: 'Low' },
                            { id: 'rec2', title: 'Le Marais Walk', sub: 'Culture • 2h', img: PARIS_STREET_IMG, duration: '2h', fee: 'Free', bestTime: 'Afternoon', crowd: 'Medium' }
                        ] 
                    })}>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                    <TouchableOpacity 
                        style={styles.recommendedCard}
                        onPress={() => navigation.navigate('ExperienceDetail', { 
                            item: { id: 'rec1', title: 'Palais Royal', sub: 'History', img: PALAIS_ROYAL_IMG, duration: '1h', fee: 'Free', bestTime: 'Morning', crowd: 'Low' } 
                        })}
                    >
                        <Image source={{ uri: PALAIS_ROYAL_IMG }} style={styles.recImage} />
                        <View style={styles.recInfo}>
                            <Text style={styles.recTitle}>Palais Royal</Text>
                            <Text style={styles.recSub}>History • 1h</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.recommendedCard}
                        onPress={() => navigation.navigate('ExperienceDetail', { 
                            item: { id: 'rec2', title: 'Le Marais Walk', sub: 'Culture', img: PARIS_STREET_IMG, duration: '2h', fee: 'Free', bestTime: 'Afternoon', crowd: 'Medium' } 
                        })}
                    >
                        <Image source={{ uri: PARIS_STREET_IMG }} style={styles.recImage} />
                        <View style={styles.recInfo}>
                            <Text style={styles.recTitle}>Le Marais Walk</Text>
                            <Text style={styles.recSub}>Culture • 2h</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>


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
        color: '#000000',
        letterSpacing: -0.5,
    },
    subTitleBlue: {
        fontSize: 10,
        fontWeight: '800',
        color: '#000000',
        letterSpacing: 1.5,
        marginTop: 2,
    },
    avatarContainer: {
        position: 'relative',
        padding: 4,
        backgroundColor: '#F1F5F9',
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
        backgroundColor: '#000000',
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
        color: '#000000',
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
        backgroundColor: '#000000',
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
        borderRadius: 24,
        overflow: 'hidden',
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
        backgroundColor: '#000000',
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
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        marginRight: 10,
    },
    videoTagText: {
        color: '#000000',
        fontSize: 10,
        fontWeight: '700',
        marginLeft: 6,
    },
    cardHeaderActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topRightActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
    },
    smartInfoRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    infoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        gap: 5,
    },
    infoBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '800',
    },
    statusLabel: {
        color: '#10B981',
        fontSize: 9,
        fontWeight: '900',
        marginTop: 4,
    },
    bookNowBtn: {
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    bookNowText: {
        color: '#000000',
        fontWeight: '900',
        fontSize: 14,
    },
    recommendedCard: {
        width: 220,
        backgroundColor: 'white',
        borderRadius: 24,
        marginRight: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    recImage: {
        width: '100%',
        height: 120,
    },
    recInfo: {
        padding: 15,
    },
    recTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#0F172A',
    },
    recSub: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 4,
    },
    nearbyGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
    },
    nearbyItem: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    nearbyImg: {
        width: '100%',
        height: 100,
        borderRadius: 18,
        marginBottom: 10,
    },
    nearbyTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#0F172A',
    },
    nearbyDist: {
        fontSize: 11,
        color: '#64748B',
        marginTop: 2,
    },
});
