import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Animated, Share, TextInput } from 'react-native';
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
    const [photos, setPhotos] = useState({
        rentedMain: IMG_DRESS,
        portrait: IMG_PORTRAIT,
        hat: IMG_HAT,
        poster: IMG_POSTER,
    });
    
    const [deletedPhoto, setDeletedPhoto] = useState(null);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const hideTimeout = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [activeDestination, setActiveDestination] = useState('All Travels');
    const [activePose, setActivePose] = useState(null); // default to null to show all

    const photoMetadata = {
        rentedMain: { dest: "Paris '24", pose: 'OOTD', text: 'dress outfit red rented fashion' },
        portrait: { dest: 'Tokyo City', pose: 'Portraits', text: 'portrait person face' },
        hat: { dest: "Paris '24", pose: 'OOTD', text: 'hat accessory outfit' },
        poster: { dest: "Paris '24", pose: 'Landscapes', text: 'landscape eiffel tower paris architecture urbiminal' },
    };

    const isVisible = (key) => {
        if (!photos[key]) return false;

        const meta = photoMetadata[key];
        
        if (activeDestination !== 'All Travels' && meta.dest !== activeDestination) {
            return false;
        }

        if (activePose && meta.pose !== activePose) {
            return false;
        }

        if (searchQuery.trim().length > 0) {
            const query = searchQuery.toLowerCase();
            if (!meta.dest.toLowerCase().includes(query) && 
                !meta.pose.toLowerCase().includes(query) && 
                !meta.text.includes(query)) {
                return false;
            }
        }

        return true;
    };

    const handleDelete = (key, uri) => {
        setDeletedPhoto({ key, uri });
        setPhotos(prev => ({ ...prev, [key]: null }));
        showSnackbar();
    };

    const handleUndo = () => {
        if (deletedPhoto) {
            setPhotos(prev => ({ ...prev, [deletedPhoto.key]: deletedPhoto.uri }));
            setDeletedPhoto(null);
            hideSnackbar();
        }
    };

    const showSnackbar = () => {
        setSnackbarVisible(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        hideTimeout.current = setTimeout(() => {
            hideSnackbar();
        }, 3000); // reduced timeout to a few seconds
    };

    const hideSnackbar = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setSnackbarVisible(false);
            setDeletedPhoto(null);
        });
    };

    useEffect(() => {
        return () => {
            if (hideTimeout.current) clearTimeout(hideTimeout.current);
        };
    }, []);

    const handleShare = async (uri, message = 'Check out this awesome photo from my trip!') => {
        try {
            await Share.share({
                message: message + '\n' + uri, 
                url: uri, // works nicely on iOS
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Header Row */}
                <View style={styles.headerRow}>
                    {!isSearchActive ? (
                        <Text style={styles.headerTitle}>My Gallery</Text>
                    ) : (
                        <View style={styles.searchContainer}>
                            <Feather name="search" size={18} color="#94A3B8" style={{marginRight: 8}} />
                            <TextInput 
                                style={styles.searchInput}
                                placeholder="Search by tag, destination..."
                                placeholderTextColor="#94A3B8"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoFocus
                            />
                            <TouchableOpacity onPress={() => { setIsSearchActive(false); setSearchQuery(''); }}>
                                <Feather name="x" size={18} color="#0F172A" />
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={styles.headerIcons}>
                        {!isSearchActive && (
                            <TouchableOpacity style={styles.iconCircle} onPress={() => setIsSearchActive(true)}>
                                <Feather name="search" size={18} color="#0F172A" />
                            </TouchableOpacity>
                        )}
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
                        <ImageBackground 
                            source={{ uri: REEL_PARIS }} 
                            style={styles.reelImage} 
                            imageStyle={{ borderRadius: 24 }} 
                            placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                            transition={300}
                            contentFit="cover"
                        >
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
                        <ImageBackground 
                            source={{ uri: REEL_TOKYO }} 
                            style={styles.reelImage} 
                            imageStyle={{ borderRadius: 24 }} 
                            placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                            transition={300}
                            contentFit="cover"
                        >
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
                    {['All Travels', "Paris '24", 'Tokyo City'].map(dest => (
                        <TouchableOpacity 
                            key={dest} 
                            style={[styles.filterPill, activeDestination === dest && styles.filterPillActive]}
                            onPress={() => setActiveDestination(dest)}
                        >
                            <Text style={activeDestination === dest ? styles.filterTextActive : styles.filterText}>{dest}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Pose Type Filter */}
                <Text style={styles.filterTitle}>POSE TYPE</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {[
                        { name: 'Portraits', getIcon: (active) => <MaterialCommunityIcons name="face-man-profile" size={16} color={active ? 'white' : '#475569'} style={styles.filterIcon} /> },
                        { name: 'OOTD', getIcon: (active) => <MaterialCommunityIcons name="hanger" size={16} color={active ? 'white' : '#475569'} style={styles.filterIcon} /> },
                        { name: 'Landscapes', getIcon: (active) => <MaterialCommunityIcons name="image-filter-hdr" size={16} color={active ? 'white' : '#475569'} style={styles.filterIcon} /> }
                    ].map(pose => {
                        const isActive = activePose === pose.name;
                        return (
                            <TouchableOpacity 
                                key={pose.name}
                                style={[styles.filterPillWithIcon, isActive && styles.filterPillActive]}
                                onPress={() => setActivePose(isActive ? null : pose.name)}
                            >
                                {pose.getIcon(isActive)}
                                <Text style={isActive ? styles.filterTextActive : styles.filterText}>{pose.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Masonry Grid Simulation */}
                <View style={styles.masonryContainer}>
                    {/* Left Column */}
                    <View style={styles.masonryCol}>

                        {/* Rented Outfit Block */}
                        {isVisible('rentedMain') && (
                            <View style={styles.rentedBlock}>
                                <View style={styles.rentedTopRow}>
                                    <View style={styles.hangerIconBg}>
                                        <MaterialCommunityIcons name="shopping" size={14} color="#475569" />
                                    </View>
                                    <View style={styles.rentedBluePill}>
                                        <Text style={styles.rentedPillText}>RENTED</Text>
                                    </View>
                                </View>

                                <View style={styles.imgContainer}>
                                    <Image 
                                        source={{ uri: photos.rentedMain }} 
                                        style={styles.rentedMainImg} 
                                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                        transition={300}
                                        contentFit="cover"
                                    />
                                    <View style={styles.cardActions}>
                                        <TouchableOpacity style={styles.actionIconBg} onPress={() => handleShare(photos.rentedMain)}>
                                            <Ionicons name="share-social" size={12} color="white" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionIconBg} onPress={() => handleDelete('rentedMain', photos.rentedMain)}>
                                            <Ionicons name="trash" size={12} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.rentedBottomRow}>
                                    <View style={styles.rentedSubBg}>
                                        <Image 
                                            source={{ uri: IMG_BOOTS }} 
                                            style={styles.rentedSubImg} 
                                            placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                            transition={300}
                                            contentFit="cover"
                                        />
                                    </View>
                                    <View style={styles.rentedSubBg}>
                                        <Image 
                                            source={{ uri: IMG_BAG }} 
                                            style={styles.rentedSubImg} 
                                            placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                            transition={300}
                                            contentFit="cover"
                                        />
                                    </View>
                                </View>
                            </View>
                        )}

                        {isVisible('portrait') && (
                            <View style={styles.imgContainer}>
                                <Image 
                                    source={{ uri: photos.portrait }} 
                                    style={styles.portraitImg} 
                                    placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                    transition={300}
                                    contentFit="cover"
                                />
                                <View style={[styles.cardActions, { top: 10, right: 10 }]}>
                                    <TouchableOpacity style={styles.actionIconBgDim} onPress={() => handleShare(photos.portrait)}>
                                        <Ionicons name="share-social" size={14} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.actionIconBgDim} onPress={() => handleDelete('portrait', photos.portrait)}>
                                        <Ionicons name="trash" size={14} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        {isVisible('hat') && (
                            <View style={styles.hatBgBlock}>
                                <View style={[styles.cardActions, { top: 10, right: 10, zIndex: 10 }]}>
                                    <TouchableOpacity style={styles.actionIconBgLight} onPress={() => handleShare(photos.hat)}>
                                        <Ionicons name="share-social" size={14} color="#475569" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.actionIconBgLight} onPress={() => handleDelete('hat', photos.hat)}>
                                        <Ionicons name="trash" size={14} color="#EF4444" />
                                    </TouchableOpacity>
                                </View>
                                <Image 
                                    source={{ uri: photos.hat }} 
                                    style={styles.hatImg} 
                                    placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                    transition={300}
                                    contentFit="contain"
                                />
                            </View>
                        )}

                    </View>

                    {/* Right Column */}
                    <View style={styles.masonryCol}>

                        {/* Poster Block */}
                        {isVisible('poster') && (
                            <ImageBackground 
                                source={{ uri: photos.poster }} 
                                style={styles.posterBg} 
                                imageStyle={{ borderRadius: 24 }}
                                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                transition={300}
                                contentFit="cover"
                            >
                                <View style={styles.posterOverlay}>
                                    {/* Top Icons */}
                                    <View style={[styles.cardActions, { width: '100%', justifyContent: 'space-between' }]}>
                                        <TouchableOpacity style={styles.shareIconBg} onPress={() => handleShare(photos.poster)}>
                                            <Ionicons name="share-social" size={14} color="white" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.shareIconBg, { backgroundColor: 'rgba(239, 68, 68, 0.6)' }]} onPress={() => handleDelete('poster', photos.poster)}>
                                            <Ionicons name="trash" size={14} color="white" />
                                        </TouchableOpacity>
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
                        )}

                    </View>
                </View>

            </ScrollView>

            {/* Snackbar */}
            {snackbarVisible && (
                <Animated.View style={[styles.snackbar, { opacity: fadeAnim }]}>
                    <Text style={styles.snackText}>Photo deleted</Text>
                    <TouchableOpacity onPress={handleUndo} style={styles.undoBtn}>
                        <Text style={styles.undoText}>Undo</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}

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
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
        paddingHorizontal: 15,
        height: 40,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: '#0F172A',
        padding: 0,
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
    imgContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    cardActions: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
    },
    actionIconBg: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },
    actionIconBgDim: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    actionIconBgLight: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
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
    },
    snackbar: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: '#1E293B',
        borderRadius: 12,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
    },
    snackText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    undoBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 8,
    },
    undoText: {
        color: '#60A5FA',
        fontSize: 13,
        fontWeight: '800',
    }
});
