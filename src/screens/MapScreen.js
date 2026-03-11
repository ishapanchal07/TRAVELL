import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const CITY_COORDS = {
    'Paris': { latitude: 48.8566, longitude: 2.3522, latitudeDelta: 0.1, longitudeDelta: 0.1 },
    'Rome': { latitude: 41.9028, longitude: 12.4964, latitudeDelta: 0.1, longitudeDelta: 0.1 },
    'Switzerland': { latitude: 46.8182, longitude: 8.2275, latitudeDelta: 2.0, longitudeDelta: 2.0 }, // Broader view for country
    'Dubai': { latitude: 25.2048, longitude: 55.2708, latitudeDelta: 0.2, longitudeDelta: 0.2 },
    'Italy': { latitude: 41.8719, longitude: 12.5674, latitudeDelta: 5.0, longitudeDelta: 5.0 },
};

export default function MapScreen({ route, navigation }) {
    const { city = 'Paris', location } = route.params || {};
    
    // Use a specific location if provided, otherwise fallback to city name
    const searchQuery = location ? encodeURIComponent(location) : encodeURIComponent(city);
    // Standard map URL works better in WebView without API key than the embed output
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{city} Map</Text>
                <View style={{ width: 44 }} />
            </View>

            <View style={styles.mapContainer}>
                <WebView
                    source={{ uri: mapUrl }}
                    style={styles.map}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    allowsFullscreenVideo={false}
                />
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
        paddingVertical: 15,
        backgroundColor: '#FAFAF9',
        zIndex: 10,
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
        fontWeight: '800',
        color: '#0F172A',
    },
    mapContainer: {
        flex: 1,
        borderRadius: 30,
        overflow: 'hidden',
        marginHorizontal: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
