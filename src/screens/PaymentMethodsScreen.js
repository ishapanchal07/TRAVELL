import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const CARDS = [
    { id: '1', type: 'VISA', num: '**** **** **** 4242', exp: '12/26', default: true },
    { id: '2', type: 'MASTERCARD', num: '**** **** **** 8891', exp: '04/25', default: false },
];

export default function PaymentMethodsScreen({ navigation }) {
    const handleDelete = (id) => {
        Alert.alert("Delete Card", "Are you sure you want to remove this card?", [
            { text: "Cancel", style: "cancel" },
            { text: "Remove", style: "destructive" }
        ]);
    };

    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment Methods</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {CARDS.map(card => (
                    <View key={card.id} style={styles.cardBox}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardTypeRow}>
                                <Ionicons name="card" size={24} color="#0F172A" />
                                <Text style={styles.cardType}>{card.type}</Text>
                            </View>
                            {card.default && <View style={styles.defaultBadge}><Text style={styles.defaultText}>DEFAULT</Text></View>}
                        </View>
                        <Text style={styles.cardNum}>{card.num}</Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.cardExp}>Expires {card.exp}</Text>
                            <TouchableOpacity onPress={() => handleDelete(card.id)}>
                                <Feather name="trash-2" size={18} color="#EF4444" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <TouchableOpacity style={styles.addBtn} onPress={() => Alert.alert("Coming Soon", "Add card flow will be integrated soon.")}>
                    <Feather name="plus-circle" size={20} color="#0F172A" />
                    <Text style={styles.addBtnText}>Add New Payment Method</Text>
                </TouchableOpacity>
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
    cardBox: { backgroundColor: 'white', borderRadius: 20, padding: 20, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    cardTypeRow: { flexDirection: 'row', alignItems: 'center' },
    cardType: { fontSize: 16, fontWeight: '800', marginLeft: 10, color: '#1E293B' },
    defaultBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    defaultText: { fontSize: 10, fontWeight: '800', color: '#64748B' },
    cardNum: { fontSize: 20, fontWeight: '700', letterSpacing: 2, color: '#0F172A', marginBottom: 20 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardExp: { fontSize: 14, color: '#64748B', fontWeight: '500' },
    addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F5F9', paddingVertical: 18, borderRadius: 20, borderStyle: 'dashed', borderWidth: 2, borderColor: '#CBD5E1', marginTop: 10 },
    addBtnText: { marginLeft: 10, fontSize: 16, fontWeight: '700', color: '#0F172A' }
});