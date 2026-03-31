import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import { useTransaction } from '../context/TransactionContext';

const { width } = Dimensions.get('window');

const USER_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';

export default function TransactionsScreen({ navigation }) {
    const { transactions, loading } = useTransaction();
    const [activeTab, setActiveTab] = useState('All');

    const renderIcon = (item) => {
        if (item.iconType === 'Feather') {
            return <Feather name={item.icon} size={22} color="#000000" />;
        } else if (item.iconType === 'MaterialCommunityIcons') {
            return <MaterialCommunityIcons name={item.icon} size={24} color="#000000" />;
        }
        return <Feather name="box" size={22} color="#000000" />;
    };

    const groupedTransactions = transactions.reduce((acc, curr) => {
        const d = new Date(curr.date);
        const monthName = d.toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase();
        if (!acc[monthName]) acc[monthName] = [];
        acc[monthName].push(curr);
        return acc;
    }, {});

    return (
        <View style={styles.safeArea}>
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
                            <MaterialCommunityIcons name="filter-variant" size={20} color="#000000" />
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
                {transactions.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Feather name="shopping-bag" size={48} color="#CBD5E1" />
                        <Text style={styles.emptyTitle}>No Orders Yet</Text>
                        <Text style={styles.emptySubtitle}>When you buy or rent items, your transactions will appear here.</Text>
                    </View>
                ) : (
                    Object.keys(groupedTransactions).map(month => (
                        <View key={month} style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionHeaderText}>{month}</Text>
                                <View style={styles.sectionLine} />
                            </View>
                            {groupedTransactions[month].map(item => (
                                <TouchableOpacity 
                                    key={item.id} 
                                    style={styles.transactionCard}
                                    onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
                                >
                                    <View style={styles.iconCircle}>
                                        <Feather name="package" size={22} color="#000000" />
                                    </View>
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemTitle}>{item.items?.[0]?.title || item.items?.[0]?.name || 'Order'}</Text>
                                        <Text style={styles.itemSubtitle}>{new Date(item.date).toLocaleDateString()} • {item.items?.length || 1} Item(s)</Text>
                                    </View>
                                    <View style={styles.itemRight}>
                                        <Text style={styles.itemAmount}>${Number(item.totalAmount).toFixed(2)}</Text>
                                        <View style={[styles.statusPill, item.status === 'Pending' ? styles.statusPillPending : null]}>
                                            <Text style={[styles.statusText, item.status === 'Pending' ? styles.statusTextPending : null]}>{item.status}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))
                )}

                {/* Summary Card */}
                {transactions.length > 0 && (
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryLabel}>Total Spent (All Time)</Text>
                        <View style={styles.summaryMainRow}>
                            <Text style={styles.summaryTotal}>
                                ${transactions.reduce((acc, curr) => acc + Number(curr.totalAmount), 0).toFixed(2)}
                            </Text>
                            <View style={styles.growthBadge}>
                                <Ionicons name="cart" size={14} color="#333333" style={{ marginRight: 6 }} />
                                <Text style={styles.growthText}>{transactions.length} Orders</Text>
                            </View>
                        </View>
                    </View>
                )}

            </ScrollView>

            <BottomNav activeRoute="Transactions" />
        </View>
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
        backgroundColor: '#F8FAFC',
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
        backgroundColor: '#000000',
        shadowColor: '#000000',
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
        backgroundColor: '#F8FAFC',
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
        backgroundColor: '#F8FAFC',
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
        color: '#000000',
    },
    statusTextPending: {
        color: '#64748B',
    },
    summaryCard: {
        backgroundColor: '#000000',
        borderRadius: 35,
        padding: 30,
        marginTop: 10,
        shadowColor: '#000000',
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
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        backgroundColor: 'white',
        borderRadius: 24,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#CBD5E1',
        marginBottom: 30,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        paddingHorizontal: 30,
        lineHeight: 20,
    }
});
