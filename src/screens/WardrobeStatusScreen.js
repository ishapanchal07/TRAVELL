import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

const TRENCH_IMG = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300';
const DRESS_IMG = 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=300';
const USER_AVATAR = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100';
const STYLIST_IMG = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100';
const LEO_IMG = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100';

export default function WardrobeStatusScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image 
                        source={{ uri: USER_AVATAR }} 
                        style={styles.headerAvatar} 
                        placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                        transition={300}
                    />
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerTitle}>Your Wardrobe</Text>
                        <Text style={styles.headerSubtitle}>PARIS FASHION WEEK</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.notifBtn}>
                    <Ionicons name="notifications" size={20} color="#3B82F6" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Status Banner */}
                <View style={styles.statusBanner}>
                    <View style={styles.statusMain}>
                        <View style={styles.onItsWayRow}>
                            <MaterialCommunityIcons name="moped" size={16} color="white" />
                            <Text style={styles.onItsWayText}>ON ITS WAY</Text>
                        </View>
                        <Text style={styles.statusArrival}>Arriving at Hotel Ritz at 4 PM</Text>
                        <Text style={styles.statusDesc}>Your curated Paris looks are 10 mins away.</Text>
                    </View>
                </View>

                {/* Logistics Tracker */}
                <View style={styles.trackerCard}>
                    <View style={styles.trackerHeader}>
                        <MaterialCommunityIcons name="swap-horizontal" size={18} color="#3B82F6" />
                        <Text style={styles.trackerTitle}>LOGISTICS TRACKER</Text>
                    </View>

                    <View style={styles.stepsRow}>
                        <TrackerStep label="Packed" status="completed" icon="checkmark" />
                        <TrackerStep label="Transit" status="active" icon="bicycle" />
                        <TrackerStep label="Received" status="pending" />
                        <TrackerStep label="Return Due" status="pending" isLast />
                    </View>
                </View>

                {/* Current Wardrobe */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Current Wardrobe</Text>
                    <View style={styles.outfitBadge}>
                        <Text style={styles.outfitBadgeText}>2 OUTFITS</Text>
                    </View>
                </View>

                <View style={styles.wardrobeList}>
                    <WardrobeItem
                        image={TRENCH_IMG}
                        day="DAY 1 • BRUNCH LOOK"
                        title="Chic Cream Trench Coat"
                        tags={['DISINFECTED', 'ECO-WRAP']}
                    />
                    <WardrobeItem
                        image={DRESS_IMG}
                        day="DAY 2 • NIGHT OUT"
                        title="Midnight Silk Slip Dress"
                        tags={['STEAMED', 'TRENDING']}
                    />
                </View>

                {/* Styling Guidance */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Styling Guidance</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.seeMore}>See More </Text>
                        <Ionicons name="chevron-forward" size={12} color="#3B82F6" />
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stylingScroll}>
                    <View style={styles.styleCard}>
                        <Image 
                            source={{ uri: TRENCH_IMG }} 
                            style={styles.styleImg} 
                            placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                            transition={300}
                            contentFit="cover"
                        />
                        <View style={styles.watchBadge}>
                            <Ionicons name="play" size={10} color="white" />
                            <Text style={styles.watchText}>WATCH</Text>
                        </View>
                        <View style={styles.styleInfo}>
                            <Text style={styles.styleTitle}>How @ChloeP wears the Trench</Text>
                            <View style={styles.styleAuthor}>
                                <Image 
                                    source={{ uri: STYLIST_IMG }} 
                                    style={styles.authorImg} 
                                    placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                    transition={300}
                                />
                                <Text style={styles.authorName}>Expert Stylist</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.styleCard}>
                        <Image 
                            source={{ uri: LOOK_IMG_3 }} 
                            style={styles.styleImg} 
                            placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                            transition={300}
                            contentFit="cover"
                        />
                        <View style={styles.articleBadge}>
                            <MaterialCommunityIcons name="file-document-outline" size={12} color="white" />
                            <Text style={styles.watchText}>ARTICLE</Text>
                        </View>
                        <View style={styles.styleInfo}>
                            <Text style={styles.styleTitle}>Accessorizing for Nights</Text>
                            <View style={styles.styleAuthor}>
                                <Image 
                                    source={{ uri: LEO_IMG }} 
                                    style={styles.authorImg} 
                                    placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                                    transition={300}
                                />
                                <Text style={styles.authorName}>Curated by Leo</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Easy Return Process */}
                <View style={styles.returnCard}>
                    <View style={styles.returnHeader}>
                        <View>
                            <Text style={styles.returnTitle}>Easy Return Process</Text>
                            <Text style={styles.returnSubtitle}>Just follow these 3 steps on Sunday</Text>
                        </View>
                        <View style={styles.historyCircle}>
                            <Ionicons name="time-outline" size={24} color="#3B82F6" />
                        </View>
                    </View>

                    <View style={styles.stepsContainer}>
                        <ReturnStep
                            num="1"
                            text="Place items in the provided Roamster bag"
                        />
                        <ReturnStep
                            num="2"
                            text="Drop at Hotel Ritz Concierge desk"
                        />
                        <ReturnStep
                            num="3"
                            text="Tap 'Confirm Dropoff' in this app"
                        />
                    </View>

                    <TouchableOpacity style={styles.viewFullBtn}>
                        <Text style={styles.viewFullText}>View Full Instructions</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab}>
                <Ionicons name="happy" size={30} color="white" />
            </TouchableOpacity>

            <BottomNav activeRoute="Wardrobe" />
        </SafeAreaView>
    );
}

const LOOK_IMG_3 = 'https://images.unsplash.com/photo-1549493527-73bd10565258?auto=format&fit=crop&q=80&w=300';

function TrackerStep({ label, status, icon, isLast }) {
    const isCompleted = status === 'completed';
    const isActive = status === 'active';
    const isPending = status === 'pending';

    return (
        <View style={[styles.stepItem, isLast ? { flex: 0 } : { flex: 1 }]}>
            <View style={styles.stepCircleRow}>
                <View style={[
                    styles.stepCircle,
                    isCompleted ? styles.circleCompleted : (isActive ? styles.circleActive : styles.circlePending)
                ]}>
                    <Ionicons
                        name={icon || "ellipse"}
                        size={isActive || isCompleted ? 14 : 4}
                        color={isPending ? "#CBD5E1" : "white"}
                    />
                </View>
                {!isLast && <View style={[styles.stepLine, isCompleted ? styles.lineCompleted : null]} />}
            </View>
            <Text style={[styles.stepLabel, isActive ? styles.labelActive : null]}>{label}</Text>
        </View>
    );
}

function WardrobeItem({ image, day, title, tags }) {
    return (
        <View style={styles.wardrobeItem}>
            <Image 
                source={{ uri: image }} 
                style={styles.wardrobeImg} 
                placeholder="L6G*e[4n00~q00%M%MD%00xV-;_k"
                transition={300}
                contentFit="cover"
            />
            <View style={styles.wardrobeInfo}>
                <Text style={styles.wardrobeDay}>{day}</Text>
                <Text style={styles.wardrobeTitle}>{title}</Text>
                <Text style={styles.wardrobeDesc}>Designer Label • Size S</Text>
                <View style={styles.tagRow}>
                    {tags.map((tag, i) => (
                        <View key={i} style={styles.itemTag}>
                            <Text style={styles.itemTagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

function ReturnStep({ num, text }) {
    return (
        <View style={styles.returnStepRow}>
            <View style={styles.numCircle}>
                <Text style={styles.numText}>{num}</Text>
            </View>
            <Text style={styles.returnStepText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 15,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    headerInfo: {
        marginLeft: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0F172A',
    },
    headerSubtitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#3B82F6',
        letterSpacing: 0.5,
    },
    notifBtn: {
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
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 150,
    },
    statusBanner: {
        backgroundColor: '#60A5FA',
        borderRadius: 30,
        padding: 30,
        marginTop: 10,
        marginBottom: 24,
        shadowColor: '#60A5FA',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
    },
    onItsWayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    onItsWayText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '900',
        marginLeft: 8,
        letterSpacing: 1,
    },
    statusArrival: {
        color: 'white',
        fontSize: 28,
        fontWeight: '900',
        lineHeight: 34,
        marginBottom: 12,
    },
    statusDesc: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 14,
        fontWeight: '600',
    },
    trackerCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        marginBottom: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    trackerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    trackerTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#3B82F6',
        marginLeft: 10,
        letterSpacing: 1,
    },
    stepsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    stepItem: {
        alignItems: 'center',
    },
    stepCircleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 12,
    },
    stepCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    circleCompleted: {
        backgroundColor: '#60A5FA',
    },
    circleActive: {
        backgroundColor: '#60A5FA',
        borderWidth: 3,
        borderColor: '#EFF6FF',
    },
    circlePending: {
        backgroundColor: '#F8F9FA',
    },
    stepLine: {
        position: 'absolute',
        top: 17,
        left: '50%',
        right: '-50%',
        height: 3,
        backgroundColor: '#F8F9FA',
        zIndex: 1,
    },
    lineCompleted: {
        backgroundColor: '#60A5FA',
    },
    stepLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94A3B8',
    },
    labelActive: {
        color: '#0F172A',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#0F172A',
    },
    outfitBadge: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    outfitBadgeText: {
        color: '#3B82F6',
        fontSize: 10,
        fontWeight: '900',
    },
    wardrobeList: {
        marginBottom: 35,
    },
    wardrobeItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    wardrobeImg: {
        width: 100,
        height: 120,
        borderRadius: 20,
    },
    wardrobeInfo: {
        flex: 1,
        marginLeft: 15,
        paddingVertical: 5,
    },
    wardrobeDay: {
        fontSize: 10,
        fontWeight: '800',
        color: '#60A5FA',
        marginBottom: 6,
    },
    wardrobeTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 6,
    },
    wardrobeDesc: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '600',
    },
    tagRow: {
        flexDirection: 'row',
        marginTop: 10,
    },
    itemTag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        backgroundColor: '#FAFBFC',
    },
    itemTagText: {
        fontSize: 8,
        fontWeight: '900',
        color: '#10B981',
    },
    seeMore: {
        fontSize: 12,
        color: '#3B82F6',
        fontWeight: '800',
    },
    stylingScroll: {
        paddingRight: 10,
    },
    styleCard: {
        width: 200,
        backgroundColor: 'white',
        borderRadius: 24,
        marginRight: 15,
        overflow: 'hidden',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    styleImg: {
        width: '100%',
        height: 220,
    },
    watchBadge: {
        position: 'absolute',
        top: 180,
        left: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    articleBadge: {
        position: 'absolute',
        top: 180,
        left: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    watchText: {
        color: 'white',
        fontSize: 8,
        fontWeight: '900',
        marginLeft: 4,
        letterSpacing: 1,
    },
    styleInfo: {
        padding: 15,
    },
    styleTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 12,
        lineHeight: 20,
    },
    styleAuthor: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorImg: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    authorName: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
        marginLeft: 8,
    },
    returnCard: {
        backgroundColor: '#EFF6FF',
        borderRadius: 35,
        padding: 30,
        marginTop: 35,
    },
    returnHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    returnTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 4,
    },
    returnSubtitle: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '600',
    },
    historyCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    stepsContainer: {
        marginBottom: 25,
    },
    returnStepRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    numCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#60A5FA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    numText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '900',
    },
    returnStepText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    viewFullBtn: {
        backgroundColor: 'white',
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
    },
    viewFullText: {
        color: '#3B82F6',
        fontSize: 15,
        fontWeight: '900',
    },
    fab: {
        position: 'absolute',
        bottom: 120,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#60A5FA',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#60A5FA',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    }
});
