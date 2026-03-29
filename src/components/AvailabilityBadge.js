import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AvailabilityBadge = ({ status }) => {
    let backgroundColor = '#10B981'; // Available (Green)
    if (status === 'Busy') backgroundColor = '#F59E0B'; // Busy (Yellow/Amber)
    if (status === 'Offline') backgroundColor = '#94A3B8'; // Offline (Gray)

    return (
        <View style={[styles.badge, { backgroundColor }]}>
            <View style={styles.dot} />
            <Text style={styles.statusText}>{status.toUpperCase()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'white',
        marginRight: 6,
    },
    statusText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});

export default AvailabilityBadge;
