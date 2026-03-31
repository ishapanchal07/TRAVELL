import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Image as RNImage, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useCart } from '../context/CartContext';
import { useAddress } from '../context/AddressContext';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function CartScreen({ navigation }) {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();
    const { selectedAddress } = useAddress();

    const handleNavigateToItem = (item) => {
        const isClothing = item.type === 'clothes' || item.type === 'shoes' || item.type === 'accessory' || item.category;
        if (isClothing) {
            navigation.navigate('ProductDetail', { item });
        } else {
            navigation.navigate('FoodDetail', { item });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAF9" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>Your Cart</Text>
                    <Text style={styles.headerSubtitle}>{itemCount} item{itemCount !== 1 ? 's' : ''}</Text>
                </View>
                <View style={{ width: 44 }} />
            </View>

            {cartItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={80} color="#E2E8F0" />
                    <Text style={styles.emptyTitle}>Your cart is empty</Text>
                    <Text style={styles.emptySub}>Looks like you haven't added anything yet.</Text>
                    <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.shopBtnText}>Continue Browsing</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        {cartItems.map((item, index) => {
                            const priceStr = item.price || item.rent || item.buy || '$0';
                            
                            return (
                                <View key={`${item.id}-${item.selectedSize}-${item.selectedDuration}-${index}`} style={styles.cartItem}>
                                    <TouchableOpacity style={styles.itemImageContainer} onPress={() => handleNavigateToItem(item)}>
                                        <Image 
                                            source={{ uri: item.image || item.img }} 
                                            style={styles.itemImage} 
                                            contentFit="cover"
                                            transition={300}
                                        />
                                    </TouchableOpacity>
                                    
                                    <View style={styles.itemDetails}>
                                        <View style={styles.titleRow}>
                                            <TouchableOpacity onPress={() => handleNavigateToItem(item)} style={{ flex: 1 }}>
                                                <Text style={styles.itemTitle} numberOfLines={2}>{item.title || item.name}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                style={styles.deleteBtn}
                                                onPress={() => removeFromCart(item.id, item.selectedSize, item.selectedDuration)}
                                            >
                                                <Feather name="trash-2" size={18} color="#EF4444" />
                                            </TouchableOpacity>
                                        </View>
                                        
                                        {/* Optional Attributes like Size or Duration */}
                                        <View style={styles.attributesRow}>
                                            {item.selectedSize && <Text style={styles.attributeText}>Size: {item.selectedSize}  </Text>}
                                            {item.selectedDuration && <Text style={styles.attributeText}>Duration: {item.selectedDuration} day(s)</Text>}
                                        </View>

                                        <View style={styles.bottomRow}>
                                            <Text style={styles.price}>{priceStr}</Text>
                                            
                                            <View style={styles.quantityControls}>
                                                <TouchableOpacity 
                                                    style={styles.qtyBtn} 
                                                    onPress={() => updateQuantity(item.id, -1, item.selectedSize, item.selectedDuration)}
                                                >
                                                    <Ionicons name="remove" size={16} color="#000000" />
                                                </TouchableOpacity>
                                                <Text style={styles.qtyText}>{item.quantity}</Text>
                                                <TouchableOpacity 
                                                    style={styles.qtyBtn} 
                                                    onPress={() => updateQuantity(item.id, 1, item.selectedSize, item.selectedDuration)}
                                                >
                                                    <Ionicons name="add" size={16} color="#000000" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>

                    {/* Checkout Footer */}
                    <BlurView intensity={90} tint="light" style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Price</Text>
                            <Text style={styles.totalAmount}>${cartTotal.toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.checkoutBtn}
                            onPress={() => {
                                if (!selectedAddress) {
                                    import('react-native').then(({ Alert }) => Alert.alert("Address Required", "Please add a delivery address."));
                                    navigation.navigate('AddressList', { onSelectGoBack: true });
                                    return;
                                }
                                navigation.navigate('Checkout');
                            }}
                        >
                            <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
                            <Feather name="arrow-right" size={18} color="white" />
                        </TouchableOpacity>
                    </BlurView>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAF9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    backBtn: {
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
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0F172A',
        marginTop: 20,
        marginBottom: 8,
    },
    emptySub: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
    },
    shopBtn: {
        backgroundColor: '#000000',
        paddingHorizontal: 30,
        paddingVertical: 16,
        borderRadius: 16,
    },
    shopBtnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '800',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 150,
        paddingTop: 10,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
    },
    itemImageContainer: {
        width: 90,
        height: 90,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#F1F5F9',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    itemDetails: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-between',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#0F172A',
        marginRight: 10,
        lineHeight: 20,
    },
    deleteBtn: {
        padding: 4,
    },
    attributesRow: {
        flexDirection: 'row',
        marginTop: 4,
    },
    attributeText: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
        marginRight: 8,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000000',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 4,
        paddingVertical: 4,
        borderRadius: 12,
    },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    qtyText: {
        fontSize: 14,
        fontWeight: '800',
        marginHorizontal: 12,
        minWidth: 16,
        textAlign: 'center',
        color: '#0F172A',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: 'rgba(241, 245, 249, 0.5)',
    },
    totalRow: {
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
    totalAmount: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000000',
    },
    checkoutBtn: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 8,
    },
    checkoutBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
        marginRight: 10,
    },
});
