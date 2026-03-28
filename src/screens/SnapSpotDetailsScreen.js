import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SnapSpotDetailsScreen({ navigation, route }) {
    const { spot, city } = route.params || {};

    if (!spot) return null;

    const description = spot.description || "This iconic location offers one of the best perspectives in the city. Perfectly timed for sunrise or golden hour, it provides a stunning backdrop for your travel memories and social media feed.";

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {/* Hero Image */}
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: spot.img }} 
                        style={styles.heroImage} 
                        contentFit="cover"
                        transition={300}
                    />
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={() => navigation.goBack()}
                    >
                        <Feather name="chevron-left" size={24} color="white" />
                    </TouchableOpacity>
                    
                    <View style={styles.imageOverlay}>
                        <View style={styles.viewBadge}>
                            <Ionicons name="eye" size={14} color="white" />
                            <Text style={styles.viewText}>1.2k Views</Text>
                        </View>
                    </View>
                </View>

                {/* Content */}
                <View style={styles.contentSection}>
                    <View style={styles.titleRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.spotTitle}>{spot.title}</Text>
                            <View style={styles.locationRow}>
                                <Ionicons name="location" size={16} color="#000000" />
                                <Text style={styles.locationText}>{city}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.saveBtn}>
                            <Ionicons name="bookmark-outline" size={24} color="#0F172A" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionHeading}>About this Spot</Text>
                    <Text style={styles.description}>{description}</Text>

                    <View style={styles.tipsContainer}>
                        <View style={styles.tipItem}>
                            <View style={styles.tipIconBox}>
                                <Ionicons name="sunny" size={20} color="#000000" />
                            </View>
                            <View style={styles.tipInfo}>
                                <Text style={styles.tipTitle}>Best Time</Text>
                                <Text style={styles.tipValue}>Golden Hour (5:30 PM)</Text>
                            </View>
                        </View>
                        <View style={styles.tipItem}>
                            <View style={styles.tipIconBox}>
                                <Ionicons name="camera" size={20} color="#000000" />
                            </View>
                            <View style={styles.tipInfo}>
                                <Text style={styles.tipTitle}>Settings</Text>
                                <Text style={styles.tipValue}>0.5x Ultra Wide</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.actionButton} 
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('Map', { city: city, location: spot.title })}
                    >
                        <Text style={styles.actionButtonText}>Get Directions</Text>
                        <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    imageContainer: {
        width: '100%',
        height: 450,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        paddingHorizontal: 20,
        paddingBottom: 20,
        justifyContent: 'flex-end',
    },
    viewBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    viewText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 6,
    },
    contentSection: {
        paddingHorizontal: 25,
        paddingTop: 30,
        marginTop: -30,
        backgroundColor: 'white',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    spotTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    locationText: {
        fontSize: 15,
        color: '#000000',
        marginLeft: 5,
        fontWeight: '600',
    },
    saveBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 25,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        color: '#64748B',
        lineHeight: 24,
    },
    tipsContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 35,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
        backgroundColor: '#F8FAFC',
        padding: 15,
        borderRadius: 20,
    },
    tipIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
    tipInfo: {
        marginLeft: 12,
        flex: 1,
    },
    tipTitle: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94A3B8',
        textTransform: 'uppercase',
    },
    tipValue: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0F172A',
        marginTop: 2,
    },
    actionButton: {
        backgroundColor: '#000000',
        height: 60,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    actionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
    },
});
