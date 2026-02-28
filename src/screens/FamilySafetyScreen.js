import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ScrollView, Dimensions } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Placeholder for family illustration
const FAMILY_ILLUSTRATION = 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop';

const SafetyCard = ({ iconName, iconLib, title, description }) => {
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                {iconLib === 'FontAwesome5' ? (
                    <FontAwesome5 name={iconName} size={24} color="#1eb2f5" />
                ) : iconLib === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons name={iconName} size={28} color="#1eb2f5" />
                ) : (
                    <Feather name={iconName} size={26} color="#1eb2f5" />
                )}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
            </View>
        </View>
    );
};

export default function FamilySafetyScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f2f5f8" />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                {/* Header Text */}
                <View style={styles.header}>
                    <Text style={styles.titleLine}>SMART & SAFE</Text>
                    <Text style={styles.titleLine}>TRAVEL FOR</Text>
                    <Text style={styles.titleLine}>EVERYONE</Text>
                    <Text style={styles.subtitle}>Roamster guides you home.</Text>
                </View>

                {/* Illustration */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: FAMILY_ILLUSTRATION }}
                        style={styles.illustration}
                        resizeMode="cover"
                    />
                </View>

                {/* Info Cards */}
                <View style={styles.cardsSection}>
                    <SafetyCard
                        iconLib="FontAwesome5"
                        iconName="robot"
                        title="THE RIGHT MOMENT"
                        description="AI-powered weather & crowd awareness for your peace of mind."
                    />
                    <SafetyCard
                        iconLib="MaterialCommunityIcons"
                        iconName="human-male-female-child"
                        title="FAMILY-FIRST"
                        description="Optimized paths and safe plans tailored for kids and elders."
                    />
                </View>

                {/* Bottom Button */}
                <View style={styles.bottomSection}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Explore')}
                    >
                        <Text style={styles.buttonText}>Explore Safely</Text>
                        <Feather name="arrow-right" size={20} color="white" />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f2f5f8', // Very light gray-blue background
    },
    scrollContainer: {
        paddingHorizontal: 25,
        paddingTop: 40,
        paddingBottom: 40,
        alignItems: 'center',
    },
    // Header
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    titleLine: {
        color: '#1eb2f5', // Vivid Cyan / Light Blue
        fontSize: 34,
        fontWeight: '900',
        letterSpacing: -0.5,
        textAlign: 'center',
        lineHeight: 40,
    },
    subtitle: {
        color: '#64748B', // Slate gray
        fontSize: 18,
        marginTop: 15,
        fontWeight: '400',
    },

    // Illustration Image
    imageContainer: {
        width: '100%',
        height: 240,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 4,
        backgroundColor: '#fff',
    },
    illustration: {
        width: '100%',
        height: '100%',
    },

    // Cards Area
    cardsSection: {
        width: '100%',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28, // Circular
        backgroundColor: '#e6f6ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        color: '#0F172A', // Very dark blue/black
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 6,
        letterSpacing: 0.2,
    },
    cardDescription: {
        color: '#64748B',
        fontSize: 14,
        lineHeight: 20,
    },

    // Bottom Section
    bottomSection: {
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#1eb2f5', // Cyan matched with text
        width: '100%',
        paddingVertical: 18,
        borderRadius: 30, // Pill 
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1eb2f5',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        marginRight: 10,
    },
});
