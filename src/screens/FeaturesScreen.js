import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Image similar to Gateway of India
const BACKGROUND_IMAGE_URL = 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000&auto=format&fit=crop';

const FeatureCard = ({ iconName, iconLib, title, description }) => {
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                {iconLib === 'Feather' ? (
                    <Feather name={iconName} size={28} color="#4b9ffc" />
                ) : iconLib === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons name={iconName} size={30} color="#4b9ffc" />
                ) : (
                    <MaterialIcons name={iconName} size={30} color="#4b9ffc" />
                )}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
            </View>
        </View>
    );
};

export default function FeaturesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ImageBackground
                source={{ uri: BACKGROUND_IMAGE_URL }}
                style={styles.backgroundImage}
                contentFit="cover"
                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                transition={1000}
                blurRadius={3}
            >
                <View style={styles.overlay}>
                    <SafeAreaView style={styles.safeArea}>

                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.logoBlueCircle}>
                                <Feather name="compass" size={20} color="white" />
                            </View>
                            <Text style={styles.headerTitle}>ROAMSTER</Text>
                        </View>

                        {/* Cards Section */}
                        <View style={styles.cardsSection}>
                            <FeatureCard
                                iconLib="Feather"
                                iconName="shopping-bag"
                                title="CLOTHES RENTAL OR BUY"
                                description="Curated destination-ready wardrobes, delivered to your door."
                            />
                            <FeatureCard
                                iconLib="Feather"
                                iconName="camera"
                                title="PHOTO INTELLIGENCE"
                                description="Best time & place for aesthetic influencer shots nearby."
                            />
                            <FeatureCard
                                iconLib="MaterialCommunityIcons"
                                iconName="bag-suitcase"
                                title="ZERO-LUGGAGE TECH"
                                description="High-end rentals delivered straight to your destination."
                            />
                        </View>

                        {/* Bottom Section */}
                        <View style={styles.bottomSection}>
                            <TouchableOpacity
                                style={styles.button}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('FamilySafety')}
                            >
                                <Text style={styles.buttonText}>NEXT</Text>
                                <Feather name="arrow-right" size={20} color="white" style={styles.arrowIcon} />
                            </TouchableOpacity>
                        </View>

                    </SafeAreaView>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 35, 65, 0.65)', // Darker overlay
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingTop: 60,
        paddingBottom: 40,
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    logoBlueCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#61aaff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    headerTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: 2,
    },

    // Cards Map
    cardsSection: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#F8FAFC',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 5,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 18,
        backgroundColor: '#eaf4ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        color: '#4b9ffc',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        letterSpacing: 0.5,
    },
    cardDescription: {
        color: '#556987',
        fontSize: 14,
        lineHeight: 20,
    },

    // Bottom Section
    bottomSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#4b9ffc',
        width: width * 0.8,
        paddingVertical: 18,
        borderRadius: 30, // Highly rounded pill button
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4b9ffc',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        marginRight: 8,
    },
    arrowIcon: {
        marginTop: 1,
    }
});
