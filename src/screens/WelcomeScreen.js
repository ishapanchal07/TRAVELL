import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const BACKGROUND_IMAGE_URL = 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1000&auto=format&fit=crop';

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ImageBackground
                source={{ uri: BACKGROUND_IMAGE_URL }}
                style={styles.backgroundImage}
                contentFit="cover"
                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                transition={1000}
            >
                <View style={styles.overlay}>
                    <SafeAreaView style={styles.safeArea}>

                        <View style={styles.topSection}>
                            <View style={styles.logoCircle}>
                                <MaterialIcons name="travel-explore" size={36} color="white" />
                            </View>
                            <View style={styles.logoDivider} />
                        </View>

                        <View style={styles.middleSection}>
                            <Text style={styles.smallItalicText}>it's time for</Text>

                            <View style={styles.titleContainer}>
                                <Text style={styles.titleWhite}>TRAVEL WITH </Text>
                                <Text style={styles.titleBlue}>ROAMSTER</Text>
                            </View>

                            <Text style={styles.subtitleScript}>Travel like an influencer</Text>

                            <Text style={styles.exploreText}>EXPLORE THE WORLD</Text>

                            <View style={styles.paginationContainer}>
                                <View style={[styles.dot, styles.activeDot]} />
                                <View style={styles.dot} />
                                <View style={styles.dot} />
                            </View>
                        </View>

                        <View style={styles.bottomSection}>
                            <TouchableOpacity
                                style={styles.button}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Features')}
                            >
                                <Text style={styles.buttonText}>START JOURNEY</Text>
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
        width: width,
        height: height,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(10, 30, 60, 0.45)',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        paddingBottom: 40,
    },
    topSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    logoCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    logoDivider: {
        width: 32,
        height: 3,
        backgroundColor: '#000000',
        marginTop: 20,
    },
    middleSection: {
        alignItems: 'center',
        width: '100%',
    },
    smallItalicText: {
        color: '#E0E0E0',
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 5,
    },
    titleWhite: {
        color: 'white',
        fontSize: 38,
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: 1,
    },
    titleBlue: {
        color: '#000000',
        fontSize: 38,
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: 1,
    },
    subtitleScript: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'serif',
        fontStyle: 'italic',
        marginTop: 15,
        marginBottom: 20,
        fontWeight: '300',
    },
    exploreText: {
        color: 'white',
        fontSize: 14,
        letterSpacing: 3,
        marginTop: 10,
        fontWeight: '500',
    },
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.4)',
        marginHorizontal: 4,
    },
    activeDot: {
        width: 24,
        backgroundColor: '#000000',
    },
    bottomSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#000000',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 1.5,
    },
});
