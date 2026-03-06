import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ImageBackground } from 'expo-image';
import { Ionicons, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const EIFFEL_BG = 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&q=80&w=800';
const POSE_SILHOUETTE = 'https://cdn-icons-png.flaticon.com/512/32/32339.png'; // Mock silhouette icon
const GALLERY_PREVIEW = 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=100';

export default function CameraScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent />

            {/* Camera View (Background) */}
            <ImageBackground source={{ uri: EIFFEL_BG }} style={styles.cameraView} contentFit="cover">
                {/* Silhouette Overlay */}
                <View style={styles.silhouetteContainer}>
                    <View style={styles.headCircle} />
                    <View style={styles.bodyGuideline} />
                </View>

                {/* Top Controls */}
                <SafeAreaView style={styles.topControls}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topIconBtn}>
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>

                        <View style={styles.matchPill}>
                            <Text style={styles.matchText}>MATCH <Text style={styles.matchValue}>87%</Text></Text>
                            <View style={styles.progressTrack}>
                                <View style={[styles.progressFill, { width: '87%' }]} />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.topIconBtn}>
                            <MaterialCommunityIcons name="flash-off" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                {/* Right Perspective Sidebar */}
                <View style={styles.rightSidebar}>
                    <BlurView intensity={30} tint="dark" style={styles.sidebarBlur}>
                        <TouchableOpacity style={[styles.sidebarBtn, styles.sidebarBtnActive]}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100' }}
                                style={styles.poseThumbnail}
                            />
                            <View style={styles.activeIndicator} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sidebarBtn}>
                            <Ionicons name="body" size={20} color="rgba(255,255,255,0.6)" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sidebarBtn}>
                            <MaterialCommunityIcons name="human-handsup" size={20} color="rgba(255,255,255,0.6)" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sidebarBtn}>
                            <MaterialCommunityIcons name="human-male-board" size={20} color="rgba(255,255,255,0.6)" />
                        </TouchableOpacity>
                        <View style={styles.sidebarDivider} />
                        <TouchableOpacity style={styles.sidebarBtn}>
                            <Ionicons name="add" size={24} color="white" />
                        </TouchableOpacity>
                    </BlurView>
                </View>

                {/* Lower Camera UI Overlay */}
                <View style={styles.bottomOverlay}>
                    {/* Settings Panel */}
                    <BlurView intensity={60} tint="dark" style={styles.settingsPanel}>
                        <View style={styles.settingsRow}>
                            <View style={styles.settingItem}>
                                <Text style={styles.settingLabel}>ISO</Text>
                                <Text style={styles.settingValue}>400</Text>
                            </View>
                            <View style={styles.sliderTrack}>
                                <View style={styles.sliderThumb} />
                            </View>
                            <View style={[styles.settingItem, { alignItems: 'flex-end' }]}>
                                <Text style={styles.settingLabel}>EXPOSURE</Text>
                                <Text style={styles.settingValueBlue}>-0.3</Text>
                            </View>
                        </View>

                        <View style={styles.zoomRow}>
                            <TouchableOpacity style={styles.zoomBtn}>
                                <Text style={styles.zoomText}>0.5×</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.zoomBtn, styles.zoomBtnActive]}>
                                <Text style={styles.zoomTextActive}>1×</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.zoomBtn}>
                                <Text style={styles.zoomText}>2×</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>

                    {/* Shutter Bar */}
                    <View style={styles.shutterBar}>
                        <TouchableOpacity style={styles.galleryPreview}>
                            <Image source={{ uri: GALLERY_PREVIEW }} style={styles.galleryImg} />
                        </TouchableOpacity>

                        <View style={styles.shutterOuter}>
                            <TouchableOpacity style={styles.shutterInner}>
                                <View style={styles.shutterDot} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.proModeBtn}>
                            <MaterialCommunityIcons name="tune-vertical" size={20} color="white" />
                            <Text style={styles.proText}>PRO</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    cameraView: {
        flex: 1,
    },
    // Silhouette AR Guide
    silhouetteContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.3,
    },
    headCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        borderStyle: 'dashed',
        marginBottom: 20,
    },
    bodyGuideline: {
        width: 180,
        height: 300,
        borderWidth: 2,
        borderColor: 'white',
        borderStyle: 'dashed',
        borderTopLeftRadius: 90,
        borderTopRightRadius: 90,
    },

    // Top Controls
    topControls: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topIconBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    matchPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        height: 44,
        paddingHorizontal: 15,
        borderRadius: 22,
        minWidth: 180,
    },
    matchText: {
        color: '#38BDF8',
        fontSize: 10,
        fontWeight: '900',
        marginRight: 10,
    },
    matchValue: {
        color: 'white',
        fontSize: 12,
    },
    progressTrack: {
        flex: 1,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#38BDF8',
        borderRadius: 2,
    },

    // Right Sidebar
    rightSidebar: {
        position: 'absolute',
        right: 20,
        top: height * 0.2,
    },
    sidebarBlur: {
        borderRadius: 25,
        padding: 6,
        alignItems: 'center',
    },
    sidebarBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4,
    },
    sidebarBtnActive: {
        padding: 2,
    },
    poseThumbnail: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#38BDF8',
    },
    activeIndicator: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#38BDF8',
        borderWidth: 1.5,
        borderColor: 'rgba(15, 23, 42, 1)',
    },
    sidebarDivider: {
        width: 20,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: 10,
    },

    // Bottom Overlay
    bottomOverlay: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    settingsPanel: {
        borderRadius: 35,
        padding: 25,
        marginBottom: 30,
        overflow: 'hidden',
    },
    settingsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    settingItem: {
        width: 80,
    },
    settingLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 8,
        fontWeight: '900',
        marginBottom: 4,
    },
    settingValue: {
        color: 'white',
        fontSize: 16,
        fontWeight: '900',
    },
    settingValueBlue: {
        color: '#38BDF8',
        fontSize: 16,
        fontWeight: '900',
    },
    sliderTrack: {
        flex: 1,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginHorizontal: 15,
        justifyContent: 'center',
    },
    sliderThumb: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'white',
        position: 'absolute',
        left: '60%',
        marginLeft: -6,
    },
    zoomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomBtn: {
        width: 50,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    zoomBtnActive: {
        backgroundColor: '#38BDF8',
        width: 65,
        height: 40,
    },
    zoomText: {
        color: 'white',
        fontSize: 11,
        fontWeight: '900',
    },
    zoomTextActive: {
        color: '#0F172A',
        fontSize: 13,
        fontWeight: '900',
    },

    // Shutter Bar
    shutterBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    galleryPreview: {
        width: 50,
        height: 50,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'white',
        padding: 2,
    },
    galleryImg: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    shutterOuter: {
        width: 84,
        height: 84,
        borderRadius: 42,
        borderWidth: 4,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shutterInner: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shutterDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3B82F6',
    },
    proModeBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    proText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 7,
        fontWeight: '900',
        marginTop: 2,
    }
});
