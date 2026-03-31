import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

export default function AboutScreen({ navigation }) {
    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>About Roamster</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.logoBox}>
                    <FontAwesome5 name="paper-plane" size={60} color="#0F172A" />
                    <Text style={styles.appName}>Roamster</Text>
                    <Text style={styles.version}>Version 1.0.0 (Build 42)</Text>
                </View>

                <Text style={styles.desc}>
                    Roamster is your ultimate companion for modern travel. We combine curated city guides, local expert matching, wardrobe rentals, and aesthetic snap spots into one seamless experience.
                </Text>
                <Text style={styles.desc}>
                    Pack light, live loud, and collect memories worldwide.
                </Text>
                
                <View style={styles.footer}>
                    <Text style={styles.copyright}>© 2026 Roamster Inc.</Text>
                    <Text style={styles.rights}>All rights reserved.</Text>
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
    logoBox: { alignItems: 'center', marginVertical: 40 },
    appName: { fontSize: 32, fontWeight: '900', color: '#0F172A', marginTop: 15, letterSpacing: -1 },
    version: { fontSize: 14, color: '#64748B', fontWeight: '600', marginTop: 5 },
    desc: { fontSize: 15, color: '#1E293B', lineHeight: 24, textAlign: 'center', marginBottom: 20, fontWeight: '500' },
    footer: { marginTop: 40, alignItems: 'center' },
    copyright: { fontSize: 12, color: '#94A3B8', fontWeight: '600', marginBottom: 2 },
    rights: { fontSize: 12, color: '#94A3B8' }
});