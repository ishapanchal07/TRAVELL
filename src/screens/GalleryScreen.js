import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default function GalleryScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Gallery Screen</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAF9', justifyContent: 'center', alignItems: 'center' }
});
