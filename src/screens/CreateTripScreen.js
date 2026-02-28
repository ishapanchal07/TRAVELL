import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const { width } = Dimensions.get('window');

const DEST_ITALY = 'https://images.unsplash.com/photo-1516483638261-f40af5ebcf89?q=80&w=200&auto=format&fit=crop';
const DEST_ROME = 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=200&auto=format&fit=crop';
const DEST_PARIS = 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=200&auto=format&fit=crop';
const DEST_LONDON = 'https://images.unsplash.com/photo-1513635269975-59693a0ee76d?q=80&w=200&auto=format&fit=crop';

const DESTINATIONS = [
    { id: '1', name: 'ITALY', image: DEST_ITALY },
    { id: '2', name: 'ROME', image: DEST_ROME },
    { id: '3', name: 'PARIS', image: DEST_PARIS },
    { id: '4', name: 'LONDON', image: DEST_LONDON },
];

export default function CreateTripScreen({ navigation }) {
    const [selectedDest, setSelectedDest] = useState('1');
    const [gender, setGender] = useState('Female');
    const [clothingSize, setClothingSize] = useState('EU 38 (M)');
    const [diet, setDiet] = useState(['Veg']);
    const [selectedDates, setSelectedDates] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [showGenderDrop, setShowGenderDrop] = useState(false);
    const [showSizeDrop, setShowSizeDrop] = useState(false);

    const onDayPress = (day) => {
        if (!startDate || (startDate && Object.keys(selectedDates).length > 1)) {
            // Start fresh
            setStartDate(day.dateString);
            setSelectedDates({
                [day.dateString]: { startingDay: true, color: '#3B82F6', textColor: 'white' }
            });
        } else {
            // Select end date and fill the gap
            const end = day.dateString;
            const start = startDate;
            let d = new Date(start);
            let e = new Date(end);

            if (e < d) {
                // If clicked before start, restart
                setStartDate(day.dateString);
                setSelectedDates({
                    [day.dateString]: { startingDay: true, color: '#3B82F6', textColor: 'white' }
                });
                return;
            }

            let range = {};
            range[start] = { startingDay: true, color: '#3B82F6', textColor: 'white' };

            // Fill between
            d.setDate(d.getDate() + 1);
            while (d < e) {
                const dateStr = d.toISOString().split('T')[0];
                range[dateStr] = { color: '#EFF6FF', textColor: '#3B82F6' };
                d.setDate(d.getDate() + 1);
            }

            range[end] = { endingDay: true, color: '#3B82F6', textColor: 'white' };
            setSelectedDates(range);
        }
    };

    const toggleDiet = (pref) => {
        if (diet.includes(pref)) {
            setDiet(diet.filter(d => d !== pref));
        } else {
            setDiet([...diet, pref]);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />

            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="chevron-left" size={24} color="#64748B" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.mainTitleDark}>Your <Text style={styles.mainTitleBlue}>Signature Style</Text></Text>
                    <Text style={styles.subtitleText}>Set your long-term preferences for a tailored travel experience.</Text>
                </View>

                {/* Destinations */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>Upcoming Destination</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.destScroll}>
                    {DESTINATIONS.map((dest) => (
                        <TouchableOpacity
                            key={dest.id}
                            style={styles.destItem}
                            onPress={() => setSelectedDest(dest.id)}
                            activeOpacity={0.8}
                        >
                            <View style={[styles.destImageRing, selectedDest === dest.id && styles.destImageRingActive]}>
                                <Image source={{ uri: dest.image }} style={styles.destImage} />
                            </View>
                            <Text style={[styles.destName, selectedDest === dest.id && styles.destNameActive]}>{dest.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Travel Dates Calendar */}
                <Text style={[styles.sectionTitle, { marginTop: 25, marginBottom: 15 }]}>Travel Dates</Text>
                <View style={styles.cardContainer}>
                    <Calendar
                        onDayPress={onDayPress}
                        markingType={'period'}
                        markedDates={selectedDates}
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#94A3B8',
                            selectedDayBackgroundColor: '#3B82F6',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#3B82F6',
                            dayTextColor: '#0F172A',
                            textDisabledColor: '#CBD5E1',
                            monthTextColor: '#0F172A',
                            textMonthFontWeight: '800',
                            textDayHeaderFontWeight: '800',
                            arrowColor: '#94A3B8',
                        }}
                    />
                </View>

                {/* Personal Details */}
                <View style={styles.cardContainer}>
                    <View style={styles.cardTitleRow}>
                        <View style={styles.iconBox}>
                            <FontAwesome5 name="user-alt" size={14} color="#3B82F6" />
                        </View>
                        <Text style={styles.cardTitle}>Personal Details</Text>
                    </View>

                    <View style={styles.inputRow}>
                        <View style={styles.inputCol}>
                            <Text style={styles.inputLabel}>GENDER</Text>
                            <TouchableOpacity style={styles.dropdownBox} activeOpacity={0.8} onPress={() => { setShowGenderDrop(!showGenderDrop); setShowSizeDrop(false); }}>
                                <Text style={styles.dropdownText}>{gender}</Text>
                                <Feather name={showGenderDrop ? "chevron-up" : "chevron-down"} size={16} color="#94A3B8" />
                            </TouchableOpacity>
                            {showGenderDrop && (
                                <View style={styles.dropdownList}>
                                    <TouchableOpacity style={styles.dropItem} onPress={() => { setGender('Female'); setShowGenderDrop(false); }}><Text style={styles.dropItemText}>Female</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.dropItem} onPress={() => { setGender('Male'); setShowGenderDrop(false); }}><Text style={styles.dropItemText}>Male</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.dropItem} onPress={() => { setGender('Other'); setShowGenderDrop(false); }}><Text style={styles.dropItemText}>Other</Text></TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <View style={{ width: 15 }} />
                        <View style={styles.inputCol}>
                            <Text style={styles.inputLabel}>CLOTHING SIZE</Text>
                            <TouchableOpacity style={styles.dropdownBox} activeOpacity={0.8} onPress={() => { setShowSizeDrop(!showSizeDrop); setShowGenderDrop(false); }}>
                                <Text style={styles.dropdownText}>{clothingSize}</Text>
                                <Feather name={showSizeDrop ? "chevron-up" : "chevron-down"} size={16} color="#94A3B8" />
                            </TouchableOpacity>
                            {showSizeDrop && (
                                <View style={styles.dropdownList}>
                                    <TouchableOpacity style={styles.dropItem} onPress={() => { setClothingSize('EU 36 (S)'); setShowSizeDrop(false); }}><Text style={styles.dropItemText}>EU 36 (S)</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.dropItem} onPress={() => { setClothingSize('EU 38 (M)'); setShowSizeDrop(false); }}><Text style={styles.dropItemText}>EU 38 (M)</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.dropItem} onPress={() => { setClothingSize('EU 40 (L)'); setShowSizeDrop(false); }}><Text style={styles.dropItemText}>EU 40 (L)</Text></TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* Dietary Preferences */}
                <View style={[styles.cardContainer, { marginBottom: 100 }]}>
                    <View style={styles.cardTitleRow}>
                        <View style={styles.iconBox}>
                            <MaterialCommunityIcons name="silverware-fork-knife" size={16} color="#3B82F6" />
                        </View>
                        <Text style={styles.cardTitle}>Dietary Preferences</Text>
                    </View>

                    <View style={styles.dietTagsCont}>
                        {['Veg', 'Non-Veg', 'Vegan', 'Halal'].map((pref) => {
                            const isSelected = diet.includes(pref);
                            return (
                                <TouchableOpacity
                                    key={pref}
                                    style={[styles.dietTag, isSelected && styles.dietTagActive]}
                                    onPress={() => toggleDiet(pref)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={[styles.dietTagText, isSelected && styles.dietTagTextActive]}>{pref}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    <Text style={styles.inputLabel}>ALLERGIES</Text>
                    <TextInput
                        style={styles.textInputFull}
                        placeholder="e.g. Peanuts, Shellfish"
                        placeholderTextColor="#CBD5E1"
                    />

                    <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8} onPress={() => navigation.navigate('TailorTrip')}>
                        <Text style={styles.saveBtnText}>Save & Next</Text>
                        <Feather name="arrow-right" size={20} color="white" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>

            </ScrollView>

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
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
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
    titleSection: {
        marginTop: 10,
        marginBottom: 25,
    },
    mainTitleDark: {
        fontSize: 32,
        fontWeight: '900',
        color: '#0F172A',
        lineHeight: 38,
    },
    mainTitleBlue: {
        color: '#3B82F6',
    },
    subtitleText: {
        fontSize: 15,
        color: '#64748B',
        marginTop: 10,
        lineHeight: 22,
        fontWeight: '500',
        paddingRight: 20,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    viewAllText: {
        color: '#3B82F6',
        fontSize: 13,
        fontWeight: '700',
    },
    destScroll: {
        paddingBottom: 5,
    },
    destItem: {
        alignItems: 'center',
        marginRight: 20,
    },
    destImageRing: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    destImageRingActive: {
        borderColor: '#3B82F6',
    },
    destImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    destName: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
    },
    destNameActive: {
        color: '#3B82F6',
    },

    // Card General
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    cardTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },

    // Inputs
    inputRow: {
        flexDirection: 'row',
    },
    inputCol: {
        flex: 1,
    },
    inputLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94A3B8',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    dropdownBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    dropdownText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
    },
    dropdownList: {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        zIndex: 10,
    },
    dropItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    dropItemText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#334155',
    },
    textInputFull: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        fontSize: 14,
        fontWeight: '500',
        color: '#0F172A',
        marginBottom: 20,
    },

    // Diet Tags
    dietTagsCont: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    dietTag: {
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    dietTagActive: {
        backgroundColor: '#3B82F6',
    },
    dietTagText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#64748B',
    },
    dietTagTextActive: {
        color: 'white',
    },

    // Save Btn
    saveBtn: {
        flexDirection: 'row',
        backgroundColor: '#3B82F6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        marginTop: 10,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5,
    },
    saveBtnText: {
        color: 'white',
        fontWeight: '800',
    },
});
