import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const LocationScreen = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem('userData');
      const user = JSON.parse(userData);
      const userName = user.userName;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') throw new Error('Permission denied');

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const locationData = await Location.reverseGeocodeAsync({ latitude, longitude });
      const locationName = locationData[0]?.name || 'Unknown';

      const now = new Date();
      const date = now.toISOString();
      const time = now.toISOString();
      const month = now.toLocaleString('default', { month: 'long' });
      const year = now.getFullYear().toString();

      const body = {
        userName,
        date,
        time,
        locationLogs: [{ latitude, longitude }],
        locationName,
        month,
        year
      };

      const response = await fetch('http://localhost:3005/api/markAttendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Check-in failed');

      alert('Check-in successful');
    } catch (err) {
      alert(err.message || 'Something went wrong');
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 justify-center items-center px-4">
    
      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <Pressable onPress={handleCheckIn} className="w-[100%] h-[60px] rounded-full overflow-hidden">
         <LinearGradient
            colors={['#4facfe', '#00f2fe']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-row items-center justify-center w-full h-full"
          >
            <Text className="text-white text-base font-medium">Press to Check In</Text>
          </LinearGradient>

        </Pressable>
      )}
    </View>
  );
};

export default LocationScreen;
