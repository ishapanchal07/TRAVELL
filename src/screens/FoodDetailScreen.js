import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const FOOD_HERO_IMG = 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&q=80&w=600';

export default function FoodDetailScreen({ route, navigation }) {
    const { item = {} } = route.params || {};
    const [dietary, setDietary] = useState('Non-Veg');
    const [addons, setAddons] = useState({ baguette: false, salad: true });
    const [deliveryLoc, setDeliveryLoc] = useState('Hotel');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" transparent />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Hero section */}
                <View style={styles.heroContainer}>
                    <Image source={{ uri: FOOD_HERO_IMG }} style={styles.heroImage} />
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>

                    <View style={styles.heroOverlay}>
                        <View style={styles.badgeRow}>
                            <View style={styles.topRatedBadge}>
                                <Text style={styles.topRatedText}>TOP RATED</Text>
                            </View>
                            <View style={styles.ratingBox}>
                                <Ionicons name="star" size={14} color="#FACC15" />
                                <Text style={styles.ratingText}>4.9 (120+ Reviews)</Text>
                            </View>
                        </View>

                        <View style={styles.titleRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.foodTitle}>Classic Beef Bourguignon</Text>
                                <Text style={styles.foodSubtitle}>Traditional Parisian Bistro • 45 min</Text>
                            </View>
                            <View style={styles.bestForDinnerBox}>
                                <MaterialCommunityIcons name="silverware-fork-knife" size={18} color="white" />
                                <Text style={styles.bestForText}>BEST FOR DINNER</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Local Guide Tip */}
                <View style={styles.tipCard}>
                    <View style={styles.tipIconBox}>
                        <Ionicons name="happy" size={24} color="#3B82F6" />
                    </View>
                    <View style={styles.tipContent}>
                        <Text style={styles.tipTitle}>LOCAL GUIDE TIP</Text>
                        <Text style={styles.tipText}>"In Paris, this is a quintessential dinner staple. Pairs perfectly with a Bordeaux wine."</Text>
                    </View>
                </View>

                {/* Customize Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Customize Your Order</Text>

                    <Text style={styles.miniHeader}>DIETARY CHOICE</Text>
                    <View style={styles.dietaryRow}>
                        <TouchableOpacity
                            style={[styles.dietOption, dietary === 'Non-Veg' ? styles.dietOptionActive : null]}
                            onPress={() => setDietary('Non-Veg')}
                        >
                            <MaterialCommunityIcons name="silverware-fork-knife" size={20} color={dietary === 'Non-Veg' ? '#3B82F6' : '#94A3B8'} />
                            <Text style={[styles.dietText, dietary === 'Non-Veg' ? styles.dietTextActive : null]}>Non-Veg</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.dietOption, dietary === 'Veg' ? styles.dietOptionActive : null]}
                            onPress={() => setDietary('Veg')}
                        >
                            <MaterialCommunityIcons name="leaf" size={20} color={dietary === 'Veg' ? '#3B82F6' : '#94A3B8'} />
                            <Text style={[styles.dietText, dietary === 'Veg' ? styles.dietTextActive : null]}>Veg Option</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Addons */}
                    <View style={styles.addonItem}>
                        <View style={styles.addonIconBox}>
                            <MaterialCommunityIcons name="baguette" size={22} color="#3B82F6" />
                        </View>
                        <View style={styles.addonInfo}>
                            <Text style={styles.addonTitle}>Extra Baguette</Text>
                            <Text style={styles.addonSub}>Freshly baked</Text>
                        </View>
                        <Text style={styles.addonPrice}>+$2.50</Text>
                        <TouchableOpacity style={styles.addonToggle} onPress={() => setAddons({ ...addons, baguette: !addons.baguette })}>
                            <Ionicons name={addons.baguette ? "checkmark-circle" : "add"} size={addons.baguette ? 30 : 24} color={addons.baguette ? "#3B82F6" : "#E2E8F0"} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.addonItem}>
                        <View style={styles.addonIconBox}>
                            <Ionicons name="leaf" size={20} color="#3B82F6" />
                        </View>
                        <View style={styles.addonInfo}>
                            <Text style={styles.addonTitle}>Side Salad</Text>
                            <Text style={styles.addonSub}>Lemon vinaigrette</Text>
                        </View>
                        <Text style={styles.addonPrice}>+$4.00</Text>
                        <TouchableOpacity style={styles.addonToggle} onPress={() => setAddons({ ...addons, salad: !addons.salad })}>
                            <Ionicons name={addons.salad ? "checkmark-circle" : "add"} size={addons.salad ? 30 : 24} color={addons.salad ? "#3B82F6" : "#E2E8F0"} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Delivery Location */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Location</Text>
                    <View style={styles.locationTabs}>
                        <TouchableOpacity
                            style={[styles.locationTab, deliveryLoc === 'Hotel' ? styles.locationTabActive : null]}
                            onPress={() => setDeliveryLoc('Hotel')}
                        >
                            <Ionicons name="bed" size={20} color={deliveryLoc === 'Hotel' ? '#3B82F6' : '#94A3B8'} style={{ marginRight: 8 }} />
                            <Text style={[styles.locationTabText, deliveryLoc === 'Hotel' ? styles.locationTabTextActive : null]}>Hotel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.locationTab, deliveryLoc === 'Picnic' ? styles.locationTabActive : null]}
                            onPress={() => setDeliveryLoc('Picnic')}
                        >
                            <FontAwesome5 name="umbrella-beach" size={16} color={deliveryLoc === 'Picnic' ? '#3B82F6' : '#94A3B8'} style={{ marginRight: 8 }} />
                            <Text style={[styles.locationTabText, deliveryLoc === 'Picnic' ? styles.locationTabTextActive : null]}>Seine Picnic</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.locDisplay}>
                        <Ionicons name="location" size={16} color="#3B82F6" style={{ marginRight: 8 }} />
                        <Text style={styles.locDisplayText}>Hôtel Lutetia, 45 Bd Raspail, 75006 Paris</Text>
                    </View>
                </View>

                {/* Bill Details */}
                <View style={styles.billSection}>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Subtotal</Text>
                        <Text style={styles.billValue}>$28.00</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Add-ons (Salad)</Text>
                        <Text style={styles.billValueAddon}>$4.00</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Delivery Fee</Text>
                        <View style={styles.ecoBadge}>
                            <Text style={styles.ecoText}>ECO-DELIVERY</Text>
                        </View>
                        <Text style={styles.billValue}>$2.00</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalPrice}>$34.00</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.placeOrderBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('OrderTracking')}
                >
                    <Text style={styles.placeOrderText}>PLACE ORDER • $34.00</Text>
                </TouchableOpacity>

            </ScrollView>

            <BottomNav activeRoute="Explore" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingBottom: 150,
    },
    heroContainer: {
        width: '100%',
        height: 380,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        paddingTop: 60,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    topRatedBadge: {
        backgroundColor: '#0EA5E9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 12,
    },
    topRatedText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '900',
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    foodTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 6,
    },
    foodSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        fontWeight: '500',
    },
    bestForDinnerBox: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        padding: 12,
        borderRadius: 16,
        alignItems: 'center',
        width: 100,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    bestForText: {
        color: 'white',
        fontSize: 8,
        fontWeight: '800',
        marginTop: 6,
        textAlign: 'center',
    },
    tipCard: {
        backgroundColor: '#F0F9FF',
        marginHorizontal: 24,
        marginTop: -30,
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        zIndex: 10,
        borderWidth: 1,
        borderColor: '#BAE6FD',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 5,
    },
    tipIconBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    tipContent: {
        flex: 1,
    },
    tipTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#0EA5E9',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    tipText: {
        fontSize: 14,
        color: '#1E293B',
        lineHeight: 20,
        fontWeight: '500',
    },
    section: {
        marginTop: 35,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 20,
    },
    miniHeader: {
        fontSize: 11,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 1,
        marginBottom: 15,
    },
    dietaryRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 25,
    },
    dietOption: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        gap: 8,
    },
    dietOptionActive: {
        borderColor: '#3B82F6',
        backgroundColor: 'white',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    dietText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#64748B',
    },
    dietTextActive: {
        color: '#3B82F6',
    },
    addonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    addonIconBox: {
        width: 44,
        height: 44,
        borderRadius: 16,
        backgroundColor: '#F0F9FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    addonInfo: {
        flex: 1,
    },
    addonTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    addonSub: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 2,
    },
    addonPrice: {
        fontSize: 15,
        fontWeight: '700',
        color: '#3B82F6',
        marginRight: 12,
    },
    locationTabs: {
        flexDirection: 'row',
        backgroundColor: 'rgba(148, 163, 184, 0.05)',
        borderRadius: 16,
        padding: 6,
        gap: 6,
        marginBottom: 16,
    },
    locationTab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
    },
    locationTabActive: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#3B82F6',
    },
    locationTabText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#94A3B8',
    },
    locationTabTextActive: {
        color: '#0F172A',
    },
    locDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    locDisplayText: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '600',
    },
    billSection: {
        marginTop: 40,
        paddingHorizontal: 24,
    },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    billLabel: {
        fontSize: 15,
        color: '#94A3B8',
        fontWeight: '600',
    },
    billValue: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    billValueAddon: {
        fontSize: 16,
        fontWeight: '800',
        color: '#3B82F6',
    },
    ecoBadge: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        position: 'absolute',
        left: 95,
    },
    ecoText: {
        color: '#16A34A',
        fontSize: 8,
        fontWeight: '900',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginVertical: 10,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
    },
    totalPrice: {
        fontSize: 28,
        fontWeight: '900',
        color: '#3B82F6',
    },
    placeOrderBtn: {
        backgroundColor: '#38BDF8',
        marginHorizontal: 24,
        marginTop: 40,
        paddingVertical: 20,
        borderRadius: 24,
        alignItems: 'center',
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
    },
    placeOrderText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
});
