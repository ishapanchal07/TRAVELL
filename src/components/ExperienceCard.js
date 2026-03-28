import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Share } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function ExperienceCard({ item, onPress, onBookNow, onViewMap, onSave, onShare, isSaved }) {
    const { 
        title, 
        sub, 
        img, 
        rating = '4.9', 
        duration = '2-3h', 
        fee = '€25', 
        bestTime = 'Morning', 
        crowd = 'Medium' 
    } = item;

    const getCrowdColor = (c) => {
        switch(c?.toLowerCase()) {
            case 'low': return '#10B981';
            case 'medium': return '#F59E0B';
            case 'high': return '#EF4444';
            default: return '#64748B';
        }
    };

    const handleShare = async () => {
        if (onShare) {
            onShare();
            return;
        }
        try {
            await Share.share({
                message: `Check out this amazing experience: ${title} on Roamster!`,
                url: img,
                title: title
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.9} 
            onPress={onPress}
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: img }} 
                    style={styles.image} 
                    contentFit="cover"
                    transition={300}
                    placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                />
                <BlurView intensity={20} tint="dark" style={styles.topActions}>
                    <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
                        <Feather name="share-2" size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={onSave}>
                        <Ionicons name={isSaved ? "heart" : "heart-outline"} size={18} color={isSaved ? "#EF4444" : "white"} />
                    </TouchableOpacity>
                </BlurView>
                
                <View style={styles.smartInfoOverlay}>
                    <View style={styles.infoPill}>
                        <Feather name="clock" size={10} color="white" />
                        <Text style={styles.infoPillText}>{duration}</Text>
                    </View>
                    <View style={styles.infoPill}>
                        <Feather name="tag" size={10} color="white" />
                        <Text style={styles.infoPillText}>{fee}</Text>
                    </View>
                    <View style={styles.infoPill}>
                        <Feather name="users" size={10} color="white" />
                        <Text style={[styles.infoPillText, { color: getCrowdColor(crowd) }]}>{crowd}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <View style={styles.ratingBox}>
                        <Ionicons name="star" size={12} color="#FACC15" />
                        <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                </View>
                <Text style={styles.subText}>{sub}</Text>
                
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.mapBtn} onPress={onViewMap}>
                        <Feather name="map-pin" size={12} color="#000000" />
                        <Text style={styles.mapBtnText}>View Map</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bookBtn} onPress={onBookNow}>
                        <Text style={styles.bookBtnText}>Book Now</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.socialProof}>
                    <View style={styles.avatarStack}>
                        {[1,2,3].map(i => (
                            <View key={i} style={[styles.miniAvatar, { marginLeft: i === 1 ? 0 : -8, zIndex: 4-i }]} />
                        ))}
                    </View>
                    <Text style={styles.proofText}>12 people booked today</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 30,
        marginBottom: 25,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    imageContainer: {
        width: '100%',
        height: 220,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    topActions: {
        position: 'absolute',
        top: 15,
        right: 15,
        flexDirection: 'row',
        gap: 8,
        borderRadius: 20,
        padding: 4,
        overflow: 'hidden',
    },
    actionBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smartInfoOverlay: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        flexDirection: 'row',
        gap: 6,
    },
    infoPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        gap: 4,
    },
    infoPillText: {
        color: 'white',
        fontSize: 9,
        fontWeight: '800',
    },
    infoContainer: {
        padding: 20,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
        flex: 1,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF9C3',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    ratingText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#854D0E',
        marginLeft: 4,
    },
    subText: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 4,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    mapBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
        gap: 6,
    },
    mapBtnText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0F172A',
    },
    bookBtn: {
        backgroundColor: '#000000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    bookBtnText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 13,
    },
    socialProof: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    avatarStack: {
        flexDirection: 'row',
    },
    miniAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#E2E8F0',
        borderWidth: 1.5,
        borderColor: 'white',
    },
    proofText: {
        fontSize: 11,
        color: '#64748B',
        marginLeft: 10,
        fontWeight: '500',
    },
});
