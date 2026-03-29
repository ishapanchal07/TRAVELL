import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Dimensions, Alert } from 'react-native';
import ShareService from '../services/ShareService';
import { useSaved } from '../context/SavedContext';
import { usePayment } from '../context/PaymentContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function ExperienceDetailScreen({ navigation, route }) {
    const { handlePaidAction } = usePayment();
    const { item = {} } = route.params || {};
    const { toggleSaveGem, isGemSaved } = useSaved();
    const saved = isGemSaved(item.id);

    const handleShare = async () => {
        await ShareService.shareItem({
            title: item.title,
            description: item.sub,
            image: item.img || item.image
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" transparent />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Gallery */}
                <View style={styles.heroContainer}>
                    <Image 
                        source={{ uri: item.img || item.image }} 
                        style={styles.heroImage}
                        contentFit="cover"
                        transition={300}
                    />
                    <SafeAreaView style={styles.headerNav}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
                            <Feather name="chevron-left" size={24} color="white" />
                        </TouchableOpacity>
                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.headerBtn} onPress={() => toggleSaveGem(item)}>
                                <Ionicons name={isGemSaved(item.id) ? "heart" : "heart-outline"} size={22} color={isGemSaved(item.id) ? "#EF4444" : "white"} />
                            </TouchableOpacity>
                             <TouchableOpacity style={styles.headerBtn} onPress={handleShare}>
                                 <Feather name="share-2" size={20} color="white" />
                             </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                    
                    <View style={styles.galleryIndicator}>
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>

                <View style={styles.mainContent}>
                    <View style={styles.titleSection}>
                        <View style={styles.categoryRow}>
                            <View style={styles.categoryPill}>
                                <Text style={styles.categoryText}>HISTORY & CULTURE</Text>
                            </View>
                            <View style={styles.ratingBox}>
                                <Ionicons name="star" size={14} color="#FACC15" />
                                <Text style={styles.ratingText}>{item.rating || '4.9'}</Text>
                                <Text style={styles.reviewCount}>(428 reviews)</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subTitle}>{item.sub}</Text>
                    </View>

                    {/* Smart Info Grid */}
                    <View style={styles.infoGrid}>
                        <InfoItem icon="clock-outline" label="Duration" value={item.duration || '2-3 hours'} />
                        <InfoItem icon="currency-eur" label="Entry Fee" value={item.fee || '€25/person'} />
                        <InfoItem icon="weather-sunny" label="Best Time" value={item.bestTime || 'Morning'} />
                        <InfoItem icon="account-group-outline" label="Crowd" value={item.crowd || 'Medium'} />
                    </View>

                    <View style={styles.divider} />


                    {/* Map Preview */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Location</Text>
                        <View style={styles.mapPreview}>
                            <Image 
                                source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop' }} 
                                style={styles.mapImg}
                            />
                            <BlurView intensity={30} tint="dark" style={styles.mapOverlay}>
                                <TouchableOpacity 
                                    style={styles.directionsBtn}
                                    onPress={() => navigation.navigate('Map', { city: item.title, location: item.title })}
                                >
                                    <MaterialCommunityIcons name="directions" size={18} color="white" />
                                    <Text style={styles.directionsText}>Get Directions</Text>
                                </TouchableOpacity>
                            </BlurView>
                        </View>
                    </View>

                    {/* Social Proof Section */}
                    <View style={styles.proofSection}>
                        <View style={styles.proofAvatars}>
                            {[1,2,3,4].map(i => (
                                <View key={i} style={[styles.proofAvatar, { marginLeft: i === 1 ? 0 : -10 }]} />
                            ))}
                        </View>
                        <Text style={styles.proofContent}>1,240 people have booked this in the last month.</Text>
                    </View>

                    {/* Booking Section Placeholder */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Select Date & Time</Text>
                        <View style={styles.datePickerPlaceholder}>
                            <Feather name="calendar" size={20} color="#64748B" />
                            <Text style={styles.datePlaceholderText}>Wednesday, Oct 25 • 10:00 AM</Text>
                            <Feather name="chevron-down" size={18} color="#64748B" />
                        </View>
                    </View>
                    
                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            <BlurView intensity={80} tint="light" style={styles.bottomBar}>
                <View style={styles.priceSection}>
                    <Text style={styles.priceLabel}>Starting from</Text>
                    <Text style={styles.priceText}>{item.fee || '€25'}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.bookNowBtn}
                    onPress={() => {
                        Alert.alert(
                            "Booking",
                            `Would you like to book tickets for ${item.title}?`,
                            [
                                { text: "Cancel", style: "cancel" },
                                { text: "Confirm", onPress: () => {
                                    const feeStr = item.fee || '25';
                                    const feePrice = feeStr.toLowerCase().includes('free') ? 0 : parseFloat(feeStr.replace(/[^0-9.]/g, '')) || 25.00;
                                    handlePaidAction(
                                        {
                                            id: item.id || item.title,
                                            title: item.title,
                                            price: feePrice,
                                            image: item.img || item.image,
                                            serviceFee: 5.00,
                                            deliveryFee: 'FREE',
                                        },
                                        'Explore',
                                        navigation,
                                        { successMessage: 'Booking initiated!' }
                                    );
                                }}
                            ]
                        );
                    }}
                >
                    <Text style={styles.bookNowText}>Book Tickets</Text>
                </TouchableOpacity>
            </BlurView>
        </View>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <View style={styles.infoItem}>
            <View style={styles.infoIconBox}>
                <MaterialCommunityIcons name={icon} size={20} color="#000000" />
            </View>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAF9',
    },
    heroContainer: {
        height: 450,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    headerNav: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    headerBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 12,
    },
    galleryIndicator: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    activeDot: {
        width: 18,
        backgroundColor: 'white',
    },
    mainContent: {
        backgroundColor: '#FAFAF9',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -40,
        paddingTop: 30,
        paddingHorizontal: 24,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryPill: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#475569',
        letterSpacing: 0.5,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
        marginLeft: 4,
    },
    reviewCount: {
        fontSize: 12,
        color: '#64748B',
        marginLeft: 6,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0F172A',
        lineHeight: 34,
    },
    subTitle: {
        fontSize: 16,
        color: '#64748B',
        fontWeight: '600',
        marginTop: 6,
    },
    infoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    infoItem: {
        alignItems: 'center',
        flex: 1,
    },
    infoIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoLabel: {
        fontSize: 9,
        fontWeight: '900',
        color: '#94A3B8',
        textTransform: 'uppercase',
    },
    infoValue: {
        fontSize: 11,
        fontWeight: '700',
        color: '#0F172A',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 35,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 15,
    },
    descText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#475569',
        fontWeight: '500',
    },
    mapPreview: {
        height: 180,
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
    },
    mapImg: {
        width: '100%',
        height: '100%',
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    directionsBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        gap: 8,
    },
    directionsText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 14,
    },
    proofSection: {
        backgroundColor: '#F0FDFA',
        padding: 20,
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    proofAvatars: {
        flexDirection: 'row',
    },
    proofAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#94A3B8',
        borderWidth: 2,
        borderColor: '#F0FDFA',
    },
    proofContent: {
        fontSize: 12,
        color: '#0D9488',
        fontWeight: '700',
        marginLeft: 15,
        flex: 1,
    },
    datePickerPlaceholder: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderColor: '#F1F5F9',
        borderRadius: 20,
        padding: 16,
    },
    datePlaceholderText: {
        flex: 1,
        marginHorizontal: 15,
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    priceSection: {
        justifyContent: 'center',
    },
    priceLabel: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
    },
    priceText: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0F172A',
    },
    bookNowBtn: {
        backgroundColor: '#000000',
        paddingHorizontal: 35,
        paddingVertical: 16,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    bookNowText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '900',
    },
});
