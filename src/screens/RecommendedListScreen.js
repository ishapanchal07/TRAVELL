import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

export default function RecommendedListScreen({ route, navigation }) {
    const items = route.params?.items || [];
    
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.recommendedCard}
            onPress={() => navigation.navigate('ExperienceDetail', { item })}
        >
            <Image 
                source={{ uri: item.img }} 
                style={styles.recImage} 
                contentFit="cover" 
                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                transition={300}
            />
            <View style={styles.recInfo}>
                <Text style={styles.recTitle}>{item.title}</Text>
                <Text style={styles.recSub}>{item.sub}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Recommended for You</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList 
                data={items}
                keyExtractor={(item, index) => item.id || index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
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
    recommendedCard: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 24,
        marginBottom: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    recImage: {
        width: '100%',
        height: 180,
    },
    recInfo: {
        padding: 15,
    },
    recTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    recSub: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 4,
    },
});
