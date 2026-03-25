import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useSaved } from '../context/SavedContext';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

export default function SavedScreen({ navigation }) {
    const { savedGems, toggleSaveGem } = useSaved();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Saved Gems</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {savedGems.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="heart-outline" size={60} color="#CBD5E1" />
                        <Text style={styles.emptyText}>No saved gems yet.</Text>
                        <Text style={styles.emptySub}>Explore cities and save your favorites!</Text>
                        <TouchableOpacity style={styles.exploreBtn} onPress={() => navigation.navigate('Explore')}>
                            <Text style={styles.exploreBtnText}>Go Explore</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.grid}>
                        {savedGems.map(gem => (
                            <TouchableOpacity 
                                key={gem.id} 
                                style={styles.card}
                                activeOpacity={0.9}
                            >
                                <ImageBackground
                                    source={{ uri: gem.image }}
                                    style={styles.cardImage}
                                    imageStyle={{ borderRadius: 16 }}
                                >
                                    <View style={styles.cardOverlay}>
                                        <TouchableOpacity 
                                            style={styles.heartButton} 
                                            activeOpacity={0.8}
                                            onPress={() => toggleSaveGem(gem)}
                                        >
                                            <Ionicons name="heart" size={18} color="#EF4444" />
                                        </TouchableOpacity>
                                        <View style={styles.cardInfo}>
                                            <View style={styles.pill}>
                                                <Text style={styles.pillText}>{gem.vibe || gem.badge || 'GEM'}</Text>
                                            </View>
                                            <Text style={styles.cardTitle} numberOfLines={2}>{gem.title}</Text>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>

            <BottomNav activeRoute="Saved" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: '#FAFAF9' 
    },
    header: { 
        paddingHorizontal: 20, 
        paddingTop: 10, 
        paddingBottom: 20, 
        backgroundColor: '#FAFAF9' 
    },
    headerTitle: { 
        fontSize: 32, 
        fontWeight: '900', 
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    scrollContent: { 
        paddingHorizontal: 20, 
        paddingBottom: 120 
    },
    emptyContainer: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 100 
    },
    emptyText: { 
        fontSize: 18, 
        fontWeight: '800', 
        color: '#475569', 
        marginTop: 20 
    },
    emptySub: { 
        fontSize: 14, 
        color: '#94A3B8', 
        marginTop: 8 
    },
    exploreBtn: { 
        marginTop: 25, 
        backgroundColor: '#3B82F6', 
        paddingHorizontal: 24, 
        paddingVertical: 14, 
        borderRadius: 20,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    exploreBtnText: { 
        color: 'white', 
        fontWeight: '800',
        fontSize: 14,
    },
    grid: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between' 
    },
    card: { 
        width: (width - 55) / 2, 
        height: 220, 
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    cardImage: { 
        width: '100%', 
        height: '100%' 
    },
    cardOverlay: { 
        flex: 1, 
        padding: 12, 
        justifyContent: 'space-between', 
        backgroundColor: 'rgba(0,0,0,0.25)', 
        borderRadius: 16 
    },
    heartButton: { 
        alignSelf: 'flex-end', 
        backgroundColor: 'rgba(255,255,255,0.9)', 
        width: 34, 
        height: 34, 
        borderRadius: 17, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    cardInfo: { 
        justifyContent: 'flex-end' 
    },
    pill: { 
        alignSelf: 'flex-start', 
        backgroundColor: 'rgba(15,23,42,0.7)', 
        paddingHorizontal: 8, 
        paddingVertical: 4, 
        borderRadius: 8, 
        marginBottom: 6 
    },
    pillText: { 
        color: 'white', 
        fontSize: 9, 
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    cardTitle: { 
        color: 'white', 
        fontSize: 14, 
        fontWeight: '800',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    }
});
