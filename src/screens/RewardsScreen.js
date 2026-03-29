import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export default function RewardsScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rewards</Text>
                <View style={{ width: 44 }} />
            </View>
            <View style={styles.container}>
                <Text style={styles.placeholder}>This feature is coming soon!</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
    headerIconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    headerTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    placeholder: { fontSize: 16, color: '#64748B', fontWeight: '500' }
});