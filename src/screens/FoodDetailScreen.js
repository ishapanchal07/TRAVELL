import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import ShareService from '../services/ShareService';
import BottomNav from '../components/BottomNav';
import { usePayment } from '../context/PaymentContext';
import { useCart } from '../context/CartContext';
import { useAddress } from '../context/AddressContext';

const { width } = Dimensions.get('window');

const FOOD_HERO_IMG = 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&q=80&w=600';

export default function FoodDetailScreen({ route, navigation }) {
    const { handlePaidAction } = usePayment();
    const { addToCart } = useCart();
    const { selectedAddress } = useAddress();
    const { item = {} } = route.params || {};

    // Default values if item is empty
    const {
        name = item.title || 'Classic Beef Bourguignon',
        image = item.image || item.img || FOOD_HERO_IMG,
        price = item.price || '$28.00',
        rating = item.rating || '4.9',
        description = item.desc || item.description || 'Traditional Parisian beef stew slow-cooked in red wine with pearl onions and mushrooms.',
        subtitle = item.sub || item.subtitle || 'Traditional Parisian Bistro • 45 min'
    } = item;

    const [quantity, setQuantity] = useState(1);
    const [dietary, setDietary] = useState('Non-Veg');
    const [addons, setAddons] = useState({ baguette: false, salad: true });
    const [deliveryLoc, setDeliveryLoc] = useState('Hotel');

    // Parse base price
    const basePriceNum = parseFloat(price.replace(/[^0-9.]/g, '') || '28');
    const addonPrice = (addons.baguette ? 2.5 : 0) + (addons.salad ? 4.0 : 0);
    const deliveryFee = 2.0;
    const totalPrice = ((basePriceNum + addonPrice) * quantity) + deliveryFee;

    const currencySymbol = price.includes('€') ? '€' : price.includes('CHF') ? 'CHF ' : price.includes('AED') ? 'AED ' : '$';

    const handleShare = async () => {
        await ShareService.shareItem({
            title: name,
            description: description,
            image: image
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" transparent />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Hero section */}
                <View style={styles.heroContainer}>
                    <Image 
                        source={{ uri: image }} 
                        style={styles.heroImage} 
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                        transition={300}
                        contentFit="cover"
                    />
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                        <Feather name="share-2" size={20} color="white" />
                    </TouchableOpacity>

                    <View style={styles.heroOverlay}>
                        <View style={styles.badgeRow}>
                            <View style={styles.topRatedBadge}>
                                <Text style={styles.topRatedText}>TOP RATED</Text>
                            </View>
                            <View style={styles.ratingBox}>
                                <Ionicons name="star" size={14} color="#FACC15" />
                                <Text style={styles.ratingText}>{rating} (120+ Reviews)</Text>
                            </View>
                        </View>

                        <View style={styles.titleRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.foodTitle}>{name}</Text>
                                <Text style={styles.foodSubtitle}>{subtitle}</Text>
                            </View>
                            <View style={styles.bestForDinnerBox}>
                                <MaterialCommunityIcons name="silverware-fork-knife" size={18} color="white" />
                                <Text style={styles.bestForText}>BEST FOR DINNER</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Local Guide Tip */}
                <View style={styles.tipCard}>
                    <View style={styles.tipIconBox}>
                        <Ionicons name="happy" size={24} color="#000000" />
                    </View>
                    <View style={styles.tipContent}>
                        <Text style={styles.tipTitle}>LOCAL GUIDE TIP</Text>
                        <Text style={styles.tipText}>"{description || "In Paris, this is a quintessential dinner staple. Pairs perfectly with a Bordeaux wine."}"</Text>
                    </View>
                </View>

                {/* Quantity Selector */}
                <View style={[styles.section, { marginTop: 20 }]}>
                    <View style={styles.quantityContainer}>
                        <View>
                            <Text style={styles.sectionTitle}>Select Quantity</Text>
                            <Text style={styles.miniHeader}>HOW MANY SERVINGS?</Text>
                        </View>
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
                </View>

                {/* Customize Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Customize Your Order</Text>

                    <Text style={styles.miniHeader}>DIETARY CHOICE</Text>
                    <View style={styles.dietaryRow}>
                        <TouchableOpacity
                            style={[styles.dietOption, dietary === 'Non-Veg' ? styles.dietOptionActive : null]}
                            onPress={() => setDietary('Non-Veg')}
                        >
                            <MaterialCommunityIcons name="silverware-fork-knife" size={20} color={dietary === 'Non-Veg' ? '#000000' : '#94A3B8'} />
                            <Text style={[styles.dietText, dietary === 'Non-Veg' ? styles.dietTextActive : null]}>Non-Veg</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.dietOption, dietary === 'Veg' ? styles.dietOptionActive : null]}
                            onPress={() => setDietary('Veg')}
                        >
                            <MaterialCommunityIcons name="leaf" size={20} color={dietary === 'Veg' ? '#000000' : '#94A3B8'} />
                            <Text style={[styles.dietText, dietary === 'Veg' ? styles.dietTextActive : null]}>Veg Option</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Addons */}
                    <View style={styles.addonItem}>
                        <View style={styles.addonIconBox}>
                            <MaterialCommunityIcons name="baguette" size={22} color="#000000" />
                        </View>
                        <View style={styles.addonInfo}>
                            <Text style={styles.addonTitle}>Extra Baguette</Text>
                            <Text style={styles.addonSub}>Freshly baked</Text>
                        </View>
                        <Text style={styles.addonPrice}>+$2.50</Text>
                        <TouchableOpacity style={styles.addonToggle} onPress={() => setAddons({ ...addons, baguette: !addons.baguette })}>
                            <Ionicons name={addons.baguette ? "checkmark-circle" : "add"} size={addons.baguette ? 30 : 24} color={addons.baguette ? "#000000" : "#E2E8F0"} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.addonItem}>
                        <View style={styles.addonIconBox}>
                            <Ionicons name="leaf" size={20} color="#000000" />
                        </View>
                        <View style={styles.addonInfo}>
                            <Text style={styles.addonTitle}>Side Salad</Text>
                            <Text style={styles.addonSub}>Lemon vinaigrette</Text>
                        </View>
                        <Text style={styles.addonPrice}>+$4.00</Text>
                        <TouchableOpacity style={styles.addonToggle} onPress={() => setAddons({ ...addons, salad: !addons.salad })}>
                            <Ionicons name={addons.salad ? "checkmark-circle" : "add"} size={addons.salad ? 30 : 24} color={addons.salad ? "#000000" : "#E2E8F0"} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Delivery Location */}
                <View style={styles.section}>
                    <View style={styles.deliveryHeaderRow}>
                        <Text style={styles.sectionTitle}>Delivery Location</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AddressList', { onSelectGoBack: true })}>
                            <Text style={styles.changeAddressText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {selectedAddress ? (
                        <View style={styles.selectedAddrBox}>
                            <View style={styles.addrHeader}>
                                <Ionicons name={selectedAddress.label === 'Home' ? "home" : selectedAddress.label === 'Work' ? "briefcase" : "location"} size={16} color="#000000" />
                                <Text style={styles.addrLabel}>{selectedAddress.label}</Text>
                            </View>
                            <Text style={styles.addrText}>{selectedAddress.addressLine}, {selectedAddress.city}</Text>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.addAddrBox} onPress={() => navigation.navigate('AddressForm', { onSelectGoBack: true })}>
                            <Ionicons name="add-circle-outline" size={20} color="#64748B" />
                            <Text style={styles.addAddrText}>Add a Delivery Address</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Bill Details */}
                <View style={styles.billSection}>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Subtotal</Text>
                        <Text style={styles.billValue}>{price}</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Add-ons (Salad)</Text>
                        <Text style={styles.billValueAddon}>$4.00</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Delivery Fee</Text>
                        <View style={styles.ecoBadge}>
                            <Text style={styles.ecoText}>ECO-DELIVERY</Text>
                        </View>
                        <Text style={styles.billValue}>$2.00</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalPrice}>{currencySymbol}{totalPrice.toFixed(2)}</Text>
                    </View>
                </View>

                <View style={styles.footerBtnsContainer}>
                    <TouchableOpacity
                        style={styles.addToCartBtn}
                        onPress={() => {
                            if (!selectedAddress) {
                                import('react-native').then(({ Alert }) => Alert.alert("Address Required", "Please select a delivery address."));
                                navigation.navigate('AddressList', { onSelectGoBack: true });
                                return;
                            }
                            addToCart(item, quantity);
                            navigation.navigate('Cart');
                        }}
                    >
                        <Feather name="shopping-cart" size={18} color="#000000" style={{ marginRight: 8 }} />
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.placeOrderBtnExpanded}
                        activeOpacity={0.8}
                        onPress={() => {
                            if (!selectedAddress) {
                                import('react-native').then(({ Alert }) => Alert.alert("Address Required", "Please select a delivery address."));
                                navigation.navigate('AddressList', { onSelectGoBack: true });
                                return;
                            }
                            handlePaidAction(
                                {
                                    id: name,
                                    title: name,
                                    price: totalPrice - deliveryFee,
                                    image: image,
                                    serviceFee: 2.50,
                                    deliveryFee: `$${deliveryFee.toFixed(2)}`,
                                    section: 'food'
                                },
                                'OrderTracking',
                                navigation,
                                { orderItem: { name, image }, successMessage: 'Order Placed Successfully!', section: 'food' }
                            );
                        }}
                    >
                        <Text style={styles.placeOrderText}>Buy Now</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <BottomNav activeRoute="Explore" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingBottom: 150,
    },
    heroContainer: {
        width: '100%',
        height: 380,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
    shareButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
    heroOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        paddingTop: 60,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    topRatedBadge: {
        backgroundColor: '#000000',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 12,
    },
    topRatedText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '900',
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    foodTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 6,
    },
    foodSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        fontWeight: '500',
    },
    bestForDinnerBox: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        padding: 12,
        borderRadius: 16,
        alignItems: 'center',
        width: 100,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    bestForText: {
        color: 'white',
        fontSize: 8,
        fontWeight: '800',
        marginTop: 6,
        textAlign: 'center',
    },
    tipCard: {
        backgroundColor: '#F8FAFC',
        marginHorizontal: 24,
        marginTop: -30,
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        zIndex: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 5,
    },
    tipIconBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    tipContent: {
        flex: 1,
    },
    tipTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000000',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    tipText: {
        fontSize: 14,
        color: '#1E293B',
        lineHeight: 20,
        fontWeight: '500',
    },
    section: {
        marginTop: 35,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 20,
    },
    miniHeader: {
        fontSize: 11,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 1,
        marginBottom: 15,
    },
    dietaryRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 25,
    },
    dietOption: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        gap: 8,
    },
    dietOptionActive: {
        borderColor: '#000000',
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    dietText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#64748B',
    },
    dietTextActive: {
        color: '#000000',
    },
    addonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    addonIconBox: {
        width: 44,
        height: 44,
        borderRadius: 16,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    addonInfo: {
        flex: 1,
    },
    addonTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    addonSub: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 2,
    },
    addonPrice: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000000',
        marginRight: 12,
    },
    locationTabs: {
        flexDirection: 'row',
        backgroundColor: 'rgba(148, 163, 184, 0.05)',
        borderRadius: 16,
        padding: 6,
        gap: 6,
        marginBottom: 16,
    },
    locationTab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
    },
    locationTabActive: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#000000',
    },
    locationTabText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#94A3B8',
    },
    locationTabTextActive: {
        color: '#0F172A',
    },
    locDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    locDisplayText: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '600',
    },
    billSection: {
        marginTop: 40,
        paddingHorizontal: 24,
    },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    billLabel: {
        fontSize: 15,
        color: '#94A3B8',
        fontWeight: '600',
    },
    billValue: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    billValueAddon: {
        fontSize: 16,
        fontWeight: '800',
        color: '#000000',
    },
    ecoBadge: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        position: 'absolute',
        left: 95,
    },
    ecoText: {
        color: '#16A34A',
        fontSize: 8,
        fontWeight: '900',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginVertical: 10,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
    },
    totalPrice: {
        fontSize: 28,
        fontWeight: '900',
        color: '#000000',
    },
    placeOrderBtnExpanded: {
        backgroundColor: '#000000',
        flex: 1.5,
        height: 60,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 6,
    },
    placeOrderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 5,
        borderRadius: 16,
    },
    qtyBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    qtyText: {
        fontSize: 18,
        fontWeight: '900',
        marginHorizontal: 15,
        minWidth: 25,
        textAlign: 'center',
        color: '#0F172A',
    },
    footerBtnsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginTop: 40,
        gap: 12,
        alignItems: 'center',
    },
    addToCartBtn: {
        flex: 1,
        height: 60,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartText: {
        color: '#0F172A',
        fontSize: 16,
        fontWeight: '800',
    },
    deliveryHeaderRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'baseline', 
        marginBottom: 12
    },
    changeAddressText: {
        color: '#000000', 
        fontSize: 13, 
        fontWeight: '800',
        textDecorationLine: 'underline',
    },
    selectedAddrBox: {
        backgroundColor: '#F8FAFC',
        padding: 15,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    addrHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    addrLabel: {
        fontSize: 13,
        fontWeight: '800',
        color: '#0F172A',
        marginLeft: 6,
    },
    addrText: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 20,
    },
    addAddrBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F1F5F9',
        padding: 15,
        borderRadius: 16,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#CBD5E1',
    },
    addAddrText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#475569',
        marginLeft: 8,
    }
});
