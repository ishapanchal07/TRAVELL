import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, FlatList, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 50) / 2;

export default function SnapSpotsScreen({ navigation, route }) {
    const { items, city } = route.params || {};

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.spotCard} 
            activeOpacity={0.9}
            onPress={() => navigation.navigate('SnapSpotDetails', { spot: item, city })}
        >
            <Image 
                source={{ uri: item.img }} 
                style={styles.spotImage} 
                contentFit="cover"
                transition={300}
                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
            />
            <View style={styles.spotInfo}>
                <Text style={styles.spotTitle} numberOfLines={1}>{item.title}</Text>
                <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={12} color="#64748B" />
                    <Text style={styles.locationText}>{city}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="chevron-left" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Perfect Snap Spots</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <Text style={styles.listDesc}>
                        The most iconic and viral spots in {city} for your next masterpiece.
                    </Text>
                )}
            />
        </View>
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
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    listDesc: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 20,
        marginBottom: 25,
        lineHeight: 20,
    },
    spotCard: {
        width: COLUMN_WIDTH,
        backgroundColor: 'white',
        borderRadius: 24,
        marginBottom: 20,
        marginRight: (width - 40 - (COLUMN_WIDTH * 2)) > 0 ? (width - 40 - (COLUMN_WIDTH * 2)) : 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        overflow: 'hidden',
    },
    spotImage: {
        width: '100%',
        height: 180,
    },
    spotInfo: {
        padding: 12,
    },
    spotTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    locationText: {
        fontSize: 11,
        color: '#64748B',
        marginLeft: 4,
        fontWeight: '600',
    },
});
