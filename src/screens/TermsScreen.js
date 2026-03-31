import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function TermsScreen({ navigation }) {
    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms & Conditions</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.dateText}>Last Updated: October 2026</Text>

                <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                <Text style={styles.paragraph}>
                    By accessing and using the Roamster application, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </Text>

                <Text style={styles.sectionTitle}>2. Service Modification</Text>
                <Text style={styles.paragraph}>
                    Roamster reserves the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that Roamster shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.
                </Text>

                <Text style={styles.sectionTitle}>3. Privacy Policy</Text>
                <Text style={styles.paragraph}>
                    Your profile information and other data collected are subject to our Privacy Policy. For more information, please see our full privacy policy detailing how we manage your personal information, location data, and shared media files.
                </Text>

                <Text style={styles.sectionTitle}>4. Wardrobe Rentals & Local Experts</Text>
                <Text style={styles.paragraph}>
                    Transactions for wardrobe rentals and local expert bookings are facilitated by Roamster but fulfilled by our verified third-party partners. Roamster is not responsible for cancellations or issues caused directly by standard third-party negligence, though we provide robust support for dispute resolution.
                </Text>
                
                <View style={styles.bottomSpace} />
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
    dateText: { fontSize: 13, color: '#94A3B8', fontWeight: '600', marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 10, marginTop: 15 },
    paragraph: { fontSize: 14, color: '#475569', lineHeight: 22, fontWeight: '500' },
    bottomSpace: { height: 40 }
});