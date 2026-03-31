import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

const POSE_SILHOUETTE = 'https://cdn-icons-png.flaticon.com/512/32/32339.png'; // Mock silhouette icon
const DEFAULT_GALLERY_PREVIEW = 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=100';

export default function CameraScreen({ navigation, route }) {
    const { initialFacing = 'back', initialFlash = 'off', initialZoom = 0 } = route.params || {};
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState(initialFacing.toLowerCase() === 'front' ? 'front' : 'back');
    const [flash, setFlash] = useState(initialFlash.toLowerCase() === 'on' ? 'on' : (initialFlash.toLowerCase() === 'auto' ? 'auto' : 'off'));
    const [activeZoom, setActiveZoom] = useState(initialZoom === 0.5 ? '0.5x' : (initialZoom === 2 ? '2x' : '1x'));
    const [zoomLevel, setZoomLevel] = useState(initialZoom === 2 ? 0.01 : 0);
    const [photoUri, setPhotoUri] = useState(null);
    const [isoValue, setIsoValue] = useState(400);
    const [exposureValue, setExposureValue] = useState(-0.3);
    const [matchPercent, setMatchPercent] = useState(87);
    const cameraRef = useRef(null);

    // Dynamic match pulsing logic
    React.useEffect(() => {
        const interval = setInterval(() => {
            setMatchPercent(prev => {
                const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                return Math.min(92, Math.max(84, prev + change));
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleZoom = (level) => {
        setActiveZoom(level);
        if (level === '0.5x') setZoomLevel(0);
        else if (level === '1x') setZoomLevel(0);
        else if (level === '2x') setZoomLevel(0.01);
    };

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const toggleFlash = () => {
        setFlash(current => (current === 'off' ? 'on' : 'off'));
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                setPhotoUri(photo.uri);
            } catch (e) {
                Alert.alert("Error", "Failed to take picture");
            }
        }
    };

    if (!permission) {
        return <View style={styles.container} />; // Loading
    }

    if (!permission.granted) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
                <Text style={{ color: 'white', marginBottom: 20, textAlign: 'center', fontSize: 16 }}>
                    We need your permission to show the camera
                </Text>
                <TouchableOpacity onPress={requestPermission} style={{ backgroundColor: '#000000', padding: 15, borderRadius: 10 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent />

            {/* Camera View */}
            <CameraView 
                ref={cameraRef}
                style={styles.cameraView} 
                facing={facing}
                flash={flash}
                zoom={zoomLevel}
                animateShutter={true}
            />

            {/* Sub-layers for overlays */}
            <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
                {/* Silhouette Overlay */}
                <View style={styles.silhouetteContainer}>
                    <View style={styles.headCircle} />
                    <View style={styles.bodyGuideline} />
                </View>

                {/* Top Controls */}
                <View style={styles.topControls}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topIconBtn}>
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>

                        <View style={styles.matchPill}>
                            <Text style={styles.matchText}>MATCH <Text style={styles.matchValue}>{matchPercent}%</Text></Text>
                            <View style={styles.progressTrack}>
                                <View style={[styles.progressFill, { width: `${matchPercent}%` }]} />
                            </View>
                        </View>

                        <TouchableOpacity onPress={toggleFlash} style={styles.topIconBtn}>
                            <MaterialCommunityIcons name={flash === 'off' ? "flash-off" : "flash"} size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Right Perspective Sidebar */}
                <View style={styles.rightSidebar}>
                    <BlurView intensity={30} tint="dark" style={styles.sidebarBlur}>
                        <TouchableOpacity 
                            style={[styles.sidebarBtn, styles.sidebarBtnActive]}
                            onPress={() => Alert.alert("Pose Guide", "Pose guide updated to 'Fashion Walk'")}
                        >
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100' }}
                                style={styles.poseThumbnail}
                                contentFit="cover"
                            />
                            <View style={styles.activeIndicator} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sidebarBtn} onPress={() => Alert.alert("Guide Layer", "Body guide activated.")}>
                            <Ionicons name="body" size={20} color="rgba(255,255,255,0.6)" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sidebarBtn} onPress={() => Alert.alert("Guide Layer", "Perspective guide activated.")}>
                            <MaterialCommunityIcons name="human-handsup" size={20} color="rgba(255,255,255,0.6)" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sidebarBtn} onPress={() => Alert.alert("Guide Layer", "Full body frame activated.")}>
                            <MaterialCommunityIcons name="human-male-board" size={20} color="rgba(255,255,255,0.6)" />
                        </TouchableOpacity>
                        <View style={styles.sidebarDivider} />
                        <TouchableOpacity onPress={toggleCameraFacing} style={styles.sidebarBtn}>
                            <Ionicons name="camera-reverse" size={24} color="white" />
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
                                <Text style={styles.settingValue}>{Math.round(isoValue)}</Text>
                            </View>
                            <View style={styles.sliderFlex}>
                                <Slider
                                    style={styles.actualSlider}
                                    minimumValue={100}
                                    maximumValue={3200}
                                    value={isoValue}
                                    onValueChange={setIsoValue}
                                    minimumTrackTintColor="white"
                                    maximumTrackTintColor="rgba(255,255,255,0.2)"
                                    thumbTintColor="white"
                                />
                            </View>
                            <View style={[styles.settingItem, { alignItems: 'flex-end' }]}>
                                <Text style={styles.settingLabel}>EXPOSURE</Text>
                                <Text style={styles.settingValueBlue}>{exposureValue.toFixed(1)}</Text>
                            </View>
                        </View>

                        <View style={styles.exposureSliderRow}>
                             <Slider
                                style={styles.actualSlider}
                                minimumValue={-2}
                                maximumValue={2}
                                step={0.1}
                                value={exposureValue}
                                onValueChange={setExposureValue}
                                minimumTrackTintColor="#000000"
                                maximumTrackTintColor="rgba(255,255,255,0.2)"
                                thumbTintColor="#000000"
                            />
                        </View>

                        <View style={styles.zoomRow}>
                            <TouchableOpacity onPress={() => handleZoom('0.5x')} style={[styles.zoomBtn, activeZoom === '0.5x' && styles.zoomBtnActive]}>
                                <Text style={activeZoom === '0.5x' ? styles.zoomTextActive : styles.zoomText}>0.5×</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleZoom('1x')} style={[styles.zoomBtn, activeZoom === '1x' && styles.zoomBtnActive]}>
                                <Text style={activeZoom === '1x' ? styles.zoomTextActive : styles.zoomText}>1×</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleZoom('2x')} style={[styles.zoomBtn, activeZoom === '2x' && styles.zoomBtnActive]}>
                                <Text style={activeZoom === '2x' ? styles.zoomTextActive : styles.zoomText}>2×</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>

                    {/* Shutter Bar */}
                    <View style={styles.shutterBar}>
                        <TouchableOpacity style={styles.galleryPreview} onPress={() => navigation.navigate('Gallery')}>
                            <Image 
                                source={{ uri: photoUri || DEFAULT_GALLERY_PREVIEW }} 
                                style={styles.galleryImg} 
                                contentFit="cover"
                            />
                        </TouchableOpacity>

                        <View style={styles.shutterOuter}>
                            <TouchableOpacity onPress={takePicture} style={styles.shutterInner}>
                                <View style={styles.shutterDot} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.proModeBtn} onPress={() => Alert.alert("Pro Mode", "Switching to Manual Focus & Exposure.")}>
                            <MaterialCommunityIcons name="tune-vertical" size={20} color="white" />
                            <Text style={styles.proText}>PRO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        color: '#000000',
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
        backgroundColor: '#000000',
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
        borderColor: '#000000',
    },
    activeIndicator: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#000000',
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
        color: '#000000',
        fontSize: 16,
        fontWeight: '900',
    },
    sliderFlex: {
        flex: 1,
        marginHorizontal: 10,
    },
    actualSlider: {
        width: '100%',
        height: 40,
    },
    exposureSliderRow: {
        marginBottom: 10,
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
        backgroundColor: '#000000',
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
        backgroundColor: '#000000',
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
