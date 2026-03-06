import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const LOUVRE_IMG = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400';
const MARAIS_IMG = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
const AUTUMN_IMG = 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&q=80&w=400';
const SEINE_IMG = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400';

const ITEMS = [
    {
        id: '1',
        title: 'Louvre Morning',
        rent: '$24',
        buy: '$185',
        match: '98%',
        image: LOUVRE_IMG
    },
    {
        id: '2',
        title: 'Marais Chic',
        rent: '$32',
        buy: '$240',
        match: '85%',
        image: MARAIS_IMG
    },
    {
        id: '3',
        title: 'Autumn Beret',
        rent: '$12', // Added mock prices since cut off in image
        buy: '$45',
        match: '92%',
        image: AUTUMN_IMG,
        isSmallImage: true // In the design, this image doesn't fill the card fully, it has a white border box
    },
    {
        id: '4',
        title: 'Seine Stroll',
        rent: '$35', // Added mock prices
        buy: '$210',
        match: '76%',
        image: SEINE_IMG
    }
];

export default function WardrobeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

            <View style={styles.headerRow}>
                <View style={styles.locationPill}>
                    <Ionicons name="location" size={12} color="#3B82F6" />
                    <Text style={styles.locationText}>PARIS, FRANCE</Text>
                </View>
                <View style={styles.weatherPill}>
                    <Ionicons name="sunny" size={14} color="#F59E0B" />
                    <Text style={styles.weatherText}>12°C</Text>
                </View>
            </View>

            <View style={styles.titleRow}>
                <Text style={styles.mainTitle}>Apparel Selection</Text>
                <TouchableOpacity style={styles.filterBtn}>
                    <Feather name="sliders" size={18} color="#0F172A" />
                </TouchableOpacity>
            </View>

            {/* Tags Scroll */}
            <View style={styles.tagsWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagsScroll}>
                    <TouchableOpacity style={[styles.tag, styles.tagActive]}>
                        <Text style={[styles.tagText, styles.tagTextActive]}>All Styles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.tagText}>Chic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.tagText}>Evening</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.tagText}>Streetwear</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                <View style={styles.gridContainer}>
                    {ITEMS.map((item, index) => {
                        return (
                            <View key={item.id} style={styles.itemCard}>
                                <View style={styles.imageContainer}>
                                    {item.isSmallImage ? (
                                        <View style={styles.smallImageWrap}>
                                            <Image source={{ uri: item.image }} style={styles.itemImageSmall} />
                                        </View>
                                    ) : (
                                        <Image source={{ uri: item.image }} style={styles.itemImage} contentFit="cover" />
                                    )}
                                    <View style={styles.matchBadge}>
                                        <Text style={styles.matchText}>{item.match} MATCH</Text>
                                    </View>
                                </View>

                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <View style={styles.priceRow}>
                                        <View>
                                            <Text style={styles.priceLabel}>RENT</Text>
                                            <Text style={styles.priceValueBlue}>{item.rent}<Text style={styles.priceUnit}>/d</Text></Text>
                                        </View>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={styles.priceLabel}>BUY</Text>
                                            <Text style={styles.priceValueDark}>{item.buy}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Quick Rent Button */}
            <View style={styles.actionBtnWrapper}>
                <TouchableOpacity
                    style={styles.actionBtn}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('WardrobeCheckout')}
                >
                    <Ionicons name="flash" size={16} color="white" />
                    <Text style={styles.actionBtnText}>QUICK-RENT SELECTED LOOK</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 15,
        marginBottom: 20,
    },
    locationPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    locationText: {
        color: '#3B82F6',
        fontSize: 10,
        fontWeight: '800',
        marginLeft: 6,
        letterSpacing: 0.5,
    },
    weatherPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    weatherText: {
        color: '#0F172A',
        fontSize: 12,
        fontWeight: '800',
        marginLeft: 6,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: '900',
        color: '#0F172A',
    },
    filterBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    tagsWrapper: {
        marginBottom: 15,
    },
    tagsScroll: {
        paddingHorizontal: 20,
    },
    tag: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    tagActive: {
        backgroundColor: '#60A5FA',
        borderColor: '#60A5FA',
        shadowColor: '#60A5FA',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    tagText: {
        color: '#475569',
        fontSize: 13,
        fontWeight: '700',
    },
    tagTextActive: {
        color: 'white',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 120, // accommodate bottom action btn
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    itemCard: {
        backgroundColor: 'white',
        width: '48%',
        borderRadius: 24,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: 180,
        backgroundColor: '#F3F4F6', // lighter grey background
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    smallImageWrap: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    itemImageSmall: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        contentFit: 'cover',
    },
    matchBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#60A5FA',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    matchText: {
        color: 'white',
        fontSize: 8,
        fontWeight: '800',
    },
    itemInfo: {
        padding: 15,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 15,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    priceLabel: {
        fontSize: 8,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    priceValueBlue: {
        fontSize: 14,
        fontWeight: '800',
        color: '#38BDF8',
    },
    priceUnit: {
        fontSize: 10,
        color: '#94A3B8',
        fontWeight: '700',
    },
    priceValueDark: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0F172A',
    },

    // Action Button
    actionBtnWrapper: {
        position: 'absolute',
        bottom: 100, // Right above the floating nav
        left: 20,
        right: 20,
    },
    actionBtn: {
        flexDirection: 'row',
        backgroundColor: '#4B8BF5',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        shadowColor: '#4B8BF5',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },
    actionBtnText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '800',
        marginLeft: 8,
        letterSpacing: 0.5,
    },
});
