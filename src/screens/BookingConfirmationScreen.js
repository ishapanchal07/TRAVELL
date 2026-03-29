import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

export default function BookingConfirmationScreen({ route, navigation }) {
    const { booking } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.successIcon}>
                    <Ionicons name="checkmark-circle" size={100} color="#10B981" />
                </View>

                <Text style={styles.title}>Booking Confirmed!</Text>
                <Text style={styles.subtitle}>Your expert has been successfully hired.</Text>

                <View style={styles.bookingCard}>
                    <View style={styles.expertBrief}>
                        <Image source={{ uri: booking.expertImage }} style={styles.expertThumb} />
                        <View>
                            <Text style={styles.expertName}>{booking.expertName}</Text>
                            <Text style={styles.bookingId}>ID: #{booking.id.slice(-6)}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.detailsGrid}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>DATE</Text>
                            <Text style={styles.detailValue}>{booking.date} March, 2026</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>TIME</Text>
                            <Text style={styles.detailValue}>{booking.time}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>DURATION</Text>
                            <Text style={styles.detailValue}>{booking.duration} Hours</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>AMOUNT</Text>
                            <Text style={styles.detailValue}>${booking.totalAmount}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.chatButton}
                    onPress={() => navigation.navigate('ExpertChat', { expert: { id: booking.expertId, name: booking.expertName, image: booking.expertImage } })}
                >
                    <Ionicons name="chatbubble-ellipses" size={24} color="white" />
                    <Text style={styles.chatButtonText}>Chat with Expert</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.doneButton}
                    onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Explore' }] })}
                >
                    <Text style={styles.doneButtonText}>Back to Explore</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
        justifyContent: 'center',
    },
    successIcon: {
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 40,
    },
    bookingCard: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 32,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
        marginBottom: 40,
    },
    expertBrief: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    expertThumb: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    expertName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
    },
    bookingId: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '700',
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginBottom: 20,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    detailItem: {
        width: '50%',
        marginBottom: 20,
    },
    detailLabel: {
        fontSize: 10,
        color: '#94A3B8',
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    chatButton: {
        backgroundColor: '#000',
        width: '100%',
        height: 64,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    chatButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
        marginLeft: 12,
    },
    doneButton: {
        width: '100%',
        height: 64,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    doneButtonText: {
        color: '#64748B',
        fontSize: 16,
        fontWeight: '700',
    },
});
