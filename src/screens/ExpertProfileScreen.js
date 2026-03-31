import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import RatingStars from '../components/RatingStars';
import AvailabilityBadge from '../components/AvailabilityBadge';

const { width } = Dimensions.get('window');

export default function ExpertProfileScreen({ route, navigation }) {
    const { expert } = route.params;

    const renderReview = ({ item }) => (
        <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
                <Text style={styles.reviewUser}>{item.user}</Text>
                <Text style={styles.reviewDate}>{item.date}</Text>
            </View>
            <RatingStars rating={item.rating} size={12} />
            <Text style={styles.reviewComment}>{item.comment}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Image */}
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: expert.image }} 
                        style={styles.headerImage}
                        contentFit="cover"
                        transition={500}
                    />
                    <View style={styles.headerOverlay}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backButton}>
                            <Ionicons name="share-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Content */}
                <View style={styles.contentCard}>
                    <View style={styles.titleRow}>
                        <View>
                            <Text style={styles.name}>{expert.name}</Text>
                            <Text style={styles.category}>{expert.category}</Text>
                        </View>
                        <AvailabilityBadge status={expert.status} />
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <RatingStars rating={expert.rating} size={18} />
                            <Text style={styles.statLabel}>{expert.rating} ({expert.reviewCount} reviews)</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>${expert.price}</Text>
                            <Text style={styles.perDay}>/day</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>About</Text>
                    <Text style={styles.bio}>{expert.bio}</Text>

                    <Text style={styles.sectionTitle}>Languages</Text>
                    <View style={styles.languagesRow}>
                        {expert.languages.map((lang, index) => (
                            <View key={index} style={styles.languagePill}>
                                <Text style={styles.languageText}>{lang}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>Portfolio</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.portfolioScroll}>
                        {expert.portfolio.map((img, index) => (
                            <Image 
                                key={index}
                                source={{ uri: img }}
                                style={styles.portfolioImage}
                                contentFit="cover"
                                transition={300}
                            />
                        ))}
                    </ScrollView>

                    <View style={styles.reviewsSection}>
                        <View style={styles.reviewsTitleRow}>
                            <Text style={styles.sectionTitle}>Reviews</Text>
                            <TouchableOpacity>
                                <Text style={styles.viewAll}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        {expert.reviews.map((review) => (
                            <View key={review.id} style={styles.reviewCard}>
                                <View style={styles.reviewHeader}>
                                    <Text style={styles.reviewUser}>{review.user}</Text>
                                    <Text style={styles.reviewDate}>{review.date}</Text>
                                </View>
                                <RatingStars rating={review.rating} size={12} />
                                <Text style={styles.reviewComment}>{review.comment}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Sticky Buttons */}
            <View edges={['bottom']} style={styles.bottomBar}>
                <TouchableOpacity 
                    style={styles.chatButton}
                    onPress={() => navigation.navigate('ExpertChat', { expert })}
                >
                    <Ionicons name="chatbubble-ellipses-outline" size={24} color="#0F172A" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.hireButton}
                    onPress={() => navigation.navigate('Booking', { expert })}
                >
                    <Text style={styles.hireButtonText}>Hire Now</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainer: {
        height: 400,
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    headerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentCard: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: -30,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingBottom: 100,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    name: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0F172A',
    },
    category: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
        marginTop: 4,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 20,
        marginBottom: 24,
    },
    statItem: {
        flex: 1,
    },
    statLabel: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 4,
        fontWeight: '600',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000000',
    },
    perDay: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 12,
        marginTop: 8,
    },
    bio: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 24,
        marginBottom: 20,
    },
    languagesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    languagePill: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    languageText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#475569',
    },
    portfolioScroll: {
        marginBottom: 20,
    },
    portfolioImage: {
        width: 150,
        height: 150,
        borderRadius: 16,
        marginRight: 12,
    },
    reviewsSection: {
        marginTop: 8,
    },
    reviewsTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    viewAll: {
        color: '#000000',
        fontWeight: '700',
    },
    reviewCard: {
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    reviewUser: {
        fontWeight: '800',
        color: '#0F172A',
    },
    reviewDate: {
        fontSize: 12,
        color: '#94A3B8',
    },
    reviewComment: {
        fontSize: 14,
        color: '#475569',
        marginTop: 8,
        lineHeight: 20,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 24,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    chatButton: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    hireButton: {
        flex: 1,
        height: 56,
        backgroundColor: '#000000',
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hireButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
        marginRight: 8,
    },
});
