import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';
import { useSaved } from '../context/SavedContext';
import ExperienceCard from '../components/ExperienceCard';

const { width } = Dimensions.get('window');

const ROME_DATA = {
    city: 'Rome',
    weather: { temp: '22°C', condition: 'Sunny', icon: 'sunny' },
    hero: {
        title: 'Rome:',
        subtitle: 'The Eternal City',
        desc: 'Step into history and savor authentic Italian culture.',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop'
    },
    bestTime: 'April - June or September - October',
    budget: 'Moderate (€90 - 180 per day)',
    transport: 'Metro, Walking, and Vespa rentals',

    experiences: [
        { id: 1, title: 'The Colosseum Tour', sub: 'History', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=400&auto=format&fit=crop', duration: '3h', fee: '€45', bestTime: 'Morning', crowd: 'High' },
        { id: 2, title: 'Vatican Art Gallery', sub: 'Art', img: 'https://images.unsplash.com/photo-1531572753321-ad063cecc140?q=80&w=400&auto=format&fit=crop', duration: '4h', fee: '€35', bestTime: 'Morning', crowd: 'High' },
        { id: 3, title: 'Trevi Fountain Walk', sub: 'History', img: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=400&auto=format&fit=crop', duration: '1h', fee: 'Free', bestTime: 'Late Night', crowd: 'Medium' },
        { id: 4, title: 'Roman Forum Ruins', sub: 'History', img: 'https://images.unsplash.com/photo-1552432552-32946c1ed6ca?q=80&w=400&auto=format&fit=crop', duration: '2h', fee: '€16', bestTime: 'Morning', crowd: 'Medium' },
        { id: 5, title: 'Piazza Navona Sunset', sub: 'Nightlife', img: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=400&auto=format&fit=crop', duration: '2h', fee: 'Free', bestTime: 'Evening', crowd: 'Medium' },
        { id: 6, title: 'Pantheon Dome Visit', sub: 'History', img: 'https://images.unsplash.com/photo-1515542641795-85ed38058252?q=80&w=400&auto=format&fit=crop', duration: '1h', fee: 'Free', bestTime: 'Morning', crowd: 'Medium' }
    ],
    clothes: [
        { id: 1, title: 'Linen Summer Shirt', price: '€35/day', category: 'Summer', type: 'clothes', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop' },
        { id: 2, title: 'Designer Sunglasses', price: '€15/day', category: 'Accessory', type: 'accessory', img: 'https://images.unsplash.com/photo-1511499767010-a588b5b2f126?q=80&w=400&auto=format&fit=crop' },
        { id: 3, title: 'Suede Loafers', price: '€28/day', category: 'Footwear', type: 'shoes', img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=400&auto=format&fit=crop' },
        { id: 4, title: 'Silk Summer Dress', price: '€22/day', category: 'Summer', type: 'clothes', img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=400&auto=format&fit=crop' },
        { id: 5, title: 'Leather Crossbody Bag', price: '€12/day', category: 'Accessory', type: 'accessory', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop' }
    ],
    food: [
        { id: 1, title: 'Authentic Carbonara', sub: 'Roscioli • 30m wait', img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400&auto=format&fit=crop' },
        { id: 2, title: 'Artisanal Gelato', sub: 'Giolitti • Iconic', img: 'https://images.unsplash.com/photo-1501430460131-46c4a4713472?q=80&w=400&auto=format&fit=crop' },
        { id: 3, title: 'Crispy Suppli', sub: 'Pizzarium • Street food', img: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400&auto=format&fit=crop' },
        { id: 4, title: 'Tonnarelli Cacio e Pepe', sub: 'Roma • Classic Pasta', img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=400&auto=format&fit=crop' },
        { id: 5, title: 'Roman Style Pizza', sub: 'Emma • Thin & Crispy', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop' }
    ],
    photoSpots: [
        { id: 1, title: 'Pantheon Square', img: 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?q=80&w=400&auto=format&fit=crop' },
        { id: 2, title: 'Piazza Navona', img: 'https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=400&auto=format&fit=crop' },
        { id: 3, title: 'Janiculum Hill View', img: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=400&auto=format&fit=crop' },
        { id: 4, title: 'Castel Sant\'Angelo', img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=400&auto=format&fit=crop' }
    ]
};

export default function RomeScreen({ navigation }) {
    const { isLoggedIn } = useAuth();
    const { toggleSaveGem, isGemSaved } = useSaved();
    const data = ROME_DATA;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <View style={styles.topHeader}>
                <View style={styles.logoRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                        <Ionicons name="chevron-back" size={24} color="#0F172A" />
                    </TouchableOpacity>
                    <View style={styles.logoIconCircle}>
                        <Ionicons name="compass" size={16} color="white" />
                    </View>
                    <Text style={styles.logoText}>Roamster</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Map', { city: 'Rome', location: 'Colosseum, Rome' })}>
                        <Ionicons name="map-outline" size={18} color="#000000" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                {/* Hero Section */}
                <ImageBackground 
                    source={{ uri: data.hero.image }} 
                    style={styles.heroImage}
                    placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                    transition={300}
                    contentFit="cover"
                >
                    <View style={styles.heroOverlay}>
                        <TouchableOpacity 
                            style={styles.weatherPill}
                            onPress={() => {
                                import('react-native').then(({ Alert }) => {
                                    Alert.alert("Weather", `Current temperature in ${data.city} is ${data.weather.temp}. A perfect day to visit the Colosseum!`);
                                });
                            }}
                        >
                            <Ionicons name={data.weather.icon} size={14} color="white" />
                            <View style={weatherStyles.weatherTextCont}>
                                <Text style={weatherStyles.weatherCity}>{data.city} Today</Text>
                                <Text style={weatherStyles.weatherTemp}>{data.weather.temp}, {data.weather.condition}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.heroBottom}>
                            <View style={styles.trendingPill}>
                                <Text style={styles.trendingText}>TRENDING DESTINATION</Text>
                            </View>
                            <Text style={styles.heroTitle}>{data.hero.title}</Text>
                            <Text style={styles.heroSubtitle}>{data.hero.subtitle}</Text>
                            <Text style={styles.heroDesc}>{data.hero.desc}</Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.contentPadding}>

                    {/* Destination Facts */}
                    <View style={styles.factsGrid}>
                        <FactItem icon="calendar" label="Best Time" value={data.bestTime} />
                        <FactItem icon="wallet" label="Daily Budget" value={data.budget} />
                        <FactItem icon="bus" label="Transport" value={data.transport} />
                    </View>

                    {/* Experience Plan */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Top Experiences</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AllPlaces', { title: 'Experiences in Rome', items: data.experiences })}>
                            <Text style={styles.viewAllText}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                        {(isLoggedIn ? data.experiences : data.experiences.slice(0, 3)).map(exp => (
                            <View key={exp.id} style={{ width: 280, marginRight: 15 }}>
                                <ExperienceCard 
                                    item={exp}
                                    isSaved={isGemSaved(exp.id)}
                                    onPress={() => navigation.navigate('ExperienceDetail', { item: exp })}
                                    onSave={() => toggleSaveGem(exp)}
                                    onBookNow={() => navigation.navigate('ExperienceDetail', { item: exp })}
                                    onViewMap={() => navigation.navigate('Map', { city: 'Rome', location: exp.title })}
                                />
                            </View>
                        ))}
                    </ScrollView>

                    {/* Clothing Recommendations - Based on Weather */}
                    <View style={[styles.sectionHeader, { marginTop: 25 }]}>
                        <View>
                            <Text style={styles.sectionTitle}>Summer Essentials</Text>
                            <Text style={styles.sectionSub}>Based on current {data.weather.condition} weather</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AllClothes', { city: 'Rome', items: data.clothes })}>
                            <Text style={styles.viewAllText}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                        {(isLoggedIn ? data.clothes : data.clothes.slice(0, 2)).map(item => (
                            <View key={item.id} style={styles.outfitCard}>
                                <Image 
                                    source={{ uri: item.img }} 
                                    style={styles.outfitImage} 
                                    contentFit="cover"
                                    placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                    transition={300}
                                />
                                <View style={styles.outfitBotRow}>
                                    <View>
                                        <Text style={styles.outfitTitle}>{item.title}</Text>
                                        <Text style={styles.outfitPrice}>{item.price}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={styles.rentBtn}
                                        onPress={() => navigation.navigate('ProductDetail', { item })}
                                    >
                                        <Text style={styles.rentBtnText}>RENT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Local Food */}
                    <View style={[styles.sectionHeader, { marginTop: 25 }]}>
                        <Text style={styles.sectionTitle}>Italian Cravings</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('CityFood', { city: 'Rome' })}>
                            <Text style={styles.viewAllText}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                        {(isLoggedIn ? data.food : data.food.slice(0, 2)).map(f => (
                            <TouchableOpacity 
                                key={f.id} 
                                style={styles.foodCard}
                                onPress={() => navigation.navigate('FoodDetail', { item: { name: f.title, image: f.img, subtitle: f.sub, price: f.price || '€14.00' } })}
                            >
                                <Image 
                                    source={{ uri: f.img }} 
                                    style={styles.foodImage} 
                                    contentFit="cover"
                                    placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                    transition={300}
                                />
                                <View style={styles.foodTextCont}>
                                    <Text style={styles.foodTitle}>{f.title}</Text>
                                    <Text style={styles.foodSub}>{f.sub}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {isLoggedIn && (
                        <>


                             {/* Photo Spots */}
                             <View style={styles.sectionHeader}>
                                 <Text style={styles.sectionTitle}>Perfect Snap Spots</Text>
                                 <TouchableOpacity onPress={() => navigation.navigate('SnapSpots', { items: data.photoSpots, city: 'Rome' })}>
                                     <Text style={styles.viewAllText}>View all</Text>
                                 </TouchableOpacity>
                             </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                                {data.photoSpots.map(spot => (
                                    <TouchableOpacity 
                                        key={spot.id} 
                                        style={styles.photoSpotCard}
                                        onPress={() => navigation.navigate('SnapSpotDetails', { spot, city: 'Rome' })}
                                    >
                                        <Image 
                                            source={{ uri: spot.img }} 
                                            style={styles.photoImage} 
                                            contentFit="cover"
                                            placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                            transition={300}
                                        />
                                        <Text style={styles.photoTitle}>{spot.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </>
                    )}

                    {!isLoggedIn && (
                        <TouchableOpacity
                            style={styles.unlockBanner}
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <BlurView intensity={80} tint="light" style={styles.unlockBlur}>
                                <View style={styles.lockCircle}>
                                    <Ionicons name="lock-closed" size={24} color="#000000" />
                                </View>
                                <Text style={styles.unlockTitle}>Login to unlock full guide</Text>
                                <Text style={styles.unlockDesc}>Access full transport tips and all photo spots.</Text>
                                <View style={styles.unlockBtn}>
                                    <Text style={styles.unlockBtnText}>Unlock Now</Text>
                                </View>
                            </BlurView>
                        </TouchableOpacity>
                    )}

                </View>
            </ScrollView>

            <BottomNav activeRoute="Explore" />

        </SafeAreaView>
    );
}

function FactItem({ icon, label, value }) {
    return (
        <View style={styles.factItem}>
            <View style={styles.factIconBox}>
                <Ionicons name={icon} size={20} color="#000000" />
            </View>
            <Text style={styles.factLabel}>{label}</Text>
            <Text style={styles.factValue}>{value}</Text>
        </View>
    );
}

const weatherStyles = StyleSheet.create({
    weatherTextCont: {
        marginLeft: 6,
    },
    weatherCity: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 9,
        fontWeight: '600',
    },
    weatherTemp: {
        color: 'white',
        fontSize: 11,
        fontWeight: '700',
    },
});

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAF9',
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 12,
        zIndex: 10,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIconCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '800',
        marginLeft: 8,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    scrollContainer: {
        paddingBottom: 100,
    },
    heroImage: {
        width: '100%',
        height: 350,
    },
    heroOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 20,
        justifyContent: 'space-between',
    },
    weatherPill: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    heroBottom: {
        marginBottom: 20,
    },
    trendingPill: {
        backgroundColor: '#000000',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        marginBottom: 10,
    },
    trendingText: {
        color: 'white',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    heroTitle: {
        color: 'white',
        fontSize: 34,
        fontWeight: '900',
    },
    heroSubtitle: {
        color: '#333333',
        fontSize: 34,
        fontWeight: '900',
        marginTop: -5,
        marginBottom: 8,
    },
    heroDesc: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        width: '80%',
    },
    contentPadding: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    factsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    factItem: {
        width: (width - 60) / 3,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    factIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    factLabel: {
        fontSize: 9,
        fontWeight: '900',
        color: '#94A3B8',
        textTransform: 'uppercase',
    },
    factValue: {
        fontSize: 10,
        fontWeight: '700',
        color: '#0F172A',
        marginTop: 4,
        textAlign: 'center',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    sectionSub: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2,
    },
    viewAllText: {
        color: '#000000',
        fontSize: 13,
        fontWeight: '600',
    },
    horizontalScroll: {
        paddingBottom: 5,
    },
    expCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: 200,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    expImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    expTextCont: {
        padding: 12,
    },
    expTitle: {
        fontSize: 14,
        color: '#0F172A',
        fontWeight: '700',
    },
    expSub: {
        fontSize: 11,
        color: '#64748B',
        marginTop: 4,
    },
    luggagePill: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    luggageText: {
        color: '#000000',
        fontSize: 10,
        fontWeight: '800',
    },
    outfitCard: {
        width: 160,
        backgroundColor: 'white',
        borderRadius: 20,
        marginRight: 15,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    outfitImage: {
        width: '100%',
        height: 180,
        borderRadius: 16,
    },
    outfitBotRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 10,
        paddingHorizontal: 4,
        paddingBottom: 4,
    },
    outfitTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0F172A',
    },
    outfitPrice: {
        fontSize: 11,
        color: '#000000',
        fontWeight: '600',
        marginTop: 2,
    },
    rentBtn: {
        backgroundColor: '#000000',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    rentBtnText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '800',
    },
    foodCard: {
        flexDirection: 'row',
        backgroundColor: '#F8FAFC',
        borderRadius: 20,
        padding: 12,
        width: 280,
        marginRight: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    foodImage: {
        width: 70,
        height: 70,
        borderRadius: 15,
    },
    foodTextCont: {
        marginLeft: 15,
        flex: 1,
    },
    foodTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#0F172A',
    },
    foodSub: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 4,
    },
    gemsList: {
        backgroundColor: '#F8FAFC',
        borderRadius: 20,
        padding: 20,
        marginTop: 10,
    },
    gemItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    gemText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#1E293B',
        fontWeight: '600',
    },
    photoSpotCard: {
        width: 180,
        marginRight: 15,
    },
    photoImage: {
        width: '100%',
        height: 120,
        borderRadius: 18,
    },
    photoTitle: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: '700',
        color: '#0F172A',
        textAlign: 'center',
    },
    unlockBanner: {
        marginTop: 30,
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    unlockBlur: {
        padding: 30,
        alignItems: 'center',
    },
    lockCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    unlockTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0F172A',
        textAlign: 'center',
    },
    unlockDesc: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
    },
    unlockBtn: {
        marginTop: 20,
        backgroundColor: '#000000',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 20,
    },
    unlockBtnText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 15,
    },
});
