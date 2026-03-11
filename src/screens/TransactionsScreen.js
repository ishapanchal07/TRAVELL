import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const USER_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';

const TRANSACTIONS = [
    {
        id: '1',
        title: 'Parisian Chic Set',
        date: 'Oct 12',
        category: 'Rental',
        amount: '$45.00',
        status: 'PAID',
        icon: 'shopping-bag',
        iconType: 'Feather',
        month: 'THIS MONTH'
    },
    {
        id: '2',
        title: 'Louvre Night Tour',
        date: 'Oct 10',
        category: 'Guide',
        amount: '$120.00',
        status: 'PAID',
        icon: 'compass',
        iconType: 'Feather',
        month: 'THIS MONTH'
    },
    {
        id: '3',
        title: 'Influencer Preset Kit',
        date: 'Oct 05',
        category: 'Digital',
        amount: '$15.00',
        status: 'PENDING',
        icon: 'camera',
        iconType: 'Feather',
        month: 'THIS MONTH'
    },
    {
        id: '4',
        title: 'Streetwear Bundle',
        date: 'Sep 28',
        category: 'Rental',
        amount: '$58.00',
        status: 'PAID',
        icon: 'hanger',
        iconType: 'MaterialCommunityIcons',
        month: 'SEPTEMBER'
    }
];

export default function TransactionsScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('All');

    const renderIcon = (item) => {
        if (item.iconType === 'Feather') {
            return <Feather name={item.icon} size={22} color="#3B82F6" />;
        } else if (item.iconType === 'MaterialCommunityIcons') {
            return <MaterialCommunityIcons name={item.icon} size={24} color="#3B82F6" />;
        }
        return <Feather name="box" size={22} color="#3B82F6" />;
    };

    const groupedTransactions = TRANSACTIONS.reduce((acc, curr) => {
        if (!acc[curr.month]) acc[curr.month] = [];
        acc[curr.month].push(curr);
        return acc;
    }, {});

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Transactions</Text>
                    <Image 
                        source={{ uri: USER_AVATAR }} 
                        style={styles.avatar} 
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                        transition={300}
                    />
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Feather name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search rentals, guides, kits..."
                            placeholderTextColor="#94A3B8"
                            style={styles.searchInput}
                        />
                        <TouchableOpacity style={styles.filterIconBox}>
                            <MaterialCommunityIcons name="filter-variant" size={20} color="#3B82F6" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Filter Tabs */}
                <View style={styles.tabsContainer}>
                    {['All', 'Rentals', 'Guides'].map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab ? styles.tabActive : null]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab ? styles.tabTextActive : null]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Transactions List */}
                {Object.keys(groupedTransactions).map(month => (
                    <View key={month} style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>{month}</Text>
                            <View style={styles.sectionLine} />
                        </View>
                        {groupedTransactions[month].map(item => (
                            <TouchableOpacity key={item.id} style={styles.transactionCard}>
                                <View style={styles.iconCircle}>
                                    {renderIcon(item)}
                                </View>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <Text style={styles.itemSubtitle}>{item.date} • {item.category}</Text>
                                </View>
                                <View style={styles.itemRight}>
                                    <Text style={styles.itemAmount}>{item.amount}</Text>
                                    <View style={[styles.statusPill, item.status === 'PENDING' ? styles.statusPillPending : null]}>
                                        <Text style={[styles.statusText, item.status === 'PENDING' ? styles.statusTextPending : null]}>{item.status}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}

                {/* Summary Card */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Total Spent This Month</Text>
                    <View style={styles.summaryMainRow}>
                        <Text style={styles.summaryTotal}>$180.00</Text>
                        <View style={styles.growthBadge}>
                            <Feather name="trending-up" size={14} color="#60A5FA" style={{ marginRight: 6 }} />
                            <Text style={styles.growthText}>12% vs last month</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

            <BottomNav activeRoute="Transactions" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContainer: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 120,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: 'white',
    },
    searchContainer: {
        marginBottom: 24,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 16,
        height: 56,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.04,
        shadowRadius: 15,
        elevation: 4,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1E293B',
    },
    filterIconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(148, 163, 184, 0.05)',
        borderRadius: 30,
        padding: 6,
        marginBottom: 35,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 25,
    },
    tabActive: {
        backgroundColor: '#4AA5FC',
        shadowColor: '#4AA5FC',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    tabText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#64748B',
    },
    tabTextActive: {
        color: 'white',
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionHeaderText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 1,
        marginRight: 12,
    },
    sectionLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E2E8F0',
    },
    transactionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 14,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.03,
        shadowRadius: 20,
        elevation: 2,
    },
    iconCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 16,
    },
    itemTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    itemSubtitle: {
        fontSize: 13,
        color: '#94A3B8',
        fontWeight: '500',
    },
    itemRight: {
        alignItems: 'flex-end',
    },
    itemAmount: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 6,
    },
    statusPill: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusPillPending: {
        backgroundColor: '#F1F5F9',
    },
    statusText: {
        fontSize: 9,
        fontWeight: '900',
        color: '#3B82F6',
    },
    statusTextPending: {
        color: '#64748B',
    },
    summaryCard: {
        backgroundColor: '#4AA5FC',
        borderRadius: 35,
        padding: 30,
        marginTop: 10,
        shadowColor: '#4AA5FC',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
        elevation: 10,
    },
    summaryLabel: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
    },
    summaryMainRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    summaryTotal: {
        color: 'white',
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: -1,
    },
    growthBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    growthText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '800',
    },
});
