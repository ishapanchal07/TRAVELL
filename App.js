import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
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
import JourneysScreen from './src/screens/JourneysScreen';
import GalleryScreen from './src/screens/GalleryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
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
        <Stack.Screen name="Journeys" component={JourneysScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
