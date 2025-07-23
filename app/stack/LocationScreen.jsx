import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View className="flex-1 justify-center items-center bg-white px-4">
      <Text className="text-xl font-semibold mb-6">Swipe to Check In</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <Pressable
          onPress={handleCheckIn}
          className="bg-blue-600 px-8 py-3 rounded-full shadow-md active:bg-blue-700"
        >
          <Text className="text-white text-base font-semibold">Check In</Text>
        </Pressable>
      )}
    </View>
  );
};

export default LocationScreen;