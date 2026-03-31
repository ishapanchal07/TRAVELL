import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

export default function RewardsScreen({ navigation }) {
    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rewards</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.pointsCard}>
                    <FontAwesome5 name="gem" size={40} color="#FBBF24" style={{ marginBottom: 15 }} />
                    <Text style={styles.pointsValue}>1,200</Text>
                    <Text style={styles.pointsLabel}>ROAM POINTS</Text>
                </View>

                <View style={styles.progressCard}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.tierText}>Silver Nomad</Text>
                        <Text style={styles.tierGoal}>300 to Gold</Text>
                    </View>
                    <View style={styles.track}>
                        <View style={styles.fill} />
                    </View>
                </View>

                <Text style={styles.subtitle}>Recent Earnings</Text>
                <View style={styles.historyCard}>
                    <View style={styles.historyRow}>
                        <Text style={styles.historyAction}>Booked Photography Tour</Text>
                        <Text style={styles.historyPoints}>+150</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.historyRow}>
                        <Text style={styles.historyAction}>Wardrobe Rental (3 Outfits)</Text>
                        <Text style={styles.historyPoints}>+90</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.historyRow}>
                        <Text style={styles.historyAction}>Added Review for Seine Walk</Text>
                        <Text style={styles.historyPoints}>+25</Text>
                    </View>
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
    content: { padding: 20, alignItems: 'center' },
    pointsCard: { width: '100%', backgroundColor: '#0F172A', borderRadius: 32, padding: 40, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 8, marginBottom: 20 },
    pointsValue: { fontSize: 48, fontWeight: '900', color: 'white', letterSpacing: 1 },
    pointsLabel: { fontSize: 12, fontWeight: '800', color: 'rgba(255,255,255,0.7)', marginTop: 5, letterSpacing: 2 },
    progressCard: { width: '100%', backgroundColor: 'white', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2, marginBottom: 30 },
    progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    tierText: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
    tierGoal: { fontSize: 13, fontWeight: '600', color: '#64748B' },
    track: { width: '100%', height: 10, backgroundColor: '#F1F5F9', borderRadius: 5 },
    fill: { width: '80%', height: '100%', backgroundColor: '#FBBF24', borderRadius: 5 },
    subtitle: { alignSelf: 'flex-start', fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 15, marginLeft: 5 },
    historyCard: { width: '100%', backgroundColor: 'white', borderRadius: 24, paddingVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 5, elevation: 1 },
    historyRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, paddingHorizontal: 20 },
    historyAction: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
    historyPoints: { fontSize: 14, fontWeight: '800', color: '#10B981' },
    divider: { height: 1, backgroundColor: '#F1F5F9', marginHorizontal: 20 }
});