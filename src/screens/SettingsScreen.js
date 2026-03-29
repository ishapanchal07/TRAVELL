import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const AVATAR_URL = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200';

export default function SettingsScreen({ navigation }) {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [notificationsOn, setNotificationsOn] = React.useState(true);
    const [isPrivate, setIsPrivate] = React.useState(false);

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Logout", 
                    style: "destructive",
                    onPress: () => {
                        // Reset navigation stack to Welcome screen
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Welcome' }],
                        });
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={isDarkMode ? "#0F172A" : "#F8FAFC"} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Profile Top Section */}
                <TouchableOpacity style={styles.profileSection} onPress={() => {}}>
                    <Image source={{ uri: AVATAR_URL }} style={styles.profilePic} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Chloe Roams</Text>
                        <Text style={styles.profileEmail}>chloe.roams@example.com</Text>
                    </View>
                    <Feather name="chevron-right" size={20} color="#94A3B8" />
                </TouchableOpacity>

                {/* A. Account */}
                <SectionHeader title="Account" />
                <View style={styles.sectionCard}>
                    <SettingsItem icon="user" label="Edit Profile" />
                    <SettingsItem icon="lock" label="Change Password" hideDivider />
                </View>

                {/* B. Preferences */}
                <SectionHeader title="Preferences" />
                <View style={styles.sectionCard}>
                    <SettingsToggleItem 
                        icon="moon" 
                        label="Dark / Light Mode" 
                        value={isDarkMode} 
                        onValueChange={setIsDarkMode} 
                    />
                    <SettingsItem icon="globe" label="Language" value="English" />
                    <SettingsToggleItem 
                        icon="bell" 
                        label="Notifications" 
                        value={notificationsOn} 
                        onValueChange={setNotificationsOn} 
                        hideDivider 
                    />
                </View>

                {/* C. Travel Experience */}
                <SectionHeader title="Travel Experience" />
                <View style={styles.sectionCard}>
                    <SettingsItem icon="music" label="Background Music" value="Lo-Fi Chill" />
                    <SettingsItem icon="compass" label="Travel Vibe" value="Adventure" hideDivider />
                </View>

                {/* D. Payments & Bookings */}
                <SectionHeader title="Payments & Bookings" />
                <View style={styles.sectionCard}>
                    <SettingsItem icon="credit-card" label="Saved Payment Methods" />
                    <SettingsItem icon="clock" label="Booking History" />
                    <SettingsItem icon="award" label="Roam Points / Rewards" hideDivider />
                </View>

                {/* E. Activity */}
                <SectionHeader title="Activity" />
                <View style={styles.sectionCard}>
                    <SettingsItem icon="map-pin" label="Saved Places" />
                    <SettingsItem icon="heart" label="Liked Items / Hidden Gems" hideDivider />
                </View>

                {/* F. Privacy & Security */}
                <SectionHeader title="Privacy & Security" />
                <View style={styles.sectionCard}>
                    <SettingsToggleItem 
                        icon="shield" 
                        label="Private Account" 
                        value={isPrivate} 
                        onValueChange={setIsPrivate} 
                    />
                    <SettingsItem icon="key" label="Permissions & Data Control" hideDivider />
                </View>

                {/* G. Support & Info */}
                <SectionHeader title="Support & Info" />
                <View style={styles.sectionCard}>
                    <SettingsItem icon="help-circle" label="Help & Support" />
                    <SettingsItem icon="info" label="About Roamster" />
                    <SettingsItem icon="file-text" label="Terms & Conditions" hideDivider />
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Feather name="log-out" size={18} color="#EF4444" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>App Version 1.0.0 (Build 42)</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

function SectionHeader({ title }) {
    return (
        <Text style={styles.sectionHeader}>{title.toUpperCase()}</Text>
    );
}

function SettingsItem({ icon, label, value, hideDivider, onPress }) {
    return (
        <TouchableOpacity style={styles.rowContainer} onPress={onPress}>
            <View style={styles.rowIconBox}>
                <Feather name={icon} size={18} color="#1E293B" />
            </View>
            <View style={[styles.rowContent, !hideDivider && styles.rowDivider]}>
                <Text style={styles.rowLabel}>{label}</Text>
                {value && <Text style={styles.rowValue}>{value}</Text>}
                <Feather name="chevron-right" size={20} color="#CBD5E1" />
            </View>
        </TouchableOpacity>
    );
}

function SettingsToggleItem({ icon, label, value, onValueChange, hideDivider }) {
    return (
        <View style={styles.rowContainer}>
            <View style={styles.rowIconBox}>
                <Feather name={icon} size={18} color="#1E293B" />
            </View>
            <View style={[styles.rowContent, !hideDivider && styles.rowDivider]}>
                <Text style={styles.rowLabel}>{label}</Text>
                <Switch 
                    value={value} 
                    onValueChange={onValueChange} 
                    trackColor={{ false: "#E2E8F0", true: "#0F172A" }}
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
