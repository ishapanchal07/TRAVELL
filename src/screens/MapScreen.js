import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Linking, Platform, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const CITY_COORDS = {
    'Paris': { latitude: 48.8566, longitude: 2.3522, latitudeDelta: 0.1, longitudeDelta: 0.1 },
    'Rome': { latitude: 41.9028, longitude: 12.4964, latitudeDelta: 0.1, longitudeDelta: 0.1 },
    'Switzerland': { latitude: 46.8182, longitude: 8.2275, latitudeDelta: 2.0, longitudeDelta: 2.0 },
    'Dubai': { latitude: 25.2048, longitude: 55.2708, latitudeDelta: 0.2, longitudeDelta: 0.2 },
    'Italy': { latitude: 41.8719, longitude: 12.5674, latitudeDelta: 5.0, longitudeDelta: 5.0 },
};

const LOCATION_DATA = {
    'Chapel Bridge': { lat: 47.0516, lng: 8.3073, rating: 4.7, reviews: '35,464', localName: 'Kapellbrücke', phone: '+41 41 227 17 17' },
    'Kapellbrücke Bridge': { lat: 47.0516, lng: 8.3073, rating: 4.7, reviews: '35,464', localName: 'Kapellbrücke' },
    'Jungfraujoch Train': { lat: 46.5475, lng: 7.9854, rating: 4.8, reviews: '12,500', localName: 'Top of Europe' },
    'Matterhorn Hike': { lat: 45.9766, lng: 7.6585, rating: 4.9, reviews: '8,200', localName: 'Matterhorn' },
    'Eiffel Tower': { lat: 48.8584, lng: 2.2945, rating: 4.7, reviews: '300,000+', localName: 'Tour Eiffel' },
    'Burj Khalifa': { lat: 25.1972, lng: 55.2744, rating: 4.8, reviews: '150,000+', localName: 'Burj Khalifa' },
};

const INJECTED_JS = `
  (function() {
    const style = document.createElement('style');
    style.innerHTML = 
      .ml-promotion-container, .scene-footer-container, .searchbox-container, 
      #searchbox-container, .cards-layout, .widget-reveal-card, .suggest-container,
      .ml-promotion, .ml-app-promotion, .ml-promotion-banner {
        display: none !important;
      }
      .gm-style-cc { display: none !important; }
      .gmnoprint { display: none !important; }
    \`;
    document.head.appendChild(style);
  })();
  true;
`;

export default function MapScreen({ route, navigation }) {
    const webViewRef = useRef(null);
    const { city = 'Paris', location } = route.params || {};
    
    // Get location detail if available
    const specificLocation = LOCATION_DATA[location] || null;
    const lat = specificLocation?.lat || CITY_COORDS[city]?.latitude || 0;
    const lng = specificLocation?.lng || CITY_COORDS[city]?.longitude || 0;

    const searchQuery = location ? encodeURIComponent(location) : encodeURIComponent(city);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;

    const handleOpenInApp = async () => {
        try {
            const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                await Linking.openURL(mapUrl);
            }
        } catch (error) {
            console.warn('[MapScreen] Error opening app:', error);
            Linking.openURL(mapUrl);
        }
    };

    const handleDirections = async () => {
        try {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
            await Linking.openURL(url);
        } catch (error) {
            console.warn('[MapScreen] Error opening directions:', error);
        }
    };

    const handleStart = async () => {
        try {
            const url = Platform.OS === 'android' 
                ? `google.navigation:q=${lat},${lng}` 
                : `http://maps.apple.com/?daddr=${lat},${lng}`;
            
            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
                await Linking.openURL(url);
            } else {
                await Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`);
            }
        } catch (error) {
            console.warn('[MapScreen] Error starting navigation:', error);
            Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`);
        }
    };

    const handleCall = () => {
        if (specificLocation?.phone) {
            Linking.openURL(`tel:${specificLocation.phone}`);
        }
    };

    const onShouldStartLoadWithRequest = (request) => {
        const { url } = request;
        
        // Handle Android intents
        if (Platform.OS === 'android' && url.startsWith('intent://')) {
            // First try to extract fallback URL as Linking.openURL often fails with literal intent:// schemes
            const fallbackMatch = url.match(/S.browser_fallback_url=([^;]+)/);
            if (fallbackMatch && fallbackMatch[1]) {
                const fallbackUrl = decodeURIComponent(fallbackMatch[1]);
                Linking.openURL(fallbackUrl).catch(err => {
                    console.warn('[MapScreen] Failed to open fallback URL:', err);
                });
            } else {
                // Last resort: try opening as is (may trigger warning but better than doing nothing)
                Linking.openURL(url).catch(err => {
                    console.warn('[MapScreen] Failed to open intent URL:', err);
                });
            }
            return false;
        }
        
        // Allow standard loads
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return true;
        }
        
        // Handle other schemes
        Linking.canOpenURL(url).then(supported => {
            if (supported) Linking.openURL(url);
        });
        
        return false;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{city} Map</Text>
                <TouchableOpacity style={styles.headerOpenBtn} onPress={handleOpenInApp}>
                    <Text style={styles.headerOpenText}>Open App</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.mapContainer}>

                <WebView
                    ref={webViewRef}
                    source={{ uri: mapUrl }}
                    style={styles.map}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    injectedJavaScript={INJECTED_JS}
                    onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                    onMessage={(event) => {}} // dummy for compatibility
                />

                {/* Bottom Detail Card Overlay */}
                {location && (
                    <View style={styles.bottomCard}>
                        <View style={styles.dragHandle} />
                        <Text style={styles.locationName}>{location}</Text>
                        <Text style={styles.localName}>{specificLocation?.localName || city}</Text>
                        <View style={styles.ratingRow}>
                            <Text style={styles.ratingText}>{specificLocation?.rating || '4.7'}</Text>
                            <View style={styles.starsRow}>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Ionicons key={i} name="star" size={14} color="#FBBF24" />
                                ))}
                            </View>
                            <Text style={styles.reviewsText}>({specificLocation?.reviews || '1,200'})</Text>
                        </View>
                        
                        <View style={styles.actionsRow}>
                            <TouchableOpacity style={styles.directionsBtn} onPress={handleDirections}>
                                <Ionicons name="arrow-redo" size={18} color="white" />
                                <Text style={styles.directionsText}>Directions</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.actionOutlineBtn} onPress={handleStart}>
                                <MaterialCommunityIcons name="navigation-variant" size={18} color="#0F172A" />
                                <Text style={styles.actionOutlineText}>Start</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.actionOutlineBtn} onPress={handleCall}>
                                <Ionicons name="call" size={18} color="#0F172A" />
                                <Text style={styles.actionOutlineText}>Call</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAF9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#FAFAF9',
        zIndex: 10,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
        fontWeight: '800',
        color: '#0F172A',
        flex: 1,
        textAlign: 'center',
    },
    headerOpenBtn: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    headerOpenText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700',
    },
    mapContainer: {
        flex: 1,
        borderRadius: 30,
        overflow: 'hidden',
        marginHorizontal: 15,
        marginBottom: 20,
        backgroundColor: 'white',
        position: 'relative',
    },
    map: {
        flex: 1,
    },
    mapOverlayHeader: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 100,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    googleMapsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    googleMapsText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    openAppBtn: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    openAppText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
    },
    bottomCard: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        paddingTop: 12,
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 15,
    },
    dragHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#E2E8F0',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 16,
    },
    locationName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0F172A',
    },
    localName: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 2,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    starsRow: {
        flexDirection: 'row',
        marginHorizontal: 6,
    },
    reviewsText: {
        fontSize: 14,
        color: '#64748B',
    },
    actionsRow: {
        flexDirection: 'row',
        marginTop: 24,
        justifyContent: 'space-between',
    },
    directionsBtn: {
        flex: 1.5,
        backgroundColor: '#1E6BF3',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 20,
        marginRight: 10,
    },
    directionsText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 15,
        marginLeft: 8,
    },
    actionOutlineBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 20,
        marginRight: 10,
    },
    actionOutlineText: {
        color: '#0F172A',
        fontWeight: '800',
        fontSize: 15,
        marginLeft: 8,
    },
});
