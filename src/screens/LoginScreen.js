import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView, Platform, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ImageBackground } from 'expo-image';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useAuth } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

const LOGIN_BG = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000';

export default function LoginScreen({ navigation }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleLogin = () => {
        login();
        // The App.js structure will likely handle navigation or we can manually navigate
        navigation.navigate('Explore');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent />
            <ImageBackground source={{ uri: LOGIN_BG }} style={styles.background} contentFit="cover">
                <View style={styles.overlay} />

                <SafeAreaView style={styles.safeArea}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardView}
                    >
                        <Animated.View style={[styles.headerArea, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                            <View style={styles.logoCircle}>
                                <Ionicons name="airplane" size={36} color="white" />
                            </View>
                            <Text style={styles.welcomeTitle}>Roamster</Text>
                            <Text style={styles.welcomeSubtitle}>Pack light, live loud.</Text>
                        </Animated.View>

                        <Animated.View style={[styles.cardWrapper, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                            <BlurView intensity={Platform.OS === 'ios' ? 70 : 100} tint="dark" style={styles.loginCard}>
                                <Text style={styles.cardTitle}>Login to unlock the full travel guide</Text>

                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons name="mail-outline" size={20} color="rgba(255,255,255,0.7)" />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Email Address"
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    </View>

                                    <View style={styles.inputWrapper}>
                                        <Ionicons name="lock-closed-outline" size={20} color="rgba(255,255,255,0.7)" />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Password"
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.8}>
                                    <Text style={styles.loginBtnText}>Unlock Full Guide</Text>
                                    <Ionicons name="arrow-forward" size={20} color="white" />
                                </TouchableOpacity>

                                <View style={styles.dividerRow}>
                                    <View style={styles.divider} />
                                    <Text style={styles.dividerText}>OR</Text>
                                    <View style={styles.divider} />
                                </View>

                                <TouchableOpacity style={styles.googleBtn} activeOpacity={0.8} onPress={handleLogin}>
                                    <FontAwesome5 name="google" size={18} color="white" style={styles.googleIcon} />
                                    <Text style={styles.googleBtnText}>Continue with Google</Text>
                                </TouchableOpacity>
                            </BlurView>
                        </Animated.View>

                        <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate('Explore')}>
                            <Text style={styles.skipBtnText}>Continue as Guest</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    background: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    safeArea: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    headerArea: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    welcomeTitle: {
        fontSize: 36,
        fontWeight: '900',
        color: 'white',
        letterSpacing: -1,
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 5,
        fontWeight: '500',
    },
    loginCard: {
        borderRadius: 30,
        padding: 25,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    cardWrapper: {
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.4,
        shadowRadius: 30,
        elevation: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 28,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 18,
        paddingHorizontal: 15,
        height: 60,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    input: {
        flex: 1,
        marginLeft: 12,
        color: 'white',
        fontSize: 16,
    },
    loginBtn: {
        flexDirection: 'row',
        backgroundColor: '#3B82F6',
        height: 60,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 8,
    },
    loginBtnText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '800',
        marginRight: 10,
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    dividerText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        fontWeight: '700',
        marginHorizontal: 15,
        letterSpacing: 2,
    },
    googleBtn: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.1)',
        height: 60,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    googleIcon: {
        marginRight: 12,
    },
    googleBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    skipBtn: {
        marginTop: 40,
        alignSelf: 'center',
    },
    skipBtnText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});
