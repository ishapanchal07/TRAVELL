import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Dimensions, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useSaved } from '../context/SavedContext';
import ExperienceCard from '../components/ExperienceCard';

const { width } = Dimensions.get('window');

export default function AllPlacesScreen({ route, navigation }) {
    const { isLoggedIn } = useAuth();
    const { toggleSaveGem, isGemSaved } = useSaved();
    const { title, items = [] } = route.params || {};

    const [searchQuery, setSearchQuery] = React.useState('');
    const [activeCategory, setActiveCategory] = React.useState('All');

    const categories = ['All', 'Art', 'Food', 'History', 'Nightlife', 'Nature'];

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || item.sub?.includes(activeCategory) || item.title.includes(activeCategory);
        return matchesSearch && matchesCategory;
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title || 'Top Experiences'}</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Search & Filter UI */}
                <View style={styles.searchSection}>
                    <View style={styles.searchBar}>
                        <Feather name="search" size={18} color="#64748B" />
                        <TextInput 
                            placeholder="Search experiences..."
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                        {categories.map(cat => (
                            <TouchableOpacity 
                                key={cat} 
                                style={[styles.categoryBtn, activeCategory === cat && styles.categoryBtnActive]}
                                onPress={() => setActiveCategory(cat)}
                            >
                                <Text style={[styles.categoryBtnText, activeCategory === cat && styles.categoryBtnTextActive]}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {filteredItems.map((item, index) => {
                    const isLocked = !isLoggedIn && index >= 3;

                    return (
                        <ExperienceCard 
                            key={item.id}
                            item={item}
                            isSaved={isGemSaved(item.id)}
                            onPress={() => isLocked ? navigation.navigate('Login') : navigation.navigate('ExperienceDetail', { item })}
                            onSave={() => toggleSaveGem(item)}
                            onBookNow={() => navigation.navigate('ExperienceDetail', { item })}
                            onViewMap={() => navigation.navigate('Map', { city: item.title, location: item.title })}
                            onShare={() => {}}
                        />
                    );
                })}

                {filteredItems.length === 0 && (
                    <View style={styles.emptyState}>
                        <Feather name="search" size={48} color="#E2E8F0" />
                        <Text style={styles.emptyText}>No experiences found matching your criteria.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FAFAF9',
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
        fontWeight: '900',
        color: '#0F172A',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 10,
    },
    searchSection: {
        marginBottom: 25,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: '#0F172A',
        fontWeight: '500',
    },
    categoriesScroll: {
        flexDirection: 'row',
    },
    categoryBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    categoryBtnActive: {
        backgroundColor: '#000000',
        borderColor: '#000000',
    },
    categoryBtnText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#64748B',
    },
    categoryBtnTextActive: {
        color: 'white',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        paddingHorizontal: 40,
    },
    emptyText: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 20,
        lineHeight: 22,
        fontWeight: '500',
    },
});
