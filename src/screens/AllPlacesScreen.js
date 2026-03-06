import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

export default function AllPlacesScreen({ route, navigation }) {
    const { isLoggedIn } = useAuth();
    const { title, items = [] } = route.params || {};

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title || 'Top Experiences'}</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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
                                <Image source={{ uri: item.img }} style={styles.itemImage} contentFit="cover" />
                                {isLocked && (
                                    <View style={styles.lockOverlay}>
                                        <Ionicons name="lock-closed" size={30} color="white" />
                                        <Text style={styles.lockText}>Login to View</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.itemInfo}>
                                <View style={styles.titleRow}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <View style={styles.ratingBadge}>
                                        <Ionicons name="star" size={12} color="#FACC15" />
                                        <Text style={styles.ratingText}>4.9</Text>
                                    </View>
                                </View>
                                <Text style={styles.itemSub}>{item.sub}</Text>
                                <Text style={styles.itemDesc}>Indulge in a premium experience at this iconic location. Perfect for photo ops and creating lasting memories.</Text>
                                <View style={styles.itemFooter}>
                                    <View style={styles.tagPill}>
                                        <Feather name="camera" size={10} color="#3B82F6" />
                                        <Text style={styles.tagText}>TRENDING</Text>
                                    </View>
                                    <TouchableOpacity style={styles.detailsBtn}>
                                        <Text style={styles.detailsBtnText}>View Map</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}

                {!isLoggedIn && items.length > 3 && (
                    <TouchableOpacity
                        style={styles.unlockCard}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Ionicons name="lock-open" size={24} color="#3B82F6" />
                        <Text style={styles.unlockTitle}>Unlock {items.length - 3} More Experiences</Text>
                        <Text style={styles.unlockSub}>Login to access the full local guide</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAF9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FAFAF9',
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
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 10,
    },
    itemCard: {
        backgroundColor: 'white',
        borderRadius: 28,
        marginBottom: 25,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 5,
    },
    imageContainer: {
        width: '100%',
        height: 240,
        position: 'relative',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    lockOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px)',
    },
    lockText: {
        color: 'white',
        marginTop: 10,
        fontWeight: '800',
        fontSize: 16,
    },
    itemInfo: {
        padding: 20,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0F172A',
        flex: 1,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF9C3',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#854D0E',
        marginLeft: 4,
    },
    itemSub: {
        fontSize: 14,
        color: '#3B82F6',
        fontWeight: '700',
        marginBottom: 12,
    },
    itemDesc: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
        marginBottom: 20,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tagPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#3B82F6',
        marginLeft: 6,
        letterSpacing: 0.5,
    },
    detailsBtn: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
    },
    detailsBtnText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 13,
    },
    unlockCard: {
        backgroundColor: '#F0F7FF',
        borderRadius: 24,
        padding: 30,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#3B82F6',
        borderStyle: 'dashed',
    },
    unlockTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
        marginTop: 15,
    },
    unlockSub: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 5,
        fontWeight: '500',
    }
});
