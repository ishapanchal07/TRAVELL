import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSaved } from '../context/SavedContext';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const SIZES_CLOTHES = ['S', 'M', 'L', 'XL'];
const SIZES_SHOES = ['6', '7', '8', '9', '10', '11'];
const DURATIONS = [
    { label: '1 day', value: 1 },
    { label: '3 days', value: 3 },
    { label: '7 days', value: 7 },
];
const PAYMENT_METHODS = [
    { id: 'apple', label: 'Apple Pay', icon: 'logo-apple' },
    { id: 'card', label: 'Credit Card', icon: 'card-outline' },
    { id: 'paypal', label: 'PayPal', icon: 'logo-paypal' },
];

export default function ProductDetailScreen({ route, navigation }) {
    const { item = {} } = route.params || {};
    
    // Parse price string like "€35/day" to number 35
    const pricePerDay = parseInt(item.price?.replace(/[^0-9]/g, '') || '35');
    
    const [quantity, setQuantity] = useState(1);
    
    // Determine available sizes based on item type
    const itemType = item.type?.toLowerCase() || 'clothes';
    const availableSizes = itemType === 'shoes' ? SIZES_SHOES : (itemType === 'clothes' ? SIZES_CLOTHES : []);
    
    const [selectedSize, setSelectedSize] = useState(availableSizes[1] || availableSizes[0] || null);
    const [selectedDuration, setSelectedDuration] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState('apple');
    const { toggleSaveGem, isGemSaved } = useSaved();
    const isWishlisted = isGemSaved(item.id || item.title);

    const totalPrice = pricePerDay * quantity * selectedDuration;

    const handleBack = () => navigation.goBack();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Product Image Section */}
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: item.img || item.image }} 
                        style={styles.mainImage} 
                        contentFit="cover" 
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                        transition={300}
                    />
                    
                    {/* Header Overlay */}
                    <View style={styles.headerOverlay}>
                        <TouchableOpacity onPress={handleBack} style={styles.circleBtn}>
                            <Ionicons name="chevron-back" size={24} color="#000000" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleSaveGem({ ...item, id: item.id || item.title })} style={styles.circleBtn}>
                            <Ionicons name={isWishlisted ? "heart" : "heart-outline"} size={22} color={isWishlisted ? "#EF4444" : "#000000"} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.imageBadge}>
                        <Text style={styles.badgeText}>TRENDING</Text>
                    </View>
                </View>

                {/* Content Section */}
                <View style={styles.contentSection}>
                    <View style={styles.titleRow}>
                        <View>
                            <Text style={styles.title}>{item.title || 'Linen Summer Shirt'}</Text>
                            <View style={styles.ratingRow}>
                                <Ionicons name="star" size={16} color="#FACC15" />
                                <Text style={styles.ratingText}>4.5</Text>
                                <Text style={styles.reviewText}>(128 Reviews)</Text>
                            </View>
                        </View>
                        <Text style={styles.pricePerDay}>€{pricePerDay}<Text style={styles.dayUnit}>/day</Text></Text>
                    </View>

                    <View style={styles.divider} />


                    {/* Quantity Selector */}
                    <View style={styles.selectorRow}>
                        <Text style={styles.sectionLabel}>Quantity</Text>
                        <View style={styles.quantityControls}>
                            <TouchableOpacity 
                                style={styles.qtyBtn} 
                                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <Ionicons name="remove" size={20} color="#000000" />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{quantity}</Text>
                            <TouchableOpacity 
                                style={styles.qtyBtn} 
                                onPress={() => setQuantity(quantity + 1)}
                            >
                                <Ionicons name="add" size={20} color="#000000" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Size Selector - Only for Clothes and Shoes */}
                    {availableSizes.length > 0 && (
                        <>
                            <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Select Size</Text>
                            <View style={styles.optionsRow}>
                                {availableSizes.map(size => (
                                    <TouchableOpacity 
                                        key={size}
                                        style={[styles.optionPill, selectedSize === size && styles.optionPillActive]}
                                        onPress={() => setSelectedSize(size)}
                                    >
                                        <Text style={[styles.optionText, selectedSize === size && styles.optionTextActive]}>{size}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    )}

                    {/* Duration Selector */}
                    <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Rental Duration</Text>
                    <View style={styles.optionsRow}>
                        {DURATIONS.map(duration => (
                            <TouchableOpacity 
                                key={duration.value}
                                style={[styles.optionPillLarge, selectedDuration === duration.value && styles.optionPillActive]}
                                onPress={() => setSelectedDuration(duration.value)}
                            >
                                <Text style={[styles.optionText, selectedDuration === duration.value && styles.optionTextActive]}>
                                    {duration.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Payment Method Selector */}
                    <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Payment Method</Text>
                    <View style={styles.optionsRow}>
                        {PAYMENT_METHODS.map(method => (
                            <TouchableOpacity 
                                key={method.id}
                                style={[styles.optionPillLarge, selectedPayment === method.id && styles.optionPillActive]}
                                onPress={() => setSelectedPayment(method.id)}
                            >
                                <View style={styles.paymentPillContent}>
                                    <Ionicons 
                                        name={method.icon} 
                                        size={18} 
                                        color={selectedPayment === method.id ? "white" : "#64748B"} 
                                    />
                                    <Text style={[styles.optionText, { marginLeft: 8 }, selectedPayment === method.id && styles.optionTextActive]}>
                                        {method.label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Info Section */}
                    <View style={styles.infoBox}>
                        <View style={styles.infoItem}>
                            <Feather name="truck" size={18} color="#64748B" />
                            <View style={styles.infoItemTextCont}>
                                <Text style={styles.infoItemTitle}>Fast Delivery</Text>
                                <Text style={styles.infoItemSub}>Delivered to your hotel by 9 AM</Text>
                            </View>
                        </View>
                        <View style={styles.infoItem}>
                            <Feather name="repeat" size={18} color="#64748B" />
                            <View style={styles.infoItemTextCont}>
                                <Text style={styles.infoItemTitle}>Easy Returns</Text>
                                <Text style={styles.infoItemSub}>Free pickup from any location</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Bottom Bar */}
            <BlurView intensity={90} tint="light" style={styles.footer}>
                <View style={styles.footerPriceCont}>
                    <Text style={styles.totalLabel}>Total Price</Text>
                    <Text style={styles.totalPrice}>€{totalPrice}</Text>
                </View>
                <View style={styles.footerBtns}>
                    <TouchableOpacity 
                        style={styles.buyBtn}
                        onPress={() => {
                            if (availableSizes.length > 0 && !selectedSize) {
                                Alert.alert("Selection Required", "Please select a size before buying.");
                                return;
                            }
                            navigation.navigate('PurchaseFlow', { 
                                item: {
                                    ...item,
                                    image: item.img || item.image,
                                    buy: `€${pricePerDay * 10}` // Mock buy price as 10x rent price if not present
                                },
                                quantity,
                                selectedSize 
                            });
                        }}
                    >
                        <Text style={styles.buyBtnText}>Buy Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.rentBtn}
                        onPress={() => {
                            if (availableSizes.length > 0 && !selectedSize) {
                                Alert.alert("Selection Required", "Please select a size before renting.");
                                return;
                            }
                            navigation.navigate('RentFlow', { 
                                item: {
                                    ...item,
                                    image: item.img || item.image,
                                    rent: `€${pricePerDay}`
                                },
                                quantity,
                                selectedSize,
                                selectedDuration
                            });
                        }}
                    >
                        <Text style={styles.rentBtnText}>Rent Now</Text>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingBottom: 120,
    },
    imageContainer: {
        width: width,
        height: 480,
        position: 'relative',
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    headerOverlay: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    circleBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    imageBadge: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        backgroundColor: '#000000',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    contentSection: {
        paddingHorizontal: 24,
        paddingTop: 30,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
        marginLeft: 5,
    },
    reviewText: {
        fontSize: 13,
        color: '#94A3B8',
        marginLeft: 8,
        fontWeight: '500',
    },
    pricePerDay: {
        fontSize: 22,
        fontWeight: '900',
        color: '#000000',
    },
    dayUnit: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 25,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        color: '#475569',
        fontWeight: '500',
        marginBottom: 20,
    },
    selectorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 5,
        borderRadius: 12,
    },
    qtyBtn: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    qtyText: {
        fontSize: 16,
        fontWeight: '800',
        marginHorizontal: 15,
        minWidth: 20,
        textAlign: 'center',
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    optionPill: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    optionPillLarge: {
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    optionPillActive: {
        backgroundColor: '#000000',
        borderColor: '#000000',
    },
    optionText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
    },
    optionTextActive: {
        color: 'white',
    },
    infoBox: {
        backgroundColor: '#F8FAFC',
        borderRadius: 20,
        padding: 20,
        marginTop: 30,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoItemTextCont: {
        marginLeft: 15,
    },
    infoItemTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#0F172A',
    },
    infoItemSub: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2,
        fontWeight: '500',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingTop: 15,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: 'rgba(241, 245, 249, 0.5)',
    },
    footerPriceCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    totalLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000000',
    },
    footerBtns: {
        flexDirection: 'row',
        gap: 12,
    },
    buyBtn: {
        flex: 1,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buyBtnText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    rentBtn: {
        flex: 1,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 8,
    },
    rentBtnText: {
        fontSize: 16,
        fontWeight: '900',
        color: 'white',
    },
    paymentPillContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
