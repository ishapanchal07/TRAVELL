import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const LOUVRE_IMG = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400';
const MARAIS_IMG = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
const AUTUMN_IMG = 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&q=80&w=400';
const SEINE_IMG = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400';

const ITEMS = [
    // Winter Collection
    { id: 'w1', title: 'Alpine Puffer', rent: '$45', buy: '$320', match: '98%', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400', category: 'Jackets', type: 'clothes', season: 'winter' },
    { id: 'w2', title: 'Wool Trench Coat', rent: '$55', buy: '$450', match: '95%', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=400', category: 'Jackets', type: 'clothes', season: 'winter' },
    { id: 'w3', title: 'Thermal Leggings', rent: '$15', buy: '$85', match: '92%', image: 'https://images.unsplash.com/photo-1552308995-2ac3c5d97490?auto=format&fit=crop&q=80&w=400', category: 'Pants', type: 'clothes', season: 'winter' },
    { id: 'w4', title: 'Cashmere Scarf', rent: '$12', buy: '$95', match: '99%', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=400', category: 'Accessories', type: 'accessory', season: 'winter' },
    { id: 'w5', title: 'Snow Boots', rent: '$30', buy: '$210', match: '90%', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=400', category: 'Shoes', type: 'shoes', season: 'winter' },
    { id: 'w6', title: 'Fleece Beanie', rent: '$8', buy: '$35', match: '96%', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&q=80&w=400', category: 'Accessories', type: 'accessory', season: 'winter' },

    // Summer Collection
    { id: 's1', title: 'Linen Breeze Shirt', rent: '$20', buy: '$120', match: '98%', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400', category: 'Shirts', type: 'clothes', season: 'summer' },
    { id: 's2', title: 'Floral Maxi Dress', rent: '$35', buy: '$245', match: '94%', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=400', category: 'Dresses', type: 'clothes', season: 'summer' },
    { id: 's3', title: 'Denim Shorts', rent: '$15', buy: '$75', match: '91%', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=400', category: 'Pants', type: 'clothes', season: 'summer' },
    { id: 's4', title: 'Aviator Sunglasses', rent: '$10', buy: '$160', match: '97%', image: 'https://images.unsplash.com/photo-1511499767010-a588b5b2f126?auto=format&fit=crop&q=80&w=400', category: 'Accessories', type: 'accessory', season: 'summer' },
    { id: 's5', title: 'Leather Sandals', rent: '$18', buy: '$130', match: '89%', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400', category: 'Shoes', type: 'shoes', season: 'summer' },
    { id: 's6', title: 'Sun Straw Hat', rent: '$12', buy: '$65', match: '93%', image: 'https://images.unsplash.com/photo-1533444841536-41e9795bc25e?auto=format&fit=crop&q=80&w=400', category: 'Accessories', type: 'accessory', season: 'summer' },

    // Monsoon Collection
    { id: 'm1', title: 'Lite-Rain Mac', rent: '$28', buy: '$195', match: '97%', image: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=400', category: 'Jackets', type: 'clothes', season: 'monsoon' },
    { id: 'm2', title: 'Quick-Dry Trousers', rent: '$22', buy: '$140', match: '93%', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=400', category: 'Pants', type: 'clothes', season: 'monsoon' },
    { id: 'm3', title: 'Waterproof Tote', rent: '$15', buy: '$95', match: '95%', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400', category: 'Accessories', type: 'accessory', season: 'monsoon' },
    { id: 'm4', title: 'Gore-Tex Sneakers', rent: '$35', buy: '$260', match: '91%', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=400', category: 'Shoes', type: 'shoes', season: 'monsoon' },
    { id: 'm5', title: 'Compact Umbrella', rent: '$5', buy: '$25', match: '99%', image: 'https://images.unsplash.com/photo-1542153200-84dc248d6db3?auto=format&fit=crop&q=80&w=400', category: 'Accessories', type: 'accessory', season: 'monsoon' },

    // Autumn / Mixed (existing logic support)
    { id: 'a1', title: 'Louvre Morning', rent: '$24', buy: '$185', match: '98%', image: LOUVRE_IMG, category: 'Jackets', type: 'clothes', season: 'autumn' },
    { id: 'a2', title: 'Marais Chic', rent: '$32', buy: '$240', match: '85%', image: MARAIS_IMG, category: 'Dresses', type: 'clothes', season: 'autumn' },
    { id: 'a3', title: 'Autumn Beret', rent: '$12', buy: '$45', match: '92%', image: AUTUMN_IMG, category: 'Accessories', type: 'accessory', season: 'autumn', isSmallImage: true },
    { id: 'a4', title: 'Seine Stroll', rent: '$35', buy: '$210', match: '76%', image: SEINE_IMG, category: 'Dresses', type: 'clothes', season: 'autumn' },

    // Additional items to reach ~35
    { id: 'x1', title: 'Cotton Polo', rent: '$14', buy: '$65', match: '88%', image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=400', category: 'Shirts', type: 'clothes', season: 'summer' },
    { id: 'x2', title: 'Chino Pants', rent: '$18', buy: '$95', match: '85%', image: 'https://images.unsplash.com/photo-1473966968600-fa804b86900a?auto=format&fit=crop&q=80&w=400', category: 'Pants', type: 'clothes', season: 'summer' },
    { id: 'x3', title: 'Silk Scarf', rent: '$10', buy: '$75', match: '93%', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=400', category: 'Accessories', type: 'accessory', season: 'autumn' },
    { id: 'x4', title: 'Classic Blazer', rent: '$40', buy: '$280', match: '96%', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400', category: 'Jackets', type: 'clothes', season: 'autumn' },
    { id: 'x5', title: 'V-Neck Sweater', rent: '$22', buy: '$120', match: '94%', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?auto=format&fit=crop&q=80&w=400', category: 'Shirts', type: 'clothes', season: 'autumn' },
    { id: 'x6', title: 'Cargo Joggers', rent: '$16', buy: '$85', match: '87%', image: 'https://images.unsplash.com/photo-1517406322961-d70b7774d0a8?auto=format&fit=crop&q=80&w=400', category: 'Pants', type: 'clothes', season: 'monsoon' },
    { id: 'x7', title: 'Oxford Shoes', rent: '$25', buy: '$190', match: '92%', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400', category: 'Shoes', type: 'shoes', season: 'autumn' },
    { id: 'x8', title: 'Canvas Tote', rent: '$8', buy: '$40', match: '90%', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400', category: 'Accessories', type: 'accessory', season: 'summer' },
    { id: 'x9', title: 'Bucket Hat', rent: '$12', buy: '$55', match: '86%', image: 'https://images.unsplash.com/photo-1575424909138-46b05e5919ec?auto=format&fit=crop&q=80&w=400', category: 'Accessories', type: 'accessory', season: 'summer' },
    { id: 'x10', title: 'Knit Cardigan', rent: '$20', buy: '$110', match: '95%', image: 'https://images.unsplash.com/photo-1583846783204-d4635955365e?auto=format&fit=crop&q=80&w=400', category: 'Shirts', type: 'clothes', season: 'winter' },
    { id: 'x11', title: 'Velvet Evening Dress', rent: '$60', buy: '$520', match: '97%', image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&q=80&w=400', category: 'Dresses', type: 'clothes', season: 'autumn' },
    { id: 'x12', title: 'Active Windbreaker', rent: '$24', buy: '$165', match: '93%', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400', category: 'Jackets', type: 'clothes', season: 'monsoon' },
    { id: 'x13', title: 'Platform Loafers', rent: '$22', buy: '$175', match: '89%', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400', category: 'Shoes', type: 'shoes', season: 'winter' },
    { id: 'x14', title: 'Graphic Tee', rent: '$10', buy: '$45', match: '82%', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=400', category: 'Shirts', type: 'clothes', season: 'summer' },
    { id: 'x15', title: 'Stretch Skinny Jeans', rent: '$18', buy: '$95', match: '91%', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=400', category: 'Pants', type: 'clothes', season: 'autumn' }
];

export default function WardrobeScreen({ navigation }) {
    const { isLoggedIn } = useAuth();
    const { addToCart, itemCount } = useCart();
    const [travelGroup, setTravelGroup] = useState('Solo'); // Options: Solo, Couple, Family, Elderly
    const [gender, setGender] = useState('Female');
    const [weather, setWeather] = useState({ temp: '12°C', season: 'Autumn', condition: 'Sunny' });
    const [destination, setDestination] = useState('PARIS, FRANCE');
    const [activeStyle, setActiveStyle] = useState('All Styles');
    const [selectedIds, setSelectedIds] = useState([]);

    // Trip Duration Logic
    const currentYear = new Date().getFullYear();
    const [startDate, setStartDate] = useState(new Date(currentYear, 8, 12)); // Sept 12
    const [endDate, setEndDate] = useState(new Date(currentYear, 8, 18)); // Sept 18

    const calculateDuration = () => {
        const diffTime = Math.abs(endDate - startDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const duration = calculateDuration();

    // Catalog filtering
    const displayItems = isLoggedIn ? ITEMS : ITEMS.slice(0, 4);

    const filteredItems = displayItems.filter(item => {
        // Tag filter logic (mock style mapping)
        if (activeStyle !== 'All Styles' && item.category !== activeStyle && item.season.toLowerCase() !== activeStyle.toLowerCase()) {
            if (activeStyle === 'Chic' && !item.title.toLowerCase().includes('chic') && item.category !== 'Dresses') return false;
            if (activeStyle === 'Evening' && !item.title.toLowerCase().includes('evening') && item.category !== 'Dresses') return false;
            if (activeStyle === 'Streetwear' && !['Jackets', 'Pants', 'Shoes'].includes(item.category)) return false;
        }

        // Seasonal filter
        if (weather.season && item.season !== 'autumn') {
            if (weather.season.toLowerCase() === 'winter' && item.season !== 'winter') return false;
            if (weather.season.toLowerCase() === 'summer' && item.season !== 'summer') return false;
            if (weather.season.toLowerCase() === 'monsoon' && item.season !== 'monsoon') return false;
        }
        return true;
    });

    const toggleSelection = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const getSelectedItems = () => ITEMS.filter(item => selectedIds.includes(item.id)).map(i => ({ ...i, section: 'clothing' }));

    // Recommendation Logic Helpers
    const getRecommendationWarnings = (item) => {
        const warnings = [];
        if (destination.includes('DUBAI') && item.title.toLowerCase().includes('short')) {
            warnings.push({ text: 'Cultural Notice: Modest clothing recommended for public areas.', type: 'alert' });
        }
        if (weather.season === 'Winter' && !['jacket', 'coat', 'sweater', 'winter'].some(kw => item.title.toLowerCase().includes(kw))) {
            warnings.push({ text: 'Weather Alert: This might not be warm enough for 0°C.', type: 'weather' });
        }
        if ((travelGroup === 'Family' || travelGroup === 'Elderly') && item.title.toLowerCase().includes('chic')) {
            warnings.push({ text: 'Comfort Priority: Consider more breathable fabrics for active days.', type: 'safety' });
        }
        return warnings;
    };

    const isRecommended = (item) => {
        if (travelGroup === 'Solo' || travelGroup === 'Couple') {
            return item.match;
        }
        if (item.title.toLowerCase().includes('chic') && (travelGroup === 'Family' || travelGroup === 'Elderly')) {
            return (parseInt(item.match) - 10) + '%';
        }
        return item.match;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

            <View style={styles.headerRow}>
                <View style={styles.locationPill}>
                    <Ionicons name="location" size={12} color="#000000" />
                    <Text style={styles.locationText}>{destination}</Text>
                </View>
                <View style={styles.weatherPill}>
                    <Ionicons name={weather.condition === 'Sunny' ? "sunny" : "cloud"} size={14} color="#F59E0B" />
                    <Text style={styles.weatherText}>{weather.temp}</Text>
                </View>
            </View>

            <View style={styles.titleRow}>
                <View>
                    <Text style={styles.mainTitle}>Apparel Selection</Text>
                    <Text style={styles.durationText}>{duration} Day Trip • {currentYear}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={[styles.filterBtn, { marginRight: 10 }]} onPress={() => navigation.navigate('Cart')}>
                        <Feather name="shopping-bag" size={18} color="#0F172A" />
                        {itemCount > 0 && (
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>{itemCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.filterBtn}
                        onPress={() => navigation.navigate('FiltersPreferences')}
                    >
                        <Feather name="sliders" size={18} color="#0F172A" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tags Scroll */}
            <View style={styles.tagsWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagsScroll}>
                    {['All Styles', 'Chic', 'Evening', 'Streetwear'].map(tag => (
                        <TouchableOpacity
                            key={tag}
                            style={[styles.tag, activeStyle === tag && styles.tagActive]}
                            onPress={() => setActiveStyle(tag)}
                        >
                            <Text style={[styles.tagText, activeStyle === tag && styles.tagTextActive]}>{tag}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {!isLoggedIn && (
                <View style={styles.loginHint}>
                    <Ionicons name="lock-closed" size={14} color="#64748B" />
                    <Text style={styles.loginHintText}>Sign in to unlock 35+ premium pieces</Text>
                </View>
            )}

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.gridContainer}>
                    {filteredItems.map((item) => {
                        const modifiedMatch = isRecommended(item);
                        const warnings = getRecommendationWarnings(item);
                        const isSelected = selectedIds.includes(item.id);

                        return (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.9}
                                style={[styles.itemCard, isSelected && styles.itemCardSelected]}
                                onPress={() => toggleSelection(item.id)}
                            >
                                <View style={styles.imageContainer}>
                                    {item.isSmallImage ? (
                                        <View style={styles.smallImageWrap}>
                                            <Image 
                                                source={{ uri: item.image }} 
                                                style={styles.itemImageSmall} 
                                                contentFit="cover"
                                                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                                transition={300}
                                            />
                                        </View>
                                    ) : (
                                        <Image 
                                            source={{ uri: item.image }} 
                                            style={styles.itemImage} 
                                            contentFit="cover" 
                                            placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                            transition={300}
                                        />
                                    )}
                                    <View style={styles.matchBadge}>
                                        <Text style={styles.matchText}>{modifiedMatch} MATCH</Text>
                                    </View>
                                    {isSelected && (
                                        <View style={styles.selectedOverlay}>
                                            <Ionicons name="checkmark-circle" size={24} color="#000000" />
                                        </View>
                                    )}
                                </View>

                                <View style={styles.itemInfo}>
                                    <View style={styles.titlePriceRow}>
                                        <Text style={styles.itemTitle}>{item.title}</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { item: { ...item, img: item.image, section: 'clothing' } })}>
                                            <Ionicons name="information-circle-outline" size={22} color="#94A3B8" />
                                        </TouchableOpacity>
                                    </View>

                                    {warnings.map((w, i) => (
                                        <View key={i} style={styles.warningBox}>
                                            <Ionicons
                                                name={w.type === 'alert' ? "alert-circle" : "information-circle"}
                                                size={10}
                                                color={w.type === 'alert' ? "#EF4444" : "#000000"}
                                            />
                                            <Text style={[styles.warningText, { color: w.type === 'alert' ? "#EF4444" : "#000000" }]}>{w.text}</Text>
                                        </View>
                                    ))}

                                    <View style={styles.priceRow}>
                                        <View style={styles.priceCell}>
                                            <Text style={styles.priceLabel}>RENT</Text>
                                            <Text style={styles.priceValueBlue}>{item.rent}<Text style={styles.priceUnit}>/d</Text></Text>
                                        </View>
                                        <TouchableOpacity 
                                            style={styles.addToCartBtnSmall}
                                            onPress={() => addToCart(item)}
                                        >
                                            <Feather name="shopping-cart" size={16} color="#000000" />
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={[styles.priceCell, { alignItems: 'flex-end' }]}
                                            onPress={() => navigation.navigate('PurchaseFlow', { item: { ...item, section: 'clothing' } })}
                                        >
                                            <Text style={styles.priceLabel}>BUY</Text>
                                            <Text style={styles.priceValueDark}>{item.buy}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Quick Rent Button */}
            <View style={styles.actionBtnWrapper}>
                <TouchableOpacity
                    style={[styles.actionBtn, selectedIds.length === 0 && styles.actionBtnDisabled]}
                    activeOpacity={0.9}
                    disabled={selectedIds.length === 0}
                    onPress={() => navigation.navigate('WardrobeCheckout', { selectedItems: getSelectedItems() })}
                >
                    <Ionicons name="flash" size={16} color="white" />
                    <Text style={styles.actionBtnText}>
                        QUICK-RENT SELECTED LOOK {selectedIds.length > 0 ? `(${selectedIds.length} ITEMS)` : ''}
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 15,
        marginBottom: 20,
    },
    locationPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    locationText: {
        color: '#000000',
        fontSize: 10,
        fontWeight: '800',
        marginLeft: 6,
        letterSpacing: 0.5,
    },
    weatherPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    weatherText: {
        color: '#0F172A',
        fontSize: 12,
        fontWeight: '800',
        marginLeft: 6,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: '900',
        color: '#0F172A',
    },
    durationText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
        marginTop: 2,
    },
    filterBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cartBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#EF4444',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    cartBadgeText: {
        color: 'white',
        fontSize: 9,
        fontWeight: 'bold',
    },
    tagsWrapper: {
        marginBottom: 15,
    },
    tagsScroll: {
        paddingHorizontal: 20,
    },
    tag: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    tagActive: {
        backgroundColor: '#333333',
        borderColor: '#333333',
        shadowColor: '#333333',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    tagText: {
        color: '#475569',
        fontSize: 13,
        fontWeight: '700',
    },
    tagTextActive: {
        color: 'white',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 120, // accommodate bottom action btn
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    itemCard: {
        backgroundColor: 'white',
        width: '48%',
        borderRadius: 24,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    itemCardSelected: {
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOpacity: 0.1,
    },
    imageContainer: {
        width: '100%',
        height: 180,
        backgroundColor: '#F3F4F6', // lighter grey background
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    smallImageWrap: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    itemImageSmall: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        contentFit: 'cover',
    },
    selectedOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    matchBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#333333',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    matchText: {
        color: 'white',
        fontSize: 8,
        fontWeight: '800',
    },
    itemInfo: {
        padding: 12,
    },
    titlePriceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#0F172A',
        flex: 1,
    },
    warningBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: '#F8FAFC',
        padding: 4,
        borderRadius: 4,
    },
    warningText: {
        fontSize: 8,
        fontWeight: '700',
        marginLeft: 4,
        flex: 1,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 4,
    },
    priceCell: {
        paddingVertical: 4,
    },
    priceLabel: {
        fontSize: 8,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    priceValueBlue: {
        fontSize: 14,
        fontWeight: '800',
        color: '#000000',
    },
    priceUnit: {
        fontSize: 10,
        color: '#94A3B8',
        fontWeight: '700',
    },
    priceValueDark: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0F172A',
    },
    addToCartBtnSmall: {
        padding: 6,
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        marginHorizontal: 10,
    },

    // Action Button
    actionBtnWrapper: {
        position: 'absolute',
        bottom: 100, // Right above the floating nav
        left: 20,
        right: 20,
    },
    actionBtn: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },
    actionBtnDisabled: {
        backgroundColor: '#94A3B8',
        shadowOpacity: 0,
        elevation: 0,
    },
    actionBtnText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '800',
        marginLeft: 8,
        letterSpacing: 0.5,
    },
    loginHint: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F1F5F9',
        paddingVertical: 6,
        marginBottom: 10,
    },
    loginHintText: {
        fontSize: 10,
        color: '#64748B',
        fontWeight: '700',
        marginLeft: 6,
    },
});
