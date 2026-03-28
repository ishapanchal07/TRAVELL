import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions, Modal, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import ShareService from '../services/ShareService';
import { useSaved } from '../context/SavedContext';

const { width } = Dimensions.get('window');

export default function SnapSpotDetailsScreen({ navigation, route }) {
    const { spot, city } = route.params || {};
    const { toggleSaveGem, isGemSaved } = useSaved();
    
    // Camera Settings State
    const [zoom, setZoom] = React.useState(0.5);
    const [showSettings, setShowSettings] = React.useState(false);
    const [flash, setFlash] = React.useState('Auto');
    const [cameraMode, setCameraMode] = React.useState('Back');
    const [gridEnabled, setGridEnabled] = React.useState(false);

    if (!spot) return null;

    const description = spot.description || "This iconic location offers one of the best perspectives in the city. Perfectly timed for sunrise or golden hour, it provides a stunning backdrop for your travel memories and social media feed.";

    const handleShare = async () => {
        await ShareService.shareItem({
            title: spot.title,
            description: description,
            image: spot.img
        });
    };

    const toggleZoom = () => {
        const levels = [0.5, 1, 2];
        const currentIndex = levels.indexOf(zoom);
        const nextIndex = (currentIndex + 1) % levels.length;
        setZoom(levels[nextIndex]);
    };

    const getZoomLabel = () => {
        if (zoom === 0.5) return "0.5x Ultra Wide";
        if (zoom === 1) return "1x Standard";
        return "2x Telephoto";
    };

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

                    <TouchableOpacity 
                        style={styles.shareButton} 
                        onPress={handleShare}
                    >
                        <Feather name="share-2" size={20} color="white" />
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
                        <TouchableOpacity 
                            style={styles.saveBtn}
                            onPress={() => toggleSaveGem({ ...spot, id: spot.id || spot.title, type: 'SnapSpot', city })}
                        >
                            <Ionicons 
                                name={isGemSaved(spot.id || spot.title) ? "bookmark" : "bookmark-outline"} 
                                size={24} 
                                color={isGemSaved(spot.id || spot.title) ? "#000000" : "#0F172A"} 
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

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
                            <TouchableOpacity 
                                style={styles.tipIconBox}
                                onPress={() => navigation.navigate('Camera', { 
                                    initialFlash: flash, 
                                    initialZoom: zoom,
                                    initialFacing: cameraMode
                                })}
                            >
                                <Ionicons name="camera" size={20} color="#000000" />
                            </TouchableOpacity>
                            <View style={styles.tipInfo}>
                                <TouchableOpacity onPress={() => setShowSettings(true)}>
                                    <Text style={styles.tipTitle}>Settings</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleZoom}>
                                    <Text style={styles.tipValue}>{getZoomLabel()}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Camera Settings Modal */}
                        <Modal
                            visible={showSettings}
                            transparent={true}
                            animationType="slide"
                            onRequestClose={() => setShowSettings(false)}
                        >
                            <Pressable 
                                style={styles.modalOverlay} 
                                onPress={() => setShowSettings(false)}
                            >
                                <View style={styles.modalContent}>
                                    <View style={styles.modalHeader}>
                                        <View style={styles.modalHandle} />
                                        <Text style={styles.modalTitle}>Camera Settings</Text>
                                    </View>

                                    <View style={styles.settingsList}>
                                        <View style={styles.settingItem}>
                                            <View style={styles.settingLabelCont}>
                                                <Ionicons name="flash" size={20} color="#0F172A" />
                                                <Text style={styles.settingLabel}>Flash Mode</Text>
                                            </View>
                                            <View style={styles.optionRow}>
                                                {['Off', 'Auto', 'On'].map(mode => (
                                                    <TouchableOpacity 
                                                        key={mode}
                                                        style={[styles.optionPill, flash === mode && styles.optionPillActive]}
                                                        onPress={() => setFlash(mode)}
                                                    >
                                                        <Text style={[styles.optionText, flash === mode && styles.optionTextActive]}>{mode}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>

                                        <View style={styles.settingItem}>
                                            <View style={styles.settingLabelCont}>
                                                <Ionicons name="sync" size={20} color="#0F172A" />
                                                <Text style={styles.settingLabel}>Camera Switch</Text>
                                            </View>
                                            <View style={styles.optionRow}>
                                                {['Back', 'Front'].map(mode => (
                                                    <TouchableOpacity 
                                                        key={mode}
                                                        style={[styles.optionPill, cameraMode === mode && styles.optionPillActive]}
                                                        onPress={() => setCameraMode(mode)}
                                                    >
                                                        <Text style={[styles.optionText, cameraMode === mode && styles.optionTextActive]}>{mode}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>

                                        <View style={styles.settingItem}>
                                            <View style={styles.settingLabelCont}>
                                                <Ionicons name="grid" size={20} color="#0F172A" />
                                                <Text style={styles.settingLabel}>Grid Overlay</Text>
                                            </View>
                                            <TouchableOpacity 
                                                style={[styles.toggleBtn, gridEnabled && styles.toggleBtnActive]}
                                                onPress={() => setGridEnabled(!gridEnabled)}
                                            >
                                                <View style={[styles.toggleThumb, gridEnabled && styles.toggleThumbActive]} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <TouchableOpacity 
                                        style={styles.closeBtn}
                                        onPress={() => setShowSettings(false)}
                                    >
                                        <Text style={styles.closeBtnText}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                            </Pressable>
                        </Modal>
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
    shareButton: {
        position: 'absolute',
        top: 50,
        right: 20,
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
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 25,
        paddingBottom: 40,
        paddingTop: 15,
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 25,
    },
    modalHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#E2E8F0',
        borderRadius: 2,
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0F172A',
    },
    settingsList: {
        gap: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    settingLabelCont: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    optionRow: {
        flexDirection: 'row',
        gap: 8,
    },
    optionPill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    optionPillActive: {
        backgroundColor: '#000000',
        borderColor: '#000000',
    },
    optionText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
    },
    optionTextActive: {
        color: 'white',
    },
    toggleBtn: {
        width: 52,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E2E8F0',
        padding: 4,
    },
    toggleBtnActive: {
        backgroundColor: '#10B981',
    },
    toggleThumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    toggleThumbActive: {
        transform: [{ translateX: 24 }],
    },
    closeBtn: {
        backgroundColor: '#0F172A',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
    },
    closeBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
    },
});
