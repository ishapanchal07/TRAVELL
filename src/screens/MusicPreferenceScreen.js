import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const GENRES = [
    { id: '1', name: 'Lo-Fi Chill', icon: 'headphones' },
    { id: '2', name: 'Travel Beats', icon: 'music' },
    { id: '3', name: 'Acoustic Vibes', icon: 'mic' },
    { id: '4', name: 'Upbeat Party', icon: 'speaker' },
    { id: '5', name: 'Nature Sounds', icon: 'wind' },
];

export default function MusicPreferenceScreen({ navigation }) {
    const [selected, setSelected] = useState(['1', '3']);

    const toggleSelection = (id) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Background Music</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.desc}>Select the music genres you want running while exploring the app.</Text>

                <View style={styles.listCard}>
                    {GENRES.map((genre, index) => {
                        const isSelected = selected.includes(genre.id);
                        return (
                            <TouchableOpacity 
                                key={genre.id} 
                                style={[styles.itemRow, index !== GENRES.length - 1 && styles.divider]}
                                onPress={() => toggleSelection(genre.id)}
                            >
                                <View style={[styles.iconBox, isSelected && styles.iconBoxActive]}>
                                    <Feather name={genre.icon} size={18} color={isSelected ? 'white' : '#64748B'} />
                                </View>
                                <Text style={[styles.itemName, isSelected && styles.itemNameActive]}>{genre.name}</Text>
                                
                                <TouchableOpacity style={styles.playBtn} activeOpacity={0.7}>
                                    <Ionicons name="play-circle" size={24} color="#CBD5E1" />
                                </TouchableOpacity>

                                <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
                                    {isSelected && <Feather name="check" size={14} color="white" />}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
    headerIconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    headerTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
    content: { padding: 20 },
    desc: { fontSize: 14, color: '#64748B', lineHeight: 22, marginBottom: 20, fontWeight: '500' },
    listCard: { backgroundColor: 'white', borderRadius: 24, paddingHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 10, elevation: 2 },
    itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
    divider: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    iconBoxActive: { backgroundColor: '#0F172A' },
    itemName: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1E293B' },
    itemNameActive: { color: '#0F172A', fontWeight: '800' },
    playBtn: { marginRight: 15 },
    checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 2, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
    checkboxActive: { backgroundColor: '#0F172A', borderColor: '#0F172A' }
});