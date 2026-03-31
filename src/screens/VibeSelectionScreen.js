import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';

const VIBES = [
    { id: '1', name: 'Chill', desc: 'Relaxing, slow-paced travel.', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400' },
    { id: '2', name: 'Adventure', desc: 'Thrill, exploration & outdoors.', img: 'https://images.unsplash.com/photo-1533240332313-0cb49f471b75?w=400' },
    { id: '3', name: 'Romantic', desc: 'Couples, aesthetic, dinners.', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400' },
];

export default function VibeSelectionScreen({ navigation }) {
    const [selected, setSelected] = useState(['2']);

    const toggleSelection = (id) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Travel Vibe</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.desc}>Select the vibes that match your personality to get tailored recommendations.</Text>

                {VIBES.map(vibe => {
                    const isSelected = selected.includes(vibe.id);
                    return (
                        <TouchableOpacity 
                            key={vibe.id} 
                            style={[styles.vibeCard, isSelected && styles.vibeCardActive]}
                            activeOpacity={0.8}
                            onPress={() => toggleSelection(vibe.id)}
                        >
                            <ImageBackground source={{ uri: vibe.img }} style={styles.vibeImg} imageStyle={{ borderRadius: 18 }} contentFit="cover">
                                <View style={styles.overlay}>
                                    <View style={styles.vibeInfo}>
                                        <Text style={styles.vibeName}>{vibe.name}</Text>
                                        <Text style={styles.vibeDesc}>{vibe.desc}</Text>
                                    </View>
                                    <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                                        {isSelected && <View style={styles.radioInner} />}
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    );
                })}
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
    vibeCard: { height: 120, borderRadius: 20, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
    vibeCardActive: { borderWidth: 3, borderColor: '#0F172A' },
    vibeImg: { width: '100%', height: '100%' },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 18, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    vibeInfo: { flex: 1 },
    vibeName: { color: 'white', fontSize: 22, fontWeight: '900', letterSpacing: 0.5 },
    vibeDesc: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '600', marginTop: 4 },
    radioOuter: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: 'rgba(255,255,255,0.6)', justifyContent: 'center', alignItems: 'center' },
    radioOuterSelected: { borderColor: 'white', backgroundColor: 'white' },
    radioInner: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#0F172A' }
});