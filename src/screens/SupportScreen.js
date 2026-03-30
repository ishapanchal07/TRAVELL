import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default function SupportScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Support</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                <View style={styles.faqCard}>
                    <View style={styles.faqRow}>
                        <Text style={styles.faqQ}>How do I cancel a booking?</Text>
                        <Feather name="chevron-down" size={18} color="#94A3B8" />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.faqRow}>
                        <Text style={styles.faqQ}>How does Wardrobe Rental work?</Text>
                        <Feather name="chevron-down" size={18} color="#94A3B8" />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.faqRow}>
                        <Text style={styles.faqQ}>What are Roam Points?</Text>
                        <Feather name="chevron-down" size={18} color="#94A3B8" />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Need more help?</Text>
                <TouchableOpacity style={styles.contactBtn} onPress={() => Alert.alert("Contact", "Our team will email you shortly.")}>
                    <Feather name="mail" size={20} color="white" />
                    <Text style={styles.contactText}>Email Support Team</Text>
                </TouchableOpacity>
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
    sectionTitle: { fontSize: 16, fontWeight: '800', color: '#64748B', marginBottom: 15, marginTop: 10 },
    faqCard: { backgroundColor: 'white', borderRadius: 20, paddingVertical: 5, marginBottom: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 5, elevation: 1 },
    faqRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
    faqQ: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
    divider: { height: 1, backgroundColor: '#F1F5F9', marginHorizontal: 20 },
    contactBtn: { flexDirection: 'row', backgroundColor: '#0F172A', paddingVertical: 18, borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
    contactText: { color: 'white', fontSize: 16, fontWeight: '800', marginLeft: 10 }
});