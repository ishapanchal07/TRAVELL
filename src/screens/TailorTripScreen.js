import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTrip } from '../context/TripContext';

const { width } = Dimensions.get('window');

const WHO_OPTIONS = [
    { id: '1', label: 'Solo' },
    { id: '2', label: 'Couple' },
    { id: '3', label: 'Family' },
    { id: '4', label: 'With Kids' },
    { id: '5', label: 'Elderly Companion' },
];

export default function TailorTripScreen({ navigation }) {
    const { activeTrip } = useTrip();
    const [selectedWho, setSelectedWho] = useState('2');
    const [safetySens, setSafetySens] = useState(0.8); // 0 to 1
    const [activityInt, setActivityInt] = useState(0.4); // 0 to 1
    const [comfortLevel, setComfortLevel] = useState('MODERATE');

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />

            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="chevron-left" size={24} color="#64748B" />
                </TouchableOpacity>
                <View style={styles.tripPill}>
                    <Text style={styles.tripPillText}>TRIP: {activeTrip?.destination || 'PARIS'} '24</Text>
                </View>
                <View style={{ width: 40 }} /> {/* Spacer */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.mainTitleBlue}>Tailor Your Trip</Text>
                    <Text style={styles.subtitleText}>These settings apply only to this journey.</Text>
                </View>

                {/* Who Are You With? */}
                <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="people" size={14} color="#94A3B8" />
                        <Text style={styles.cardTitle}>WHO ARE YOU WITH?</Text>
                    </View>

                    {WHO_OPTIONS.map((option) => {
                        const isSelected = selectedWho === option.id;
                        return (
                            <TouchableOpacity
                                key={option.id}
                                style={[styles.radioItem, isSelected && styles.radioItemActive]}
                                onPress={() => setSelectedWho(option.id)}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.radioText, isSelected && styles.radioTextActive]}>{option.label}</Text>
                                <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                                    {isSelected && <View style={styles.radioInnerCircle} />}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Sensitivity & Pace */}
                <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                        <Feather name="sliders" size={14} color="#94A3B8" />
                        <Text style={styles.cardTitle}>SENSITIVITY & PACE</Text>
                    </View>

                    {/* Safety Slider Mock */}
                    <View style={styles.sliderSection}>
                        <View style={styles.sliderTopRow}>
                            <Text style={styles.sliderLabel}>Safety Sensitivity</Text>
                            <Text style={styles.sliderValueText}>HIGH</Text>
                        </View>
                        <View style={styles.sliderTrack}>
                            <View style={[styles.sliderFill, { width: `${safetySens * 100}%` }]} />
                            <View style={[styles.sliderThumb, { left: `${safetySens * 100}%` }]} />
                        </View>
                        <View style={styles.sliderBottomRow}>
                            <Text style={styles.sliderEndpoint}>NORMAL</Text>
                            <Text style={styles.sliderEndpoint}>ENHANCED</Text>
                        </View>
                    </View>

                    {/* Activity Slider Mock */}
                    <View style={[styles.sliderSection, { marginTop: 30 }]}>
                        <View style={styles.sliderTopRow}>
                            <Text style={styles.sliderLabel}>Activity Intensity</Text>
                            <Text style={styles.sliderValueText}>MODERATE</Text>
                        </View>
                        <View style={styles.sliderTrack}>
                            <View style={[styles.sliderFill, { width: `${activityInt * 100}%` }]} />
                            <View style={[styles.sliderThumb, { left: `${activityInt * 100}%` }]} />
                        </View>
                        <View style={styles.sliderBottomRow}>
                            <Text style={styles.sliderEndpoint}>CHILL</Text>
                            <Text style={styles.sliderEndpoint}>EXTREME</Text>
                        </View>
                    </View>
                </View>

                {/* Comfort Level */}
                <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                        <MaterialCommunityIcons name="sofa-single" size={14} color="#94A3B8" />
                        <Text style={styles.cardTitle}>COMFORT LEVEL</Text>
                    </View>

                    <View style={styles.segmentedControl}>
                        {['BASIC', 'MODERATE', 'PREMIUM'].map((level) => {
                            const isSelected = comfortLevel === level;
                            return (
                                <TouchableOpacity
                                    key={level}
                                    style={[styles.segmentBtn, isSelected && styles.segmentBtnActive]}
                                    onPress={() => setComfortLevel(level)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={[styles.segmentText, isSelected && styles.segmentTextActive]}>{level}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomFixedContainer}>
                <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Explore')}>
                    <Text style={styles.primaryBtnText}>Initialize My Trip</Text><Feather name="arrow-right" size={20} color="white" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAF9',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    headerRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    tripPill: {
        backgroundColor: '#F0F9FF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    tripPillText: {
        color: '#0EA5E9',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    titleSection: {
        marginTop: 15,
        marginBottom: 25,
    },
    mainTitleBlue: {
        fontSize: 32,
        fontWeight: '900',
        color: '#3B82F6',
        lineHeight: 38,
        letterSpacing: -0.5,
    },
    subtitleText: {
        fontSize: 15,
        color: '#64748B',
        marginTop: 8,
        lineHeight: 22,
        fontWeight: '500',
        paddingRight: 20,
    },

    // Cards
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: '#94A3B8',
        marginLeft: 8,
        letterSpacing: 0.5,
    },

    // Radio List
    radioItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#FAFAF9',
        borderRadius: 16,
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    radioItemActive: {
        borderColor: '#38BDF8',
        backgroundColor: 'white',
        shadowColor: '#0EA5E9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    radioText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#334155',
    },
    radioTextActive: {
        color: '#0369A1',
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CBD5E1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioCircleActive: {
        borderColor: '#0EA5E9',
    },
    radioInnerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#0EA5E9',
    },

    // Sliders
    sliderSection: {
        width: '100%',
    },
    sliderTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sliderLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: '#334155',
    },
    sliderValueText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#0EA5E9',
    },
    sliderTrack: {
        width: '100%',
        height: 6,
        backgroundColor: '#F1F5F9',
        borderRadius: 3,
        position: 'relative',
        justifyContent: 'center',
    },
    sliderFill: {
        height: '100%',
        backgroundColor: '#E0F2FE',
        borderRadius: 3,
    },
    sliderThumb: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#38BDF8',
        marginLeft: -10, // Center thumb
        shadowColor: '#0EA5E9',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        borderWidth: 3,
        borderColor: 'white',
    },
    sliderBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    sliderEndpoint: {
        fontSize: 9,
        fontWeight: '700',
        color: '#94A3B8',
    },

    // Segmented
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: '#FAFAF9',
        borderRadius: 16,
        padding: 4,
    },
    segmentBtn: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    segmentBtnActive: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    segmentText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#64748B',
    },
    segmentTextActive: {
        color: '#0EA5E9',
    },

    // Bottom Btn
    bottomFixedContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: 30,
        backgroundColor: '#FAFAF9',
        borderTopWidth: 1,
        borderColor: 'transparent', // Can add subtle border if needed by setting to #F1F5F9
    },
    primaryBtn: {
        flexDirection: 'row',
        backgroundColor: '#3B82F6',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5,
    },
    primaryBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
    },
});
