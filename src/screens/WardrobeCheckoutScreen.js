import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const LOOK_IMG_1 = 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=300';
const LOOK_IMG_2 = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300';
const LOOK_IMG_3 = 'https://images.unsplash.com/photo-1549493527-73bd10565258?auto=format&fit=crop&q=80&w=300';

export default function WardrobeCheckoutScreen({ route, navigation }) {
    const { selectedItems = [] } = route.params || {};

    // Fallback static items if none passed (for direct navigation testing)
    const itemsToShow = selectedItems.length > 0 ? selectedItems : [
        { id: '1', title: 'Louvre Morning', rent: '$24', buy: '$185', image: LOOK_IMG_1 },
        { id: '2', title: 'Marais Chic', rent: '$32', buy: '$240', image: LOOK_IMG_2 },
        { id: '3', title: 'Autumn Beret', rent: '$12', buy: '$45', image: LOOK_IMG_3 }
    ];

    const itemCount = itemsToShow.length;

    // Calculate totals
    const subtotal = itemsToShow.reduce((acc, item) => {
        const priceStr = item.rent || '$0';
        const price = parseInt(priceStr.replace('$', '')) || 0;
        return acc + price;
    }, 0);

    const serviceFee = 12.00;
    const total = subtotal + serviceFee;

    const currentYear = new Date().getFullYear();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Finalize Your Roam</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* CO2 Savings Badge */}
                <View style={styles.co2Badge}>
                    <Ionicons name="leaf" size={14} color="#3B82F6" />
                    <Text style={styles.co2Text}>YOU SAVED {(itemCount * 4.1).toFixed(1)}KG OF CO2</Text>
                </View>

                {/* Section: Your Curated Look */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Your Curated Look</Text>
                    <Text style={styles.itemsCount}>{itemCount} Item{itemCount !== 1 ? 's' : ''} Selected</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.curatedScroll}>
                    {itemsToShow.map((item, idx) => (
                        <View key={item.id + idx} style={styles.lookCard}>
                            <Image source={{ uri: item.image }} style={styles.lookImg} />
                        </View>
                    ))}
                </ScrollView>

                {/* Section: Trip Duration */}
                <Text style={styles.sectionTitleInside}>Trip Duration</Text>
                <View style={styles.tripCard}>
                    <View style={styles.tripCol}>
                        <Text style={styles.tripLabel}>START TRIP</Text>
                        <Text style={styles.tripDate}>Sep 12,</Text>
                        <Text style={styles.tripDate}>{currentYear}</Text>
                    </View>
                    <View style={styles.planeIconBox}>
                        <Ionicons name="airplane" size={20} color="#3B82F6" />
                    </View>
                    <View style={styles.tripCol}>
                        <Text style={styles.tripLabelEnd}>END TRIP</Text>
                        <Text style={styles.tripDateEnd}>Sep 18,</Text>
                        <Text style={styles.tripDateEnd}>{currentYear}</Text>
                    </View>
                </View>

                {/* Section: Delivery Location */}
                <Text style={styles.sectionTitleInside}>Delivery Location</Text>
                <View style={styles.locationCard}>
                    <View style={styles.hotelPill}>
                        <Ionicons name="bed" size={20} color="#3B82F6" />
                        <Text style={styles.hotelName}>Hôtel Lutetia, Paris</Text>
                    </View>

                    <View style={styles.miniMap}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400' }}
                            style={styles.mapImg}
                        />
                        <View style={styles.mapOverlay} />
                        <View style={styles.mapPin}>
                            <Ionicons name="location" size={20} color="#3B82F6" />
                        </View>
                    </View>
                </View>

                {/* Section: Your Schedule */}
                <Text style={styles.sectionTitleInside}>Your Schedule</Text>
                <View style={styles.scheduleContainer}>
                    <ScheduleItem
                        icon="cube"
                        title="Delivery to Hotel"
                        subtitle={`Sep 12 • Arrival by 2:00 PM`}
                        note="Ready at the concierge"
                        isFirst
                    />
                    <ScheduleItem
                        icon="moped"
                        title="Scheduled Pickup"
                        subtitle={`Sep 18 • Before 11:00 AM`}
                        note="Leave at the front desk"
                        isLast
                    />
                </View>

                {/* Pricing Summary */}
                <View style={styles.priceCard}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabelSmall}>Rental Subtotal</Text>
                        <Text style={styles.priceValueSmall}>${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabelSmall}>Service Fee</Text>
                        <Text style={styles.priceValueSmall}>${serviceFee.toFixed(2)}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabelSmall}>Delivery & Return</Text>
                        <View style={styles.freeBadge}>
                            <Text style={styles.freeText}>FREE</Text>
                        </View>
                    </View>

                    <View style={styles.totalRow}>
                        <View>
                            <Text style={styles.totalLabel}>TOTAL PRICE</Text>
                            <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
                        </View>
                        <View style={styles.roamPointsBadge}>
                            <MaterialCommunityIcons name="star-circle" size={16} color="#3B82F6" />
                            <Text style={styles.roamPointsText}>+{Math.floor(total)} ROAM POINTS</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.bookBtn}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('WardrobeStatus')}
                    >
                        <Text style={styles.bookBtnText}>Book My Wardrobe</Text>
                        <Ionicons name="arrow-forward" size={20} color="white" />
                    </TouchableOpacity>

                    <Text style={styles.secureText}>SECURE CHECKOUT POWERED BY ROAMSTER PAY</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

function ScheduleItem({ icon, title, subtitle, note, isFirst, isLast }) {
    return (
        <View style={styles.scheduleRow}>
            <View style={styles.scheduleLeft}>
                <View style={styles.iconCircle}>
                    <MaterialCommunityIcons name={icon} size={18} color="#3B82F6" />
                </View>
                {!isLast && <View style={styles.verticalLine} />}
            </View>
            <View style={styles.scheduleContent}>
                <Text style={styles.scheduleTitle}>{title}</Text>
                <Text style={styles.scheduleSubtitle}>{subtitle}</Text>
                <Text style={styles.scheduleNote}>{note}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 15,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
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
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    co2Badge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFF6FF',
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginVertical: 10,
    },
    co2Text: {
        color: '#3B82F6',
        fontSize: 11,
        fontWeight: '900',
        marginLeft: 8,
        letterSpacing: 0.5,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: 24,
        marginTop: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#0F172A',
    },
    itemsCount: {
        fontSize: 12,
        fontWeight: '700',
        color: '#3B82F6',
    },
    curatedScroll: {
        paddingLeft: 24,
        paddingRight: 10,
    },
    lookCard: {
        width: 140,
        height: 180,
        backgroundColor: 'white',
        borderRadius: 30,
        marginRight: 15,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    lookImg: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
    },
    sectionTitleInside: {
        fontSize: 22,
        fontWeight: '900',
        color: '#0F172A',
        paddingHorizontal: 24,
        marginTop: 35,
        marginBottom: 20,
    },
    tripCard: {
        backgroundColor: 'white',
        marginHorizontal: 24,
        padding: 30,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    tripCol: {
        alignItems: 'flex-start',
    },
    tripLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94A3B8',
        marginBottom: 10,
    },
    tripLabelEnd: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94A3B8',
        marginBottom: 10,
        textAlign: 'right',
        width: '100%',
    },
    tripDate: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0F172A',
        lineHeight: 24,
    },
    tripDateEnd: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0F172A',
        lineHeight: 24,
        textAlign: 'right',
    },
    planeIconBox: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationCard: {
        backgroundColor: 'white',
        marginHorizontal: 24,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    hotelPill: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
    },
    hotelName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        marginLeft: 15,
    },
    miniMap: {
        width: '100%',
        height: 180,
        position: 'relative',
    },
    mapImg: {
        width: '100%',
        height: '100%',
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
        opacity: 0.7,
    },
    mapPin: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -10,
        marginLeft: -10,
    },
    scheduleContainer: {
        paddingHorizontal: 24,
    },
    scheduleRow: {
        flexDirection: 'row',
        minHeight: 80,
    },
    scheduleLeft: {
        width: 44,
        alignItems: 'center',
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 15,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    verticalLine: {
        width: 1,
        flex: 1,
        backgroundColor: '#DBEAFE',
        marginVertical: -5,
    },
    scheduleContent: {
        flex: 1,
        marginLeft: 15,
        paddingTop: 0,
    },
    scheduleTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    scheduleSubtitle: {
        fontSize: 14,
        color: '#94A3B8',
        fontWeight: '600',
        marginBottom: 4,
    },
    scheduleNote: {
        fontSize: 13,
        color: '#3B82F6',
        fontWeight: '700',
    },
    priceCard: {
        backgroundColor: 'white',
        marginTop: 40,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 40,
        paddingTop: 45,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    priceLabelSmall: {
        fontSize: 16,
        color: '#94A3B8',
        fontWeight: '600',
    },
    priceValueSmall: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
    },
    freeBadge: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    freeText: {
        color: '#16A34A',
        fontSize: 10,
        fontWeight: '900',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 20,
        marginBottom: 30,
    },
    totalLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 0.5,
        marginBottom: 5,
    },
    totalPrice: {
        fontSize: 34,
        fontWeight: '900',
        color: '#3B82F6',
    },
    roamPointsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
    },
    roamPointsText: {
        color: '#3B82F6',
        fontSize: 11,
        fontWeight: '900',
        marginLeft: 6,
    },
    bookBtn: {
        flexDirection: 'row',
        backgroundColor: '#60A5FA',
        paddingVertical: 22,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#60A5FA',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
    },
    bookBtnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '900',
        marginRight: 10,
    },
    secureText: {
        textAlign: 'center',
        fontSize: 9,
        fontWeight: '800',
        color: '#CBD5E1',
        marginTop: 25,
        letterSpacing: 0.5,
    }
});
