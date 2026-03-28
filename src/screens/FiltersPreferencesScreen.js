import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function FiltersPreferencesScreen({ navigation }) {
    const [travelGroup, setTravelGroup] = useState('Solo');
    const [gender, setGender] = useState('Female');

    const groups = ['Solo', 'Couple', 'Family', 'Friends'];
    const genders = ['Female', 'Male', 'Unisex'];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="close" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Filters & Preferences</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.applyBtn}>Apply</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Travel Group</Text>
                    <View style={styles.optionsWrap}>
                        {groups.map(group => (
                            <TouchableOpacity
                                key={group}
                                style={[styles.option, travelGroup === group && styles.optionActive]}
                                onPress={() => setTravelGroup(group)}
                            >
                                <Text style={[styles.optionText, travelGroup === group && styles.optionTextActive]}>{group}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Gender Preference</Text>
                    <View style={styles.optionsWrap}>
                        {genders.map(g => (
                            <TouchableOpacity
                                key={g}
                                style={[styles.option, gender === g && styles.optionActive]}
                                onPress={() => setGender(g)}
                            >
                                <Text style={[styles.optionText, gender === g && styles.optionTextActive]}>{g}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Style Priorities</Text>
                    <View style={styles.infoBox}>
                        <Ionicons name="bulb-outline" size={20} color="#000000" />
                        <Text style={styles.infoText}>
                            Based on your selection, we'll prioritize high-fashion for solo/couples and comfort/safety for families.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    applyBtn: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700',
    },
    scrollContent: {
        padding: 20,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 16,
    },
    optionsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    option: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginRight: 10,
        marginBottom: 10,
    },
    optionActive: {
        backgroundColor: '#000000',
        borderColor: '#000000',
    },
    optionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
    },
    optionTextActive: {
        color: 'white',
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 16,
        alignItems: 'flex-start',
    },
    infoText: {
        marginLeft: 12,
        flex: 1,
        fontSize: 14,
        color: '#000000',
        lineHeight: 20,
    },
});
