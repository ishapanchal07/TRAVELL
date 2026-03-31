import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { usePayment } from '../context/PaymentContext';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
const DURATIONS = [2, 3, 4, 6, 8];

export default function BookingScreen({ route, navigation }) {
    const { handlePaidAction } = usePayment();
    const { expert } = route.params;
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    const [selectedTime, setSelectedTime] = useState('10:00 AM');
    const [duration, setDuration] = useState(4);

    const totalPrice = expert.price * (duration / 8); // Simplified pricing based on duration

    const nextDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: date.getDate(),
            fullDate: date
        };
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Date & Time</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.expertBrief}>
                    <Image 
                        source={{ uri: expert.image }} 
                        style={styles.expertThumb} 
                    />
                    <View>
                        <Text style={styles.expertName}>{expert.name}</Text>
                        <Text style={styles.expertPrice}>${expert.price}/day</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Select Date</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
                    {nextDays.map((item, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={[styles.dateCard, selectedDate === item.date && styles.dateCardActive]}
                            onPress={() => setSelectedDate(item.date)}
                        >
                            <Text style={[styles.dayText, selectedDate === item.date && styles.textActive]}>{item.dayName}</Text>
                            <Text style={[styles.dateText, selectedDate === item.date && styles.textActive]}>{item.date}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Select Time Slot</Text>
                <View style={styles.timeGrid}>
                    {TIME_SLOTS.map((slot, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={[styles.timeSlot, selectedTime === slot && styles.timeSlotActive]}
                            onPress={() => setSelectedTime(slot)}
                        >
                            <Text style={[styles.timeText, selectedTime === slot && styles.textActive]}>{slot}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Duration (Hours)</Text>
                <View style={styles.durationRow}>
                    {DURATIONS.map((dur, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={[styles.durationBtn, duration === dur && styles.durationBtnActive]}
                            onPress={() => setDuration(dur)}
                        >
                            <Text style={[styles.durationText, duration === dur && styles.textActive]}>{dur}h</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Base Rate</Text>
                        <Text style={styles.summaryValue}>${expert.price}/day</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Duration</Text>
                        <Text style={styles.summaryValue}>{duration} Hours</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>${totalPrice.toFixed(0)}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.payButton}
                    onPress={() => handlePaidAction(
                        {
                            id: `ExpertBooking_${expert.id}_${Date.now()}`,
                            title: `Booking with ${expert.name}`,
                            price: totalPrice,
                            image: expert.image,
                        },
                        'BookingConfirmation',
                        navigation,
                        { expert, totalPrice, selectedDate, selectedTime, duration, successMessage: 'Booking confirmed!', section: 'expert' }
                    )}
                >
                    <Text style={styles.payButtonText}>Proceed to Payment</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Used expo-image

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    expertBrief: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 20,
        marginBottom: 24,
    },
    expertThumb: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    expertName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    expertPrice: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 16,
    },
    dateScroll: {
        marginBottom: 24,
    },
    dateCard: {
        width: 70,
        height: 90,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    dateCardActive: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    dayText: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '700',
        marginBottom: 4,
    },
    dateText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0F172A',
    },
    textActive: {
        color: 'white',
    },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    timeSlot: {
        width: (width - 60) / 3,
        paddingVertical: 14,
        backgroundColor: 'white',
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    timeSlotActive: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    timeText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#475569',
    },
    durationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    durationBtn: {
        width: (width - 60) / 5,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    durationBtnActive: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    durationText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#475569',
    },
    summaryCard: {
        backgroundColor: '#F1F5F9',
        padding: 24,
        borderRadius: 24,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        color: '#64748B',
        fontWeight: '600',
    },
    summaryValue: {
        color: '#0F172A',
        fontWeight: '800',
    },
    totalRow: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        marginBottom: 0,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    totalValue: {
        fontSize: 22,
        fontWeight: '900',
        color: '#000',
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    payButton: {
        backgroundColor: '#000',
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    payButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    },
});
