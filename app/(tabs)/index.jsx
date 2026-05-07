import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Profile from '../Components/home/Profile';
import Clender from '../Components/home/Clender';
import StasCardSection from '../Components/home/StasCardSection';
import ActivityListSection from '../Components/home/ActivityListSection';
import LocationScreen from '../stack/LocationScreen';
import { trackcontinousLocation } from '../stack/LocationTracker';

export default function Home() {
  const router = useRouter();

  // Helper sleep function for delay
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const initializeTracking = async () => {
      while (true) {
        try {
          const userData = await AsyncStorage.getItem('userData');

          if (userData) {
            const user = JSON.parse(userData);
            trackcontinousLocation(user.userName);
          }
        } catch (err) {
          console.error('❌ Error fetching user data:', err.message);
        }

        
        await sleep(60000);
        console.log("test");
      }
    };

    initializeTracking();
  }, []);

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Profile />
        <View className="px-1">
          <Clender />
          <StasCardSection />
          <ActivityListSection />
        </View>
      </ScrollView>
    </View>
  );
}
