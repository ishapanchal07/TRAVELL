import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';
import { useSaved } from '../context/SavedContext';
import ExperienceCard from '../components/ExperienceCard';

const { width } = Dimensions.get('window');

const PARIS_DATA = {
    city: 'Paris',
    weather: { temp: '14°C', condition: 'Clear Sky', icon: 'sunny' },
    hero: {
        title: 'Paris:',
        subtitle: 'The City of Light',
        desc: 'Indulge in timeless romance and quintessential French elegance.',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop'
    },
    bestTime: 'April - June or September - October',
    budget: 'High (€120 - 250 per day)',
    transport: 'Metro, RER, and Velib (Bikes)',

    experiences: [
        { id: 1, title: 'Eiffel Tower Picnic', sub: 'Scenic', img: 'https://images.unsplash.com/photo-1463171356658-05187707e06b?q=80&w=400&auto=format&fit=crop', duration: '2h', fee: '€45', bestTime: 'Evening', crowd: 'Medium' },
        { id: 2, title: 'Louvre Art Tour', sub: 'Art', img: 'https://images.unsplash.com/photo-1542382103-125039f75ec5?q=80&w=400&auto=format&fit=crop', duration: '3h', fee: '€22', bestTime: 'Morning', crowd: 'High' },
        { id: 3, title: 'Seine River Cruise', sub: 'Nature', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400&auto=format&fit=crop', duration: '1h', fee: '€15', bestTime: 'Sunset', crowd: 'High' },
        { id: 4, title: 'Arc de Triomphe Climb', sub: 'History', img: 'https://images.unsplash.com/photo-1509439581779-629c9b276001?q=80&w=400&auto=format&fit=crop', duration: '1h', fee: '€13', bestTime: 'Evening', crowd: 'Medium' },
        { id: 5, title: 'Sacre Coeur Basilica', sub: 'Art', img: 'https://images.unsplash.com/photo-1524338198850-8a2ff63aaceb?q=80&w=400&auto=format&fit=crop', duration: '2h', fee: 'Free', bestTime: 'Morning', crowd: 'Medium' },
        { id: 6, title: 'Palace of Versailles', sub: 'History', img: 'https://images.unsplash.com/photo-1508248467873-9c1b9c7c645b?q=80&w=400&auto=format&fit=crop', duration: '5h', fee: '€20', bestTime: 'Morning', crowd: 'High' }
    ],
    clothes: [
        { id: 1, title: 'Classic Trench Coat', price: '€35/day', category: 'Spring', type: 'clothes', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&auto=format&fit=crop' },
        { id: 2, title: 'Silk Scarf Style', price: '€12/day', category: 'Accessory', type: 'accessory', img: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=400' },
        { id: 3, title: 'Leather Ankle Boots', price: '€28/day', category: 'Footwear', type: 'shoes', img: 'https://images.unsplash.com/photo-1605733160414-d571821b071d?q=80&w=400&auto=format&fit=crop' },
        { id: 4, title: 'Breton Striped Top', price: '€22/day', category: 'Spring', type: 'clothes', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=400&auto=format&fit=crop' },
        { id: 5, title: 'Red Beret Hat', price: '€5/day', category: 'Accessory', type: 'accessory', img: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=400&auto=format&fit=crop' }
    ],
    food: [
        { id: 1, title: 'Pistachio Macron', sub: 'Ladurée • 20m wait', img: 'https://images.unsplash.com/photo-1627916607164-7b20241db935?q=80&w=400&auto=format&fit=crop' },
        { id: 2, title: 'Cheese Soufflé', sub: 'Le Soufflé • Iconic', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=400&auto=format&fit=crop' },
        { id: 3, title: 'Warm Baguette', sub: 'Poilâne • Artisan', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop' },
        { id: 4, title: 'Duck Confit', sub: 'Brasserie • Classic', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400&auto=format&fit=crop' },
        { id: 5, title: 'Tarte Tatin', sub: 'Pastry Shop • Delight', img: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=400&auto=format&fit=crop' }
    ],
    photoSpots: [
        { id: 1, title: 'Troca-déro Stairs', img: 'https://images.unsplash.com/photo-1509439581779-629c9b276001?q=80&w=400&auto=format&fit=crop' },
        { id: 2, title: 'Pink House (Maison Rose)', img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=400&auto=format&fit=crop' },
        { id: 3, title: 'Pont Alexandre III', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=400&auto=format&fit=crop' },
        { id: 4, title: 'Shakespeare and Co.', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=400&auto=format&fit=crop' }
    ]
};

export default function ParisScreen({ navigation }) {
    const { isLoggedIn } = useAuth();
    const { toggleSaveGem, isGemSaved } = useSaved();
    const data = PARIS_DATA;

    return (
        <View style={styles.safeArea}>
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
                    <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Map', { city: 'Paris', location: 'Eiffel Tower, Paris' })}>
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
                                    Alert.alert("Weather", `Current temperature in ${data.city} is ${data.weather.temp}. A beautiful day for a walk in the city!`);
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
                        <TouchableOpacity onPress={() => navigation.navigate('AllPlaces', { title: 'Experiences in Paris', items: data.experiences })}>
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
                                    onViewMap={() => navigation.navigate('Map', { city: 'Paris', location: exp.title })}
                                />
                            </View>
                        ))}
                    </ScrollView>

                    {/* Clothing Recommendations - Based on Weather */}
                    <View style={[styles.sectionHeader, { marginTop: 25 }]}>
                        <View>
                            <Text style={styles.sectionTitle}>Spring Collection</Text>
                            <Text style={styles.sectionSub}>Based on current {data.weather.condition} weather</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AllClothes', { city: 'Paris', items: data.clothes })}>
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
                        <Text style={styles.sectionTitle}>Parisian Cuisine</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('CityFood', { city: 'Paris' })}>
                            <Text style={styles.viewAllText}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                        {(isLoggedIn ? data.food : data.food.slice(0, 2)).map(f => (
                            <TouchableOpacity 
                                key={f.id} 
                                style={styles.foodCard}
                                onPress={() => navigation.navigate('FoodDetail', { item: { name: f.title, image: f.img, subtitle: f.sub, price: f.price || '$28.00' } })}
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
                            <View style={[styles.sectionHeader, { marginTop: 25 }]}>
                                <Text style={styles.sectionTitle}>Perfect Snap Spots</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SnapSpots', { items: data.photoSpots, city: 'Paris' })}>
                                    <Text style={styles.viewAllText}>View all</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                                {data.photoSpots.map(spot => (
                                    <TouchableOpacity 
                                        key={spot.id} 
                                        style={styles.photoSpotCard}
                                        onPress={() => navigation.navigate('SnapSpotDetails', { spot, city: 'Paris' })}
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

        </View>
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
