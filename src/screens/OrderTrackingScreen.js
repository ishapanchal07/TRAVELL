import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const PIERRE_AVATAR = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200';
const LADUREE_ICON = 'https://images.unsplash.com/photo-1626804561081-377b2207936a?auto=format&fit=crop&q=80&w=100';

export default function OrderTrackingScreen({ route, navigation }) {
    const { orderItem = {} } = route.params || {};
    const { name = 'Macarons', image = LADUREE_ICON } = orderItem;

    return (
        <View style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order Tracking</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Status Card */}
                <View style={styles.statusCard}>
                    <View style={styles.statusContent}>
                        <Text style={styles.onItsWay}>ON ITS WAY</Text>
                        <Text style={styles.statusMain}>Your {name} are arriving!</Text>
                        <View style={styles.timeBadge}>
                            <Ionicons name="time-outline" size={16} color="white" />
                            <Text style={styles.timeText}>Estimated: 8 mins</Text>
                        </View>
                    </View>
                    <View style={styles.scooterIconBox}>
                        <MaterialCommunityIcons name="moped" size={80} color="rgba(255,255,255,0.2)" style={{ transform: [{ rotate: '0deg' }] }} />
                    </View>
                </View>

                {/* Map Placeholder Design */}
                <View style={styles.mapContainer}>
                    {/* Simulated Map Background */}
                    <View style={styles.mapGrid}>
                        <View style={[styles.mapLine, { top: '30%', width: '100%', height: 1 }]} />
                        <View style={[styles.mapLine, { top: '60%', width: '100%', height: 1 }]} />
                        <View style={[styles.mapLine, { left: '30%', height: '100%', width: 1 }]} />
                        <View style={[styles.mapLine, { left: '70%', height: '100%', width: 1 }]} />
                    </View>

                    {/* Biker Marker */}
                    <View style={[styles.marker, { top: '40%', left: '35%' }]}>
                        <View style={styles.bikerPill}>
                            <MaterialCommunityIcons name="moped" size={16} color="white" />
                        </View>
                    </View>

                    {/* Restaurant Marker */}
                    <View style={[styles.marker, { top: '25%', left: '30%' }]}>
                        <View style={styles.restaurantMarker}>
                            <Image 
                                source={{ uri: image }} 
                                style={styles.restaurantImg} 
                                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                transition={300}
                                contentFit="cover"
                            />
                        </View>
                        <Text style={styles.markerLabel}>Restaurant</Text>
                    </View>

                    {/* Destination Marker */}
                    <View style={[styles.marker, { top: '60%', left: '65%' }]}>
                        <View style={styles.hotelMarker}>
                            <Ionicons name="bed" size={20} color="white" />
                        </View>
                        <Text style={styles.markerLabel}>Hotel Ritz</Text>
                    </View>
                </View>

                {/* Delivery Person Card */}
                <View style={styles.personCard}>
                    <Image 
                        source={{ uri: PIERRE_AVATAR }} 
                        style={styles.personImg} 
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                        transition={300}
                        contentFit="cover"
                    />
                    <View style={styles.personInfo}>
                        <Text style={styles.personName}>Pierre</Text>
                        <View style={styles.personRating}>
                            <Ionicons name="star" size={12} color="#FACC15" />
                            <Text style={styles.ratingValue}>4.9</Text>
                            <Text style={styles.ratingRole}>• Delivery Expert</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.messageBtn}>
                        <Text style={styles.messageText}>Message</Text>
                    </TouchableOpacity>
                </View>

                {/* Timeline */}
                <View style={styles.timelineContainer}>
                    <TimelineItem
                        title="Order Prepared"
                        time="12:45 PM"
                        status="completed"
                        isFirst
                    />
                    <TimelineItem
                        title="COURIER PICKED UP"
                        time="Current Step • 1:02 PM"
                        status="active"
                        icon="moped"
                    />
                    <TimelineItem
                        title="Near You"
                        status="pending"
                        icon="send"
                    />
                    <TimelineItem
                        title="Delivered"
                        status="pending"
                        icon="flag"
                        isLast
                    />
                </View>

                {/* Order Summary */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Order Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>1x {name}</Text>
                        <Text style={styles.summaryValue}>€24.00</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Delivery Fee</Text>
                        <Text style={styles.summaryValue}>€3.50</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>€27.50</Text>
                    </View>
                </View>

            </ScrollView>

            <BottomNav activeRoute="Explore" />
        </View>
    );
}

function TimelineItem({ title, time, status, icon, isFirst, isLast, active }) {
    const isCompleted = status === 'completed';
    const isActive = status === 'active';

    return (
        <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
                <View style={[
                    styles.timelineDot,
                    isCompleted ? styles.dotCompleted : (isActive ? styles.dotActive : styles.dotPending)
                ]}>
                    {isCompleted && <Ionicons name="checkmark" size={14} color="white" />}
                    {isActive && <MaterialCommunityIcons name={icon} size={14} color="white" />}
                    {!isCompleted && !isActive && <MaterialCommunityIcons name={icon} size={14} color="#CBD5E1" />}
                </View>
                {!isLast && <View style={[styles.timelineLine, isCompleted ? styles.lineCompleted : null]} />}
            </View>
            <View style={[styles.timelineContent, isActive ? styles.contentActive : null]}>
                <Text style={[styles.timelineTitle, isActive ? styles.activeTitle : null]}>{title}</Text>
                {time && <Text style={styles.timelineTime}>{time}</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
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
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 120,
    },
    statusCard: {
        backgroundColor: '#000000',
        borderRadius: 30,
        padding: 24,
        flexDirection: 'row',
        overflow: 'hidden',
        position: 'relative',
        marginTop: 10,
        marginBottom: 24,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
    },
    statusContent: {
        flex: 1,
        zIndex: 2,
    },
    onItsWay: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 8,
    },
    statusMain: {
        color: 'white',
        fontSize: 26,
        fontWeight: '900',
        lineHeight: 32,
        marginBottom: 16,
        width: '80%',
    },
    timeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.25)',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    timeText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 6,
    },
    scooterIconBox: {
        position: 'absolute',
        right: -10,
        bottom: -10,
    },
    mapContainer: {
        width: '100%',
        height: 280,
        backgroundColor: '#F1F5F9',
        borderRadius: 35,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    mapGrid: {
        ...StyleSheet.absoluteFillObject,
    },
    mapLine: {
        position: 'absolute',
        backgroundColor: 'rgba(148, 163, 184, 0.1)',
    },
    marker: {
        position: 'absolute',
        alignItems: 'center',
    },
    bikerPill: {
        backgroundColor: '#000000',
        padding: 8,
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
    },
    restaurantMarker: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'white',
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    restaurantImg: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    hotelMarker: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4,
    },
    markerLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#0F172A',
        marginTop: 6,
        backgroundColor: 'white',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    personCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    personImg: {
        width: 50,
        height: 50,
        borderRadius: 16,
    },
    personInfo: {
        flex: 1,
        marginLeft: 16,
    },
    personName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    personRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingValue: {
        fontSize: 13,
        fontWeight: '800',
        color: '#0F172A',
        marginLeft: 4,
    },
    ratingRole: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
        marginLeft: 4,
    },
    messageBtn: {
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 16,
    },
    messageText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '700',
    },
    timelineContainer: {
        marginBottom: 35,
        paddingLeft: 8,
    },
    timelineRow: {
        flexDirection: 'row',
        minHeight: 70,
    },
    timelineLeft: {
        width: 30,
        alignItems: 'center',
    },
    timelineDot: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        borderWidth: 3,
        borderColor: '#F8FAFC',
    },
    dotCompleted: {
        backgroundColor: '#000000',
    },
    dotActive: {
        backgroundColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    dotPending: {
        backgroundColor: '#F1F5F9',
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: -2,
    },
    lineCompleted: {
        backgroundColor: '#000000',
    },
    timelineContent: {
        flex: 1,
        marginLeft: 16,
        paddingTop: 4,
    },
    contentActive: {
        backgroundColor: 'white',
        marginTop: -10,
        padding: 16,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    timelineTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#94A3B8',
    },
    activeTitle: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    timelineTime: {
        fontSize: 13,
        color: '#94A3B8',
        marginTop: 4,
        fontWeight: '500',
    },
    summaryCard: {
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 20,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 15,
        color: '#94A3B8',
        fontWeight: '600',
    },
    summaryValue: {
        fontSize: 15,
        fontWeight: '800',
        color: '#0F172A',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingTop: 16,
        marginTop: 4,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '900',
        color: '#000000',
    },
});
