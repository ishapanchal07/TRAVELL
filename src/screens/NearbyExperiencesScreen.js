import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

export default function NearbyExperiencesScreen({ route, navigation }) {
    const items = route.params?.items || [];
    
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.nearbyItem}
            onPress={() => navigation.navigate('ExperienceDetail', { item })}
        >
            <Image 
                source={{ uri: item.img }} 
                style={styles.nearbyImg} 
                contentFit="cover"
                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                transition={300}
            />
            <Text style={styles.nearbyTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.nearbyDist}>{item.dist}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Nearby Experiences</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList 
                data={items}
                keyExtractor={(item, index) => item.id || index.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
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
        backgroundColor: '#F8FAFC',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    nearbyItem: {
        width: '48%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    nearbyImg: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 10,
    },
    nearbyTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
        textAlign: 'center',
    },
    nearbyDist: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 4,
    },
});
