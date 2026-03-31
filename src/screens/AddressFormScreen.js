import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAddress } from '../context/AddressContext';

export default function AddressFormScreen({ navigation, route }) {
    const { addresses, addAddress, editAddress } = useAddress();
    const { editId } = route.params || {};

    const isEditing = !!editId;

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        addressLine: '',
        city: '',
        state: '',
        pincode: '',
        country: 'France', // Default or user context
        landmark: '',
        label: 'Home'
    });

    useEffect(() => {
        if (isEditing) {
            const addr = addresses.find(a => a.id === editId);
            if (addr) {
                setFormData(addr);
            }
        }
    }, [editId, addresses]);

    const handleInput = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

    const handleSave = () => {
        if (!formData.fullName || !formData.phone || !formData.addressLine || !formData.city || !formData.pincode) {
            Alert.alert("Required Fields", "Please fill out all required fields.");
            return;
        }

        if (isEditing) {
            editAddress(editId, formData);
        } else {
            addAddress(formData);
        }
        navigation.goBack();
    };

    const handleAutoDetect = () => {
        // Mocking GPS detect
        setFormData(prev => ({
            ...prev,
            addressLine: '45 Bd Raspail, 75006',
            city: 'Paris',
            state: 'Île-de-France',
            pincode: '75006',
            country: 'France',
            landmark: 'Near Hôtel Lutetia'
        }));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconCircle}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{isEditing ? 'Edit Address' : 'Add New Address'}</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                <TouchableOpacity style={styles.gpsBtn} activeOpacity={0.8} onPress={handleAutoDetect}>
                    <Ionicons name="location" size={20} color="#0F172A" />
                    <Text style={styles.gpsBtnText}>Use Current Location</Text>
                </TouchableOpacity>

                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Contact Details</Text>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Full Name *</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="John Doe"
                            placeholderTextColor="#94A3B8"
                            value={formData.fullName}
                            onChangeText={(val) => handleInput('fullName', val)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Phone Number *</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="+33 6 12 34 56 78"
                            placeholderTextColor="#94A3B8"
                            keyboardType="phone-pad"
                            value={formData.phone}
                            onChangeText={(val) => handleInput('phone', val)}
                        />
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Address Details</Text>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Flat, House No., Building, Street *</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="e.g. 15 Rue de la Paix"
                            placeholderTextColor="#94A3B8"
                            value={formData.addressLine}
                            onChangeText={(val) => handleInput('addressLine', val)}
                        />
                    </View>

                    <View style={styles.inputRow}>
                        <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                            <Text style={styles.inputLabel}>City *</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Paris"
                                placeholderTextColor="#94A3B8"
                                value={formData.city}
                                onChangeText={(val) => handleInput('city', val)}
                            />
                        </View>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.inputLabel}>Pincode *</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="75002"
                                placeholderTextColor="#94A3B8"
                                value={formData.pincode}
                                onChangeText={(val) => handleInput('pincode', val)}
                            />
                        </View>
                    </View>

                    <View style={styles.inputRow}>
                        <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                            <Text style={styles.inputLabel}>State/Province *</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Île-de-France"
                                placeholderTextColor="#94A3B8"
                                value={formData.state}
                                onChangeText={(val) => handleInput('state', val)}
                            />
                        </View>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.inputLabel}>Country *</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="France"
                                placeholderTextColor="#94A3B8"
                                value={formData.country}
                                onChangeText={(val) => handleInput('country', val)}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Landmark (Optional)</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="Near Eiffel Tower"
                            placeholderTextColor="#94A3B8"
                            value={formData.landmark}
                            onChangeText={(val) => handleInput('landmark', val)}
                        />
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Save As</Text>
                    <View style={styles.labelToggles}>
                        {['Home', 'Work', 'Other'].map(lbl => (
                            <TouchableOpacity
                                key={lbl}
                                style={[styles.labelBtn, formData.label === lbl && styles.labelBtnActive]}
                                onPress={() => handleInput('label', lbl)}
                            >
                                <Text style={[styles.labelBtnText, formData.label === lbl && styles.labelBtnTextActive]}>{lbl}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveBtnText}>Save Address</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    gpsBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        padding: 15,
        borderRadius: 16,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    gpsBtnText: {
        color: '#0F172A',
        fontSize: 15,
        fontWeight: '700',
        marginLeft: 10,
    },
    formSection: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 15,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 14,
        fontSize: 15,
        color: '#0F172A',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    labelToggles: {
        flexDirection: 'row',
        gap: 12,
    },
    labelBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    labelBtnActive: {
        backgroundColor: '#0F172A',
        borderColor: '#0F172A',
    },
    labelBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
    },
    labelBtnTextActive: {
        color: 'white',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 40,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    saveBtn: {
        backgroundColor: '#0F172A',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
    }
});
