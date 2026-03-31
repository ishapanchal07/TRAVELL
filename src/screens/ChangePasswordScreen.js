import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ChangePasswordScreen({ navigation }) {
    const [current, setCurrent] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleUpdate = () => {
        if (!current || !newPass || !confirm) {
            Alert.alert("Error", "Please fill all fields.");
            return;
        }
        if (newPass !== confirm) {
            Alert.alert("Error", "New passwords do not match.");
            return;
        }
        Alert.alert("Success", "Password updated successfully!", [{ text: "OK", onPress: () => navigation.goBack() }]);
    };

    return (
        <View style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Feather name="chevron-left" size={20} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Change Password</Text>
                <View style={{ width: 44 }} />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.subtitle}>Create a strong new password to keep your account secure.</Text>
                    
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Current Password</Text>
                        <View style={styles.inputWrapper}>
                            <Feather name="lock" size={18} color="#94A3B8" style={styles.inputIcon} />
                            <TextInput style={styles.input} value={current} onChangeText={setCurrent} secureTextEntry={!showPassword} placeholder="••••••••" placeholderTextColor="#CBD5E1" />
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>New Password</Text>
                        <View style={styles.inputWrapper}>
                            <Feather name="key" size={18} color="#94A3B8" style={styles.inputIcon} />
                            <TextInput style={styles.input} value={newPass} onChangeText={setNewPass} secureTextEntry={!showPassword} placeholder="••••••••" placeholderTextColor="#CBD5E1" />
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Confirm New Password</Text>
                        <View style={styles.inputWrapper}>
                            <Feather name="check-circle" size={18} color="#94A3B8" style={styles.inputIcon} />
                            <TextInput style={styles.input} value={confirm} onChangeText={setConfirm} secureTextEntry={!showPassword} placeholder="••••••••" placeholderTextColor="#CBD5E1" />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.toggleVisibility} onPress={() => setShowPassword(!showPassword)}>
                        <Feather name={showPassword ? "eye-off" : "eye"} size={16} color="#64748B" />
                        <Text style={styles.toggleText}>{showPassword ? "Hide Passwords" : "Show Passwords"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
                        <Text style={styles.saveBtnText}>Update Password</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
    headerIconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    headerTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
    content: { padding: 20 },
    subtitle: { fontSize: 14, color: '#64748B', fontWeight: '500', marginBottom: 25, lineHeight: 20 },
    formGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginBottom: 8, marginLeft: 4 },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 5, elevation: 1 },
    inputIcon: { marginRight: 10 },
    input: { flex: 1, paddingVertical: 16, fontSize: 15, color: '#0F172A' },
    toggleVisibility: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30, marginTop: 10 },
    toggleText: { marginLeft: 8, fontSize: 14, color: '#64748B', fontWeight: '600' },
    saveBtn: { backgroundColor: '#0F172A', paddingVertical: 18, borderRadius: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
    saveBtnText: { color: 'white', fontSize: 16, fontWeight: '800' }
});