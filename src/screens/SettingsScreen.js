import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsContext } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

const AVATAR_URL = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200';

export default function SettingsScreen({ navigation }) {
    const { 
        notificationsOn, toggleNotifications, 
        language, getT,
        isPrivate, togglePrivacy 
    } = useContext(SettingsContext);
    const { isDarkMode, toggleTheme, colors } = useTheme();
    const { userData } = useUser();

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Logout", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            // Clear all data including tokens and settings
                            await AsyncStorage.clear();
                        } catch (e) {
                            console.error('Failed to clear AsyncStorage', e);
                        }
                        // Reset navigation stack to Login screen (or Welcome)
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <StatusBar style={isDarkMode ? "light" : "dark"} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.headerIconBtn, isDarkMode && { backgroundColor: colors.card }]}>
                    <Feather name="chevron-left" size={20} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>{getT('settings')}</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Profile Top Section */}
                <TouchableOpacity style={styles.profileSection} onPress={() => navigation.navigate('EditProfile')}>
                    <Image source={{ uri: userData.profileImage || AVATAR_URL }} style={styles.profilePic} />
                    <View style={styles.profileInfo}>
                        <Text style={[styles.profileName, { color: colors.text }]}>{userData.name || 'Chloe Roams'}</Text>
                        <Text style={[styles.profileEmail, { color: colors.subtext }]}>{userData.email || 'chloe.roams@example.com'}</Text>
                    </View>
                    <Feather name="chevron-right" size={20} color="#94A3B8" />
                </TouchableOpacity>

                {/* A. Account */}
                <SectionHeader title={getT('account') || 'ACCOUNT'} />
                <View style={[styles.sectionCard, { backgroundColor: colors.card, borderBottomWidth: 0 }]}>
                    <SettingsItem icon="user" label="Edit Profile" onPress={() => navigation.navigate('EditProfile')} isDark={isDarkMode} />
                    <SettingsItem icon="lock" label="Change Password" hideDivider onPress={() => navigation.navigate('ChangePassword')} isDark={isDarkMode} />
                </View>

                {/* B. Preferences */}
                <SectionHeader title={getT('preferences')} />
                <View style={[styles.sectionCard, { backgroundColor: colors.card, borderBottomWidth: 0 }]}>
                    <SettingsToggleItem 
                        icon="moon" 
                        label={getT('darkMode')} 
                        value={isDarkMode} 
                        onValueChange={toggleTheme} 
                        isDark={isDarkMode}
                    />
                    <SettingsToggleItem 
                        icon="bell" 
                        label={getT('notifications')} 
                        value={notificationsOn} 
                        onValueChange={async (val) => {
                            const result = await toggleNotifications(val);
                            if (result && !result.success) {
                                Alert.alert("Permission Error", "Notification permission was not granted. Please enable it in system settings.");
                            }
                        }} 
                        hideDivider 
                        isDark={isDarkMode}
                    />
                </View>

                {/* F. Privacy & Security */}
                <SectionHeader title={getT('privacy')} />
                <View style={[styles.sectionCard, { backgroundColor: colors.card, borderBottomWidth: 0 }]}>
                    <SettingsToggleItem 
                        icon="shield" 
                        label={getT('privateAccount')} 
                        value={isPrivate} 
                        onValueChange={togglePrivacy} 
                        isDark={isDarkMode}
                    />
                    <SettingsItem icon="key" label={getT('permissions')} hideDivider onPress={() => navigation.navigate('Permissions')} isDark={isDarkMode} />
                </View>

                {/* G. Support & Info */}
                <SectionHeader title={getT('support')} />
                <View style={[styles.sectionCard, { backgroundColor: colors.card, borderBottomWidth: 0 }]}>
                    <SettingsItem icon="help-circle" label={getT('help')} onPress={() => navigation.navigate('Support')} isDark={isDarkMode} />
                    <SettingsItem icon="info" label={getT('about')} onPress={() => navigation.navigate('About')} isDark={isDarkMode} />
                    <SettingsItem icon="file-text" label={getT('terms')} hideDivider onPress={() => navigation.navigate('Terms')} isDark={isDarkMode} />
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={[styles.logoutButton, isDarkMode && { backgroundColor: '#1E293B' }]} onPress={handleLogout}>
                    <Feather name="log-out" size={18} color="#EF4444" />
                    <Text style={styles.logoutText}>{getT('logout')}</Text>
                </TouchableOpacity>

                <Text style={[styles.versionText, isDarkMode && { color: '#64748B' }]}>{getT('version')}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

function SectionHeader({ title }) {
    return (
        <Text style={styles.sectionHeader}>{title.toUpperCase()}</Text>
    );
}

function SettingsItem({ icon, label, value, hideDivider, onPress, isDark }) {
    return (
        <TouchableOpacity style={styles.rowContainer} onPress={onPress}>
            <View style={[styles.rowIconBox, isDark && { backgroundColor: '#1E293B' }]}>
                <Feather name={icon} size={18} color={isDark ? "#94A3B8" : "#1E293B"} />
            </View>
            <View style={[styles.rowContent, !hideDivider && (isDark ? styles.rowDividerDark : styles.rowDivider)]}>
                <Text style={[styles.rowLabel, isDark && { color: '#E2E8F0' }]}>{label}</Text>
                {value && <Text style={styles.rowValue}>{value}</Text>}
                <Feather name="chevron-right" size={20} color="#CBD5E1" />
            </View>
        </TouchableOpacity>
    );
}

function SettingsToggleItem({ icon, label, value, onValueChange, hideDivider, isDark }) {
    return (
        <View style={styles.rowContainer}>
            <View style={[styles.rowIconBox, isDark && { backgroundColor: '#1E293B' }]}>
                <Feather name={icon} size={18} color={isDark ? "#94A3B8" : "#1E293B"} />
            </View>
            <View style={[styles.rowContent, !hideDivider && (isDark ? styles.rowDividerDark : styles.rowDivider)]}>
                <Text style={[styles.rowLabel, isDark && { color: '#E2E8F0' }]}>{label}</Text>
                <Switch 
                    value={value} 
                    onValueChange={onValueChange} 
                    trackColor={{ false: "#E2E8F0", true: isDark ? "#38BDF8" : "#0F172A" }}
                    thumbColor="white"
                    ios_backgroundColor="#E2E8F0"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    headerIconBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    scrollContent: {
        paddingBottom: 60,
        paddingHorizontal: 20,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 24,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    cardDark: { backgroundColor: '#1E293B', borderColor: '#334155', borderWidth: 1 },
    rowDividerDark: { borderBottomWidth: 1, borderBottomColor: '#334155' },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '800',
        color: '#64748B',
        marginBottom: 10,
        marginLeft: 10,
        letterSpacing: 1,
    },
    sectionCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        paddingHorizontal: 5,
        marginBottom: 30,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    rowIconBox: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    rowContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingRight: 15,
    },
    rowDivider: {
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    rowLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
    },
    rowValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#94A3B8',
        marginRight: 10,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEF2F2',
        paddingVertical: 18,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    logoutText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: '800',
        marginLeft: 8,
    },
    versionText: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600',
        color: '#94A3B8',
        marginBottom: 20,
    }
});
