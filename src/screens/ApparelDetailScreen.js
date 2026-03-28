import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function ApparelDetailScreen({ route, navigation }) {
    const { item = {} } = route.params || {};

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Apparel Details</Text>
                <TouchableOpacity style={styles.shareBtn}>
                    <Feather name="share-2" size={20} color="#0F172A" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: item.image }} 
                        style={styles.mainImage} 
                        contentFit="cover" 
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                        transition={300}
                    />
                    <View style={styles.matchBadge}>
                        <Text style={styles.matchText}>{item.match || '95%'} MATCH</Text>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{item.title || 'Apparel Item'}</Text>
                        <TouchableOpacity>
                            <Ionicons name="heart-outline" size={24} color="#0F172A" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.brand}>Premium Roamster Collection</Text>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Ionicons name="star" size={16} color="#FACC15" />
                            <Text style={styles.statText}>4.9 (48 Reviews)</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <MaterialCommunityIcons name="leaf" size={16} color="#10B981" />
                            <Text style={styles.statText}>Sustainable</Text>
                        </View>
                    </View>

                    <Text style={styles.description}>
                        This piece is specifically selected for your trip to Paris. Its lightweight yet warm fabric makes it perfect for the 12°C autumn breeze. Designed for both style and comfort during long city strolls.
                    </Text>

                    <View style={styles.recommendationBox}>
                        <Ionicons name="information-circle" size={20} color="#000000" />
                        <View style={styles.recommendationContent}>
                            <Text style={styles.recommendationTitle}>Style Recommendation</Text>
                            <Text style={styles.recommendationText}>Matches your "Paris Chic" preference. Perfect for morning visits to the Louvre.</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.buyNowSectionBtn}
                        onPress={() => navigation.navigate('PurchaseFlow', { item })}
                    >
                        <Text style={styles.buyNowSectionBtnText}>BUY NOW • {item.buy || '$185'}</Text>
                        <Ionicons name="arrow-forward" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.rentBtn}
                    onPress={() => navigation.navigate('RentFlow', { item })}
                >
                    <Text style={styles.rentBtnText}>RENT • {item.rent || '$24'}/d</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buyBtn}
                    onPress={() => navigation.navigate('PurchaseFlow', { item })}
                >
                    <Text style={styles.buyBtnText}>BUY • {item.buy || '$185'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    shareBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    imageContainer: {
        width: '100%',
        height: 400,
        position: 'relative',
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    matchBadge: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#000000',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    matchText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '800',
    },
    infoSection: {
        padding: 24,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0F172A',
    },
    brand: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '600',
        marginBottom: 16,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#475569',
        marginLeft: 6,
    },
    statDivider: {
        width: 1,
        height: 12,
        backgroundColor: '#E2E8F0',
        marginHorizontal: 12,
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        color: '#475569',
        marginBottom: 24,
    },
    recommendationBox: {
        flexDirection: 'row',
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 16,
        alignItems: 'flex-start',
    },
    recommendationContent: {
        marginLeft: 12,
        flex: 1,
    },
    recommendationTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#222222',
        marginBottom: 4,
    },
    recommendationText: {
        fontSize: 13,
        color: '#222222',
        lineHeight: 18,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingBottom: 35,
    },
    rentBtn: {
        flex: 1,
        backgroundColor: '#000000',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    rentBtnText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '800',
    },
    buyBtn: {
        flex: 1,
        backgroundColor: '#0F172A',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buyBtnText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '800',
    },
    buyNowSectionBtn: {
        flexDirection: 'row',
        backgroundColor: '#0F172A',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        paddingHorizontal: 20,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buyNowSectionBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '900',
        marginRight: 10,
    },
});
