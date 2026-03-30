import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const AVATAR_URL = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200';

export default function EditProfileScreen({ navigation }) {
    const { userData, updateProfile } = useUser();
    const { isDarkMode, colors } = useTheme();
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [bio, setBio] = useState('Travel enthusiast. Finding hidden gems around the world. ✨');
    const [profileImage, setProfileImage] = useState(userData.profileImage);
    const [isSaving, setIsSaving] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Required', 'We need camera roll permissions to change your profile picture.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Name cannot be empty.');
            return;
        }

        setIsSaving(true);
        try {
            // Update global UserContext
            await updateProfile({
                ...userData,
                name: name.trim(),
                email: email.trim(),
                profileImage: profileImage
            });

            Alert.alert('Success', 'Profile updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert('Error', 'Failed to save changes. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={isDarkMode ? "light" : "dark"} />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={[styles.header, { borderBottomColor: colors.border }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Feather name="x" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Edit Profile</Text>
                    <TouchableOpacity onPress={handleSave} disabled={isSaving}>
                        {isSaving ? (
                            <ActivityIndicator size="small" color={colors.primary || "#000"} />
                        ) : (
                            <Text style={[styles.saveBtn, { color: colors.primary || "#000" }]}>Save</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.imageSection}>
                        <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
                            <Image 
                                source={{ uri: profileImage || AVATAR_URL }} 
                                style={styles.profileImage}
                                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                transition={300}
                            />
                            <View style={[styles.editBadge, { backgroundColor: colors.primary || "#000" }]}>
                                <Feather name="camera" size={16} color="#FFF" />
                            </View>
                        </TouchableOpacity>
                        <Text style={[styles.changePhotoText, { color: colors.primary || "#000" }]}>Change Photo</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.textSecondary || "#64748B" }]}>Full Name</Text>
                            <TextInput 
                                style={[styles.input, { color: colors.text, borderBottomColor: colors.border }]}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                                placeholderTextColor={colors.textSecondary || "#94A3B8"}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.textSecondary || "#64748B" }]}>Email</Text>
                            <TextInput 
                                style={[styles.input, { color: colors.text, borderBottomColor: colors.border }]}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Enter your email"
                                placeholderTextColor={colors.textSecondary || "#94A3B8"}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.textSecondary || "#64748B" }]}>Bio</Text>
                            <TextInput 
                                style={[styles.input, styles.bioInput, { color: colors.text, borderBottomColor: colors.border }]}
                                value={bio}
                                onChangeText={setBio}
                                placeholder="Tell us about yourself"
                                placeholderTextColor={colors.textSecondary || "#94A3B8"}
                                multiline
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    backBtn: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    saveBtn: {
        fontSize: 16,
        fontWeight: '700',
    },
    imageSection: {
        alignItems: 'center',
        marginVertical: 30,
    },
    imageWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        position: 'relative',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
    },
    changePhotoText: {
        marginTop: 15,
        fontSize: 14,
        fontWeight: '600',
    },
    form: {
        paddingHorizontal: 25,
    },
    inputGroup: {
        marginBottom: 25,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    input: {
        fontSize: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    bioInput: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
});