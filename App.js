import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import { TripProvider } from './src/context/TripContext';
import { SavedProvider } from './src/context/SavedContext';
import { BookingProvider } from './src/context/BookingContext';
import { PaymentProvider } from './src/context/PaymentContext';
import { CartProvider } from './src/context/CartContext';
import { AddressProvider } from './src/context/AddressContext';
import { TransactionProvider } from './src/context/TransactionContext';

// Screen Imports
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import FeaturesScreen from './src/screens/FeaturesScreen';
import FamilySafetyScreen from './src/screens/FamilySafetyScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import ParisScreen from './src/screens/ParisScreen';
import RomeScreen from './src/screens/RomeScreen';
import CreateTripScreen from './src/screens/CreateTripScreen';
import TailorTripScreen from './src/screens/TailorTripScreen';
import SocialVibesScreen from './src/screens/SocialVibesScreen';
import PhotoGuideScreen from './src/screens/PhotoGuideScreen';
import WardrobeScreen from './src/screens/WardrobeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import JourneysScreen from './src/screens/JourneysScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import SwitzerlandScreen from './src/screens/SwitzerlandScreen';
import DubaiScreen from './src/screens/DubaiScreen';
import MapScreen from './src/screens/MapScreen';
import LocationDetailsScreen from './src/screens/LocationDetailsScreen';
import CityFoodScreen from './src/screens/CityFoodScreen';
import GuideScreen from './src/screens/GuideScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import FoodDetailScreen from './src/screens/FoodDetailScreen';
import OrderTrackingScreen from './src/screens/OrderTrackingScreen';
import WardrobeCheckoutScreen from './src/screens/WardrobeCheckoutScreen';
import WardrobeStatusScreen from './src/screens/WardrobeStatusScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import CameraScreen from './src/screens/CameraScreen';
import AllDestinationsScreen from './src/screens/AllDestinationsScreen';
import AllPlacesScreen from './src/screens/AllPlacesScreen';
import AllClothesScreen from './src/screens/AllClothesScreen';
import ApparelDetailScreen from './src/screens/ApparelDetailScreen';
import RentFlowScreen from './src/screens/RentFlowScreen';
import PurchaseFlowScreen from './src/screens/PurchaseFlowScreen';
import FiltersPreferencesScreen from './src/screens/FiltersPreferencesScreen';
import AdminScreen from './src/screens/AdminScreen';
import SavedScreen from './src/screens/SavedScreen';
import SnapSpotsScreen from './src/screens/SnapSpotsScreen';
import SnapSpotDetailsScreen from './src/screens/SnapSpotDetailsScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import ExperienceDetailScreen from './src/screens/ExperienceDetailScreen';
import ExpertProfileScreen from './src/screens/ExpertProfileScreen';
import BookingScreen from './src/screens/BookingScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import BookingConfirmationScreen from './src/screens/BookingConfirmationScreen';
import ExpertChatScreen from './src/screens/ExpertChatScreen';
import RecommendedListScreen from './src/screens/RecommendedListScreen';
import NearbyExperiencesScreen from './src/screens/NearbyExperiencesScreen';
import PaymentSuccessScreen from './src/screens/PaymentSuccessScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';
import MusicPreferenceScreen from './src/screens/MusicPreferenceScreen';
import VibeSelectionScreen from './src/screens/VibeSelectionScreen';
import PaymentMethodsScreen from './src/screens/PaymentMethodsScreen';
import BookingHistoryScreen from './src/screens/BookingHistoryScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import SavedPlacesScreen from './src/screens/SavedPlacesScreen';
import LikedItemsScreen from './src/screens/LikedItemsScreen';
import PermissionsScreen from './src/screens/PermissionsScreen';
import SupportScreen from './src/screens/SupportScreen';
import AboutScreen from './src/screens/AboutScreen';
import TermsScreen from './src/screens/TermsScreen';
import CartScreen from './src/screens/CartScreen';
import AddressListScreen from './src/screens/AddressListScreen';
import AddressFormScreen from './src/screens/AddressFormScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import TransactionDetailScreen from './src/screens/TransactionDetailScreen';

import { SettingsProvider, SettingsContext } from './src/context/SettingsContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { UserProvider } from './src/context/UserContext';
import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultTheme as NavLightTheme, DarkTheme as NavDarkTheme } from '@react-navigation/native';

// Screen Imports

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { isDarkMode, colors } = useTheme();

  const customDarkTheme = {
    ...NavDarkTheme,
    colors: {
      ...NavDarkTheme.colors,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  const customLightTheme = {
    ...NavLightTheme,
    colors: {
      ...NavLightTheme.colors,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <NavigationContainer theme={isDarkMode ? customDarkTheme : customLightTheme}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Features" component={FeaturesScreen} />
        <Stack.Screen name="FamilySafety" component={FamilySafetyScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Paris" component={ParisScreen} />
        <Stack.Screen name="Rome" component={RomeScreen} />
        <Stack.Screen name="CreateTrip" component={CreateTripScreen} />
        <Stack.Screen name="TailorTrip" component={TailorTripScreen} />
        <Stack.Screen name="SocialVibes" component={SocialVibesScreen} />
        <Stack.Screen name="PhotoGuide" component={PhotoGuideScreen} />
        <Stack.Screen name="Wardrobe" component={WardrobeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Journeys" component={JourneysScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="Switzerland" component={SwitzerlandScreen} />
        <Stack.Screen name="Dubai" component={DubaiScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="LocationDetails" component={LocationDetailsScreen} />
        <Stack.Screen name="CityFood" component={CityFoodScreen} />
        <Stack.Screen name="Guide" component={GuideScreen} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
        <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
        <Stack.Screen name="WardrobeCheckout" component={WardrobeCheckoutScreen} />
        <Stack.Screen name="WardrobeStatus" component={WardrobeStatusScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="AllDestinations" component={AllDestinationsScreen} />
        <Stack.Screen name="AllPlaces" component={AllPlacesScreen} />
        <Stack.Screen name="AllClothes" component={AllClothesScreen} />
        <Stack.Screen name="ApparelDetail" component={ApparelDetailScreen} />
        <Stack.Screen name="RentFlow" component={RentFlowScreen} />
        <Stack.Screen name="PurchaseFlow" component={PurchaseFlowScreen} />
        <Stack.Screen name="FiltersPreferences" component={FiltersPreferencesScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Saved" component={SavedScreen} />
        <Stack.Screen name="SnapSpots" component={SnapSpotsScreen} />
        <Stack.Screen name="SnapSpotDetails" component={SnapSpotDetailsScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="ExperienceDetail" component={ExperienceDetailScreen} />
        <Stack.Screen name="ExpertProfile" component={ExpertProfileScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
        <Stack.Screen name="ExpertChat" component={ExpertChatScreen} />
        <Stack.Screen name="RecommendedList" component={RecommendedListScreen} />
        <Stack.Screen name="NearbyExperiences" component={NearbyExperiencesScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
        <Stack.Screen name="MusicPreference" component={MusicPreferenceScreen} />
        <Stack.Screen name="VibeSelection" component={VibeSelectionScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
        <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} />
        <Stack.Screen name="Rewards" component={RewardsScreen} />
        <Stack.Screen name="SavedPlaces" component={SavedPlacesScreen} />
        <Stack.Screen name="LikedItems" component={LikedItemsScreen} />
        <Stack.Screen name="Permissions" component={PermissionsScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="AddressList" component={AddressListScreen} />
        <Stack.Screen name="AddressForm" component={AddressFormScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <SavedProvider>
          <CartProvider>
            <BookingProvider>
              <PaymentProvider>
                <ThemeProvider>
                  <UserProvider>
                    <SettingsProvider>
                      <AddressProvider>
                        <TransactionProvider>
                          <RootNavigator />
                        </TransactionProvider>
                      </AddressProvider>
                    </SettingsProvider>
                  </UserProvider>
                </ThemeProvider>
              </PaymentProvider>
            </BookingProvider>
          </CartProvider>
        </SavedProvider>
      </TripProvider>
    </AuthProvider>
  );
}
