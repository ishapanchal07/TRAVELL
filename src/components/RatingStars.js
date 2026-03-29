import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RatingStars = ({ rating, size = 14, color = '#FFD700' }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        const name = i <= Math.floor(rating) ? 'star' : i - 0.5 <= rating ? 'star-half' : 'star-outline';
        stars.push(<Ionicons key={i} name={name} size={size} color={color} style={{ marginRight: 2 }} />);
    }
    return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default RatingStars;
