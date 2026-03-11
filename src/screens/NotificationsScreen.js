import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const NOTIFICATIONS = [
    {
        id: '1',
        type: 'trip',
        title: 'Wardrobe Arriving Soon',
        desc: 'Your Parisian curated looks are 10 mins away from Hotel Ritz.',
        time: '2m ago',
        isNew: true,
        icon: 'hanger',
        iconColor: '#3B82F6',
        bgColor: '#EFF6FF',
    },
    {
        id: '2',
        type: 'social',
        title: 'New Follower',
        desc: '@ChloeP started following your Roamster journey.',
        time: '15m ago',
        isNew: true,
        icon: 'account-plus',
        iconColor: '#8B5CF6',
        bgColor: '#F5F3FF',
    },
    {
        id: '3',
        type: 'offer',
        title: 'Flash Deal: 0.5x Rental',
        desc: 'Get 50% off on your next wide-angle lens rental in Paris.',
        time: '1h ago',
        isNew: false,
        icon: 'tag',
        iconColor: '#F59E0B',
        bgColor: '#FFFBEB',
    },
    {
        id: '4',
        type: 'system',
        title: 'Golden Hour Reminder',
        desc: 'Sunset starts in 30 mins. Head to Trocadéro for the best shot!',
        time: '3h ago',
        isNew: false,
        icon: 'weather-sunny',
        iconColor: '#0EA5E9',
        bgColor: '#F0F9FF',
    },
    {
        id: '5',
        type: 'trip',
        title: 'Booking Confirmed',
        desc: 'Your "Eiffel Tower" expert guide is confirmed for tomorrow 9 AM.',
        time: '昨天',
        isNew: false,
        icon: 'calendar-check',
        iconColor: '#10B981',
        bgColor: '#ECFDF5',
    }
];

export default function NotificationsScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('All');

    const filteredNotifs = NOTIFICATIONS.filter(item => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Trips' && item.type === 'trip') return true;
        if (activeTab === 'Social' && item.type === 'social') return true;
        if (activeTab === 'Offers' && item.type === 'offer') return true;
        return false;
    });

    const newNotifs = filteredNotifs.filter(n => n.isNew);
    const earlierNotifs = filteredNotifs.filter(n => !n.isNew);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity style={styles.moreBtn}>
                    <Feather name="more-horizontal" size={20} color="#0F172A" />
                </TouchableOpacity>
            </View>

            <View style={styles.filterRow}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    <FilterChip label="All" active={activeTab === 'All'} onPress={() => setActiveTab('All')} />
                    <FilterChip label="Trips" active={activeTab === 'Trips'} onPress={() => setActiveTab('Trips')} />
                    <FilterChip label="Social" active={activeTab === 'Social'} onPress={() => setActiveTab('Social')} />
                    <FilterChip label="Offers" active={activeTab === 'Offers'} onPress={() => setActiveTab('Offers')} />
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {newNotifs.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>NEW</Text>
                        {newNotifs.map(item => (
                            <NotificationItem key={item.id} item={item} />
                        ))}
                    </>
                )}

                {earlierNotifs.length > 0 && (
                    <>
                        <Text style={[styles.sectionTitle, { marginTop: newNotifs.length > 0 ? 30 : 0 }]}>EARLIER</Text>
                        {earlierNotifs.map(item => (
                            <NotificationItem key={item.id} item={item} />
                        ))}
                    </>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}

function FilterChip({ label, active, onPress }) {
    return (
        <TouchableOpacity style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
        </TouchableOpacity>
    );
}

function NotificationItem({ item }) {
    return (
        <TouchableOpacity style={styles.notifItem} activeOpacity={0.7} onPress={() => console.log('Clicked:', item.title)}>
            <View style={[styles.iconBox, { backgroundColor: item.bgColor }]}>
                <MaterialCommunityIcons name={item.icon} size={22} color={item.iconColor} />
            </View>
            <View style={styles.notifContent}>
                <View style={styles.notifHeader}>
                    <Text style={styles.notifTitle}>{item.title}</Text>
                    <Text style={styles.notifTime}>{item.time}</Text>
                </View>
                <Text style={styles.notifDesc}>{item.desc}</Text>
            </View>
            {item.isNew && <View style={styles.unreadDot} />}
        </TouchableOpacity>
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
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
    },
    moreBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterRow: {
        marginTop: 10,
        marginBottom: 20,
    },
    filterScroll: {
        paddingHorizontal: 24,
    },
    chip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        backgroundColor: 'white',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    chipActive: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    chipText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
    },
    chipTextActive: {
        color: 'white',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 1,
        marginBottom: 15,
    },
    notifItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notifContent: {
        flex: 1,
        marginLeft: 15,
    },
    notifHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    notifTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#0F172A',
    },
    notifTime: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '600',
    },
    notifDesc: {
        fontSize: 13,
        color: '#64748B',
        lineHeight: 18,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3B82F6',
        marginLeft: 10,
    }
});
