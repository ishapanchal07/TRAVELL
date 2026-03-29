import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentSuccessScreen({ route, navigation }) {
    const { nextScreen, nextParams, message } = route.params || {};
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            if (nextScreen) {
                navigation.replace(nextScreen, nextParams);
            } else {
                navigation.replace('Explore');
            }
        }, 2500);

        return () => clearTimeout(timer);
    }, [nextScreen, nextParams, navigation, scaleAnim]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
                    <Ionicons name="checkmark-circle" size={120} color="#10B981" />
                </Animated.View>
                <Text style={styles.title}>{message || 'Booking Confirmed!'}</Text>
                <Text style={styles.subtitle}>Your payment was successful and securely processed.</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    iconContainer: {
        marginBottom: 30,
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#0F172A',
        marginTop: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 24,
    },
});
