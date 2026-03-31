import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function PermissionsScreen({ navigation }) {
    const [loc, setLoc] = useState(true);
    const [cam, setCam] = useState(false);
    const [notif, setNotif] = useState(true);

    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Permissions</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.desc}>Manage what data Roamster has access to for providing the best experience.</Text>
                
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>Location Access</Text>
                            <Text style={styles.subtext}>Used for Nearby Experiences</Text>
                        </View>
                        <Switch value={loc} onValueChange={setLoc} trackColor={{ false: "#E2E8F0", true: "#0F172A" }} />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>Camera & Gallery</Text>
                            <Text style={styles.subtext}>Used for Snap Spots & Profile</Text>
                        </View>
                        <Switch value={cam} onValueChange={setCam} trackColor={{ false: "#E2E8F0", true: "#0F172A" }} />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>Marketing Notifications</Text>
                            <Text style={styles.subtext}>Offers and Roam Points alerts</Text>
                        </View>
                        <Switch value={notif} onValueChange={setNotif} trackColor={{ false: "#E2E8F0", true: "#0F172A" }} />
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
    content: { padding: 20 },
    desc: { fontSize: 14, color: '#64748B', lineHeight: 22, marginBottom: 20, fontWeight: '500' },
    card: { backgroundColor: 'white', borderRadius: 24, paddingVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 10, elevation: 2 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20 },
    label: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
    subtext: { fontSize: 12, color: '#94A3B8', fontWeight: '500' },
    divider: { height: 1, backgroundColor: '#F1F5F9', marginHorizontal: 20 }
});