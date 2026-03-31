import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAddress } from '../context/AddressContext';

export default function AddressListScreen({ navigation, route }) {
    const { addresses, selectedAddressId, selectAddress, deleteAddress } = useAddress();
    const { onSelectGoBack } = route.params || {};

    const handleSelect = (id) => {
        selectAddress(id);
        if (onSelectGoBack) {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconCircle}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Delivery Addresses</Text>
                <View style={{ width: 44 }} />
            </View>

            {addresses.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconCircle}>
                        <Ionicons name="location-outline" size={40} color="#64748B" />
                    </View>
                    <Text style={styles.emptyTitle}>No Addresses Found</Text>
                    <Text style={styles.emptySub}>Add a delivery location to quickly checkout food and clothing orders.</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {addresses.map((addr) => {
                        const isSelected = addr.id === selectedAddressId;
                        return (
                            <TouchableOpacity
                                key={addr.id}
                                style={[styles.addressCard, isSelected && styles.addressCardSelected]}
                                activeOpacity={0.8}
                                onPress={() => handleSelect(addr.id)}
                            >
                                <View style={styles.cardTop}>
                                    <View style={styles.labelRow}>
                                        <View style={styles.labelPill}>
                                            <Ionicons name={addr.label === 'Home' ? "home" : addr.label === 'Work' ? "briefcase" : "location"} size={12} color="#0F172A" />
                                            <Text style={styles.labelText}>{addr.label || 'Other'}</Text>
                                        </View>
                                        {isSelected && (
                                            <View style={styles.selectedBadge}>
                                                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                                                <Text style={styles.selectedText}>Selected</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>

                                <View style={styles.cardBody}>
                                    <Text style={styles.nameText}>{addr.fullName}</Text>
                                    <Text style={styles.addressText} numberOfLines={2}>
                                        {addr.addressLine}, {addr.city}, {addr.state} {addr.pincode}
                                    </Text>
                                    <Text style={styles.addressText}>{addr.country}</Text>
                                    <Text style={styles.phoneText}>Mobile: {addr.phone}</Text>
                                </View>

                                <View style={styles.cardActions}>
                                    <TouchableOpacity 
                                        style={styles.actionBtn}
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            navigation.navigate('AddressForm', { editId: addr.id });
                                        }}
                                    >
                                        <Feather name="edit-2" size={14} color="#64748B" />
                                        <Text style={styles.actionBtnText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={styles.actionBtn}
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            deleteAddress(addr.id);
                                        }}
                                    >
                                        <Feather name="trash-2" size={14} color="#EF4444" />
                                        <Text style={[styles.actionBtnText, { color: '#EF4444' }]}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            )}

            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.addBtn}
                    onPress={() => navigation.navigate('AddressForm')}
                >
                    <Feather name="plus" size={20} color="white" />
                    <Text style={styles.addBtnText}>Add New Address</Text>
                </TouchableOpacity>
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
    iconCircle: {
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
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginTop: -50,
    },
    emptyIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 8,
    },
    emptySub: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
    },
    addressCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    addressCardSelected: {
        borderColor: '#0F172A',
        backgroundColor: '#FAFAF9',
    },
    cardTop: {
        marginBottom: 12,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    labelPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    labelText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0F172A',
        marginLeft: 6,
    },
    selectedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    selectedText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#10B981',
        marginLeft: 4,
    },
    cardBody: {
        marginBottom: 16,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 6,
    },
    addressText: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 20,
    },
    phoneText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        marginTop: 6,
    },
    cardActions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingTop: 12,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    actionBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
        marginLeft: 6,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 40,
        backgroundColor: '#F8FAFC',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    addBtn: {
        flexDirection: 'row',
        backgroundColor: '#0F172A',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
        marginLeft: 8,
    }
});
