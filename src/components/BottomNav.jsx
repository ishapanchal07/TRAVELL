import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BottomNav({ activeRoute }) {
    const navigation = useNavigation();

    return (
        <View style={styles.floatingNavContainer}>
            <View style={styles.navBar}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Explore')}
                >
                    <Ionicons
                        name="compass"
                        size={24}
                        color={activeRoute === 'Explore' ? '#3B82F6' : '#94A3B8'}
                    />
                    <Text style={activeRoute === 'Explore' ? styles.navTextActive : styles.navText}>
                        EXPLORE
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Wardrobe')}
                >
                    <MaterialCommunityIcons
                        name="hanger"
                        size={26}
                        color={activeRoute === 'Wardrobe' ? '#3B82F6' : '#94A3B8'}
                    />
                    <Text style={activeRoute === 'Wardrobe' ? styles.navTextActive : styles.navText}>
                        WARDROBE
                    </Text>
                </TouchableOpacity>

                <View style={styles.plusButtonContainer}>
                    <TouchableOpacity
                        style={styles.plusButton}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('CreateTrip')}
                    >
                        <Feather name="plus" size={28} color="white" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('SocialVibes')}
                >
                    <Ionicons
                        name="people"
                        size={26}
                        color={activeRoute === 'Social' ? '#3B82F6' : '#94A3B8'}
                    />
                    <Text style={activeRoute === 'Social' ? styles.navTextActive : styles.navText}>
                        SOCIAL
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Ionicons
                        name="person"
                        size={24}
                        color={activeRoute === 'Profile' ? '#3B82F6' : '#94A3B8'}
                    />
                    <Text style={activeRoute === 'Profile' ? styles.navTextActive : styles.navText}>
                        PROFILE
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    floatingNavContainer: {
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '90%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    navItem: {
        alignItems: 'center',
        flex: 1,
    },
    navText: {
        fontSize: 8,
        color: '#94A3B8',
        fontWeight: '700',
        marginTop: 2,
    },
    navTextActive: {
        fontSize: 8,
        color: '#3B82F6',
        fontWeight: '700',
        marginTop: 2,
    },
    plusButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        top: -15,
    },
    plusButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
        borderWidth: 4,
        borderColor: '#FAFAF9',
    },
});
