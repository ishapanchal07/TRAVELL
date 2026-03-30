import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';

const AVATAR_URL = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200';

export default function EditProfileScreen({ navigation }) {
    const { userData, updateUserData } = useAuth();
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [bio, setBio] = useState('Travel enthusiast. Finding hidden gems around the world. ✨'); // Bio remains local if not in global state
    const [profileImage, setProfileImage] = useState(userData.profileImage);
    const [isSaving, setIsSaving] = useState(false);

    const handleImagePress = () => {
        Alert.alert(
            "Change Profile Picture",
            "Choose a source",
            [
                { text: "Take Photo", onPress: handleTakePhoto },
                { text: "Choose from Gallery", onPress: handleChooseFromGallery },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    const handleTakePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleChooseFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need gallery permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const validateForm = () => {
        if (!name.trim()) {
            Alert.alert("Validation Error", "Full Name is required.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            Alert.alert("Validation Error", "Please enter a valid email address.");
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        setIsSaving(true);
        
        // Update global state and persist
        const result = await updateUserData({
            name,
            email,
            profileImage
        });

        setIsSaving(false);

        if (result.success) {
            Alert.alert(
                "Success", 
                "✓ Profile updated successfully!", 
                [{ text: "OK", onPress: () => navigation.goBack() }],
                { cancelable: true }
            );
        } else {
            Alert.alert("Error", "Failed to update profile. Please try again.");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <View style={{ width: 44 }} />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.avatarSection}>
                        <TouchableOpacity 
                            onPress={handleImagePress} 
                            activeOpacity={0.8}
                            style={styles.avatarContainer}
                            disabled={isSaving}
                        >
                            <Image source={{ uri: profileImage }} style={styles.avatar} />
                            <View style={styles.cameraBtn}>
                                <Feather name="camera" size={16} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your Name" placeholderTextColor="#94A3B8" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="you@example.com" placeholderTextColor="#94A3B8" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Bio</Text>
                        <TextInput style={[styles.input, styles.textArea]} value={bio} onChangeText={setBio} multiline numberOfLines={4} placeholder="Tell us about yourself..." placeholderTextColor="#94A3B8" />
                    </View>

                    <TouchableOpacity 
                        style={[styles.saveBtn, isSaving && { opacity: 0.7 }]} 
                        onPress={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.saveBtnText}>Save Changes</Text>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
    headerIconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    headerTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
    content: { padding: 20 },
    avatarSection: { alignItems: 'center', marginBottom: 30 },
    avatarContainer: { position: 'relative' },
    avatar: { width: 100, height: 100, borderRadius: 50 },
    cameraBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#0F172A', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#F8FAFC' },
    formGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginBottom: 8, marginLeft: 4 },
    input: { backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 16, fontSize: 15, color: '#0F172A', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 5, elevation: 1 },
    textArea: { height: 100, textAlignVertical: 'top' },
    saveBtn: { backgroundColor: '#0F172A', paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
    saveBtnText: { color: 'white', fontSize: 16, fontWeight: '800' }
});