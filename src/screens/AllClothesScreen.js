import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

export default function AllClothesScreen({ route, navigation }) {
    const { isLoggedIn } = useAuth();
    const { city, items = [] } = route.params || {};

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <View style={styles.headerTitleCont}>
                    <Text style={styles.headerTitle}>Style Guide</Text>
                    <Text style={styles.headerSub}>{city || 'Paris'}, France</Text>
                </View>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.grid}>
                    {items.map((item, index) => {
                        const isLocked = !isLoggedIn && index >= 3;

                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.itemCard}
                                activeOpacity={0.9}
                                onPress={() => isLocked ? navigation.navigate('Login') : null}
                            >
                                <View style={styles.imageContainer}>
                                    <Image 
                                        source={{ uri: item.img }} 
                                        style={styles.itemImage} 
                                        contentFit="cover" 
                                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                        transition={300}
                                    />
                                    <View style={styles.priceBadge}>
                                        <Text style={styles.priceText}>{item.price}</Text>
                                    </View>
                                    {isLocked && (
                                        <View style={styles.lockOverlay}>
                                            <Ionicons name="lock-closed" size={24} color="white" />
                                        </View>
                                    )}
                                </View>
                                <View style={styles.infoCont}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <Text style={styles.itemType}>{item.type}</Text>
                                    <TouchableOpacity style={styles.rentBtn}>
                                        <Text style={styles.rentBtnText}>Rent Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {!isLoggedIn && (
                    <TouchableOpacity
                        style={styles.unlockBanner}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.unlockTitle}>Want more styles?</Text>
                        <Text style={styles.unlockSub}>Unlock the full seasonal wardrobe</Text>
                        <View style={styles.unlockBtn}>
                            <Text style={styles.unlockBtnText}>Login to Unlock</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
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
        paddingHorizontal: 20,
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
    headerTitleCont: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
    },
    headerSub: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
        marginTop: 2,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 10,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    itemCard: {
        width: (width - 55) / 2,
        backgroundColor: 'white',
        borderRadius: 24,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
    },
    imageContainer: {
        width: '100%',
        height: 200,
        position: 'relative',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    priceBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    priceText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#0F172A',
    },
    lockOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoCont: {
        padding: 12,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    itemType: {
        fontSize: 11,
        color: '#3B82F6',
        fontWeight: '700',
        marginBottom: 12,
    },
    rentBtn: {
        backgroundColor: '#F1F5F9',
        paddingVertical: 8,
        borderRadius: 12,
        alignItems: 'center',
    },
    rentBtnText: {
        fontSize: 12,
        color: '#1E293B',
        fontWeight: '800',
    },
    unlockBanner: {
        backgroundColor: '#0F172A',
        borderRadius: 24,
        padding: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    unlockTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '900',
    },
    unlockSub: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
        marginTop: 5,
        marginBottom: 20,
    },
    unlockBtn: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 15,
    },
    unlockBtnText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 14,
    }
});
