import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { SettingsContext } from '../context/SettingsContext';
import { useContext } from 'react';

const LANGUAGES = [
    { id: 'en', name: 'English', sub: 'US / UK' },
    { id: 'hi', name: 'Hindi (हिन्दी)', sub: 'India' },
    { id: 'gu', name: 'Gujarati (ગુજરાતી)', sub: 'India' },
    { id: 'fr', name: 'French (Français)', sub: 'France / Canada' },
    { id: 'es', name: 'Spanish (Español)', sub: 'Spain / Latin America' },
];

export default function LanguageSelectionScreen({ navigation }) {
    const { language, updateLanguage, getT } = useContext(SettingsContext);

    const handleSelect = (id) => {
        updateLanguage(id);
        setTimeout(() => navigation.goBack(), 300); // Small delay for visual feedback
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{getT('language')}</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>{getT('selectLanguage')}</Text>
                
                <View style={styles.listCard}>
                    {LANGUAGES.map((lang, index) => {
                        const isSelected = language === lang.id;
                        return (
                            <TouchableOpacity 
                                key={lang.id} 
                                style={[styles.langItem, index !== LANGUAGES.length - 1 && styles.divider]}
                                onPress={() => handleSelect(lang.id)}
                            >
                                <View style={styles.langInfo}>
                                    <Text style={[styles.langName, isSelected && styles.activeText]}>{lang.name}</Text>
                                    <Text style={styles.langSub}>{lang.sub}</Text>
                                </View>
                                <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                                    {isSelected && <View style={styles.radioInner} />}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
    headerIconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    headerTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
    content: { padding: 20 },
    title: { fontSize: 16, fontWeight: '800', color: '#64748B', marginBottom: 15, marginLeft: 5 },
    listCard: { backgroundColor: 'white', borderRadius: 24, paddingHorizontal: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 10, elevation: 2 },
    langItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18 },
    divider: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    langInfo: { flex: 1 },
    langName: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
    activeText: { color: '#0F172A' },
    langSub: { fontSize: 13, color: '#94A3B8', fontWeight: '500' },
    radioOuter: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
    radioOuterSelected: { borderColor: '#0F172A' },
    radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#0F172A' }
});