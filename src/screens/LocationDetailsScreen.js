import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView, Dimensions } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const BG_IMG = 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800';
const AVATAR_IMG = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
const DRESS_IMG = 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400';

export default function LocationDetailsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            <ImageBackground
                source={{ uri: BG_IMG }}
                style={styles.bgImage}
                blurRadius={10}
                contentFit="cover"
                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                transition={300}
            >
                <View style={styles.safeArea}>

                    {/* Top Search & Profile */}
                    <View style={styles.topRow}>
                        <View style={styles.searchBox}>
                            <Feather name="search" size={20} color="#94A3B8" />
                            <TextInput
                                placeholder="Where to, Roamster?"
                                placeholderTextColor="#94A3B8"
                                style={styles.searchInput}
                            />
                        </View>
                        <TouchableOpacity style={styles.avatarWrap}>
                            <Image 
                                source={{ uri: AVATAR_IMG }} 
                                style={styles.avatar} 
                                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                transition={300}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Filter Pills */}
                    <View style={styles.pillsRow}>
                        <TouchableOpacity style={styles.pillActive}>
                            <Ionicons name="camera" size={16} color="white" />
                            <Text style={styles.pillActiveText}>Aesthetic</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.pillInactive}>
                            <MaterialCommunityIcons name="silverware-fork-knife" size={16} color="#000000" />
                            <Text style={styles.pillInactiveText}>Trending Food</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Bottom White Card */}
                    <View style={styles.bottomCard}>
                        {/* Drag Handle */}
                        <View style={styles.dragHandle} />

                        <View style={styles.cardHeaderRow}>
                            <Text style={styles.cardTitle}>Le Marais Bistro</Text>
                            <View style={styles.liveBadge}>
                                <Text style={styles.liveBadgeText}>LIVE:{'\n'}OPEN</Text>
                            </View>
                        </View>

                        <View style={styles.locationRow}>
                            <Ionicons name="location" size={14} color="#000000" />
                            <Text style={styles.locationText}>4th Arrondissement • 150m{'\n'}away</Text>
                        </View>

                        {/* Three Data Boxes */}
                        <View style={styles.dataBoxesRow}>
                            <View style={styles.dataBox}>
                                <Text style={styles.dataBoxLabel}>CROWD{'\n'}LEVEL</Text>
                                <View style={styles.progressBarBg}>
                                    <View style={styles.progressBarFill} />
                                </View>
                                <Text style={styles.dataBoxValueBlue}>High</Text>
                            </View>

                            <View style={styles.dataBox}>
                                <Text style={styles.dataBoxLabel}>LIGHT MOOD</Text>
                                <Ionicons name="sunny" size={20} color="#000000" style={{ marginTop: 6, marginBottom: 4 }} />
                                <Text style={styles.dataBoxValueDark} numberOfLines={1}>Classic ...</Text>
                            </View>

                            <View style={styles.dataBox}>
                                <Text style={styles.dataBoxLabel}>PRICE</Text>
                                <Text style={[styles.dataBoxValueBlue, { fontSize: 18, marginTop: 15 }]}>$$$</Text>
                            </View>
                        </View>

                        {/* Suggested Look Section */}
                        <View style={styles.lookSection}>
                            <View style={styles.lookHeaderTop}>
                                <Text style={styles.lookTitle}>Suggested Roamster Look</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Wardrobe')}>
                                    <Text style={styles.viewLookbookText}>VIEW LOOKBOOK</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.lookItemRow}>
                                <View style={styles.lookItemImgBg}>
                                    <Image 
                                        source={{ uri: DRESS_IMG }} 
                                        style={styles.lookItemImg} 
                                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                        transition={300}
                                        contentFit="cover"
                                    />
                                </View>
                                <View style={styles.lookItemInfo}>
                                    <Text style={styles.lookItemName}>"Midnight in Paris" Set</Text>
                                    <Text style={styles.lookItemDesc}>Elegant silk slip dress & blazer</Text>
                                    <View style={styles.lookItemTags}>
                                        <View style={styles.rentTag}><Text style={styles.rentTagText}>RENT $45/DAY</Text></View>
                                        <View style={styles.sizeTag}><Text style={styles.sizeTagText}>SIZE XS-L</Text></View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Blue Button */}
                        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Wardrobe')}>
                            <Text style={styles.primaryBtnText}>Rent This Look & Go</Text>
                            <Feather name="arrow-right" size={20} color="white" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>

                    </View>

                    {/* Bottom Floating Nav */}
                    <View style={styles.floatingNavContainer}>
                        <View style={styles.navBar}>
                            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Explore')}>
                                <Ionicons name="compass" size={24} color="#94A3B8" />
                                <Text style={styles.navLabelInactive}>EXPLORE</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.navItem}>
                                <MaterialCommunityIcons name="hanger" size={26} color="#000000" />
                                <Text style={styles.navLabelActive}>WARDROBE</Text>
                            </TouchableOpacity>

                            <View style={styles.plusButtonContainer}>
                                <TouchableOpacity style={styles.plusButton} activeOpacity={0.8} onPress={() => navigation.navigate('CreateTrip')}>
                                    <Feather name="plus" size={28} color="white" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SocialVibes')}>
                                <Ionicons name="people" size={26} color="#94A3B8" />
                                <Text style={styles.navLabelInactive}>SOCIAL</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.navItem}>
                                <Ionicons name="person" size={24} color="#94A3B8" />
                                <Text style={styles.navLabelInactive}>PROFILE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
    },
    topRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 15, // Account for translucent status bar
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 24,
        paddingHorizontal: 15,
        height: 48,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: '#334155',
        fontWeight: '500',
    },
    avatarWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        tintColor: '#000000', // Based on the mock which uses a blue generic user icon in a circle
    },
    pillsRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 15,
    },
    pillActive: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        shadowColor: '#333333',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    pillActiveText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '700',
        marginLeft: 6,
    },
    pillInactive: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    pillInactiveText: {
        color: '#334155',
        fontSize: 13,
        fontWeight: '600',
        marginLeft: 6,
    },

    // Bottom Card
    bottomCard: {
        backgroundColor: 'white',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 25,
        paddingTop: 15,
        paddingBottom: 110, // Avoid bottom nav
        marginTop: 'auto', // Push to bottom
    },
    dragHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#E2E8F0',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 25,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardTitle: {
        fontSize: 26,
        fontWeight: '900',
        color: '#0F172A',
        flex: 1,
    },
    liveBadge: {
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        alignItems: 'center',
    },
    liveBadgeText: {
        color: '#10B981',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 20,
    },
    locationText: {
        color: '#94A3B8',
        fontSize: 13,
        fontWeight: '500',
        marginLeft: 6,
        lineHeight: 18,
    },

    // Data Boxes
    dataBoxesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    dataBox: {
        backgroundColor: '#F8FAFC',
        borderRadius: 20,
        padding: 15,
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'flex-start',
    },
    dataBoxLabel: {
        fontSize: 9,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 0.5,
        lineHeight: 12,
    },
    progressBarBg: {
        width: '100%',
        height: 4,
        backgroundColor: '#E2E8F0',
        borderRadius: 2,
        marginTop: 10,
        marginBottom: 5,
    },
    progressBarFill: {
        width: '70%',
        height: 4,
        backgroundColor: '#000000',
        borderRadius: 2,
    },
    dataBoxValueBlue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000000',
        marginTop: 2,
    },
    dataBoxValueDark: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },

    // Suggested Look
    lookSection: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.02,
        shadowRadius: 10,
        elevation: 1,
    },
    lookHeaderTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    lookTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#0F172A',
    },
    viewLookbookText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#000000',
        letterSpacing: 0.5,
        textDecorationLine: 'underline',
    },
    lookItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lookItemImgBg: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        overflow: 'hidden',
    },
    lookItemImg: {
        width: 50,
        height: 70,
        resizeMode: 'cover',
    },
    lookItemInfo: {
        flex: 1,
    },
    lookItemName: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    lookItemDesc: {
        fontSize: 11,
        color: '#94A3B8',
        marginBottom: 8,
    },
    lookItemTags: {
        flexDirection: 'row',
    },
    rentTag: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 8,
    },
    rentTagText: {
        color: '#000000',
        fontSize: 8,
        fontWeight: '800',
    },
    sizeTag: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    sizeTagText: {
        color: '#94A3B8',
        fontSize: 8,
        fontWeight: '800',
    },

    primaryBtn: {
        flexDirection: 'row',
        backgroundColor: '#333333',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        shadowColor: '#333333',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5,
    },
    primaryBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
    },

    // Nav
    floatingNavContainer: {
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '90%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    navItem: {
        alignItems: 'center',
        flex: 1,
    },
    navLabelInactive: {
        fontSize: 8,
        color: '#94A3B8',
        fontWeight: '700',
        marginTop: 2,
    },
    navLabelActive: {
        fontSize: 8,
        color: '#000000',
        fontWeight: '700',
        marginTop: 2,
    },
    plusButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        top: -15,
    },
    plusButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
        borderWidth: 4,
        borderColor: 'white',
    },
});
