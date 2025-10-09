import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

const baseurl = 'https://geo-location-based-attendence-tracking.onrender.com'; // Replace with your server URL

const LocationScreen = () => {
  const [loading, setLoading] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // 🔍 Always check attendance state from API
  const checkAttendance = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) return;

      const { userName } = JSON.parse(userData);

      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const month = now.toLocaleString('default', { month: 'long' });
      const year = now.getFullYear().toString();

      const body = { userName, month, year, date };

      const response = await fetch(`${baseurl}/api/getAttendanceByUsernameWithDayMonthAndYear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (result && result.status?.length > 0) {
        const lastStatus = result.status[result.status.length - 1]; // ✅ pick last value
        setIsCheckedIn(lastStatus === 'check-in');
      } else {
        setIsCheckedIn(false);
      }
    } catch (err) {
      console.error('Error checking attendance:', err.message);
    }
  };

  useEffect(() => {
    checkAttendance();
  }, []);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem('userData');
      const user = JSON.parse(userData);
      const userName = user.userName;

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') throw new Error('Location permission denied');

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const locationData = await Location.reverseGeocodeAsync({ latitude, longitude });
      const locationName = locationData[0]?.name || 'Unknown';

      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toTimeString().split(' ')[0];
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

      const response = await fetch(`${baseurl}/api/markAttendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Check-in failed');

      alert('Check-in successful');

      // 🔄 Refresh state from API
      await checkAttendance();
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
        <Pressable
          onPress={handleCheckIn}
          className="w-full h-[60px] rounded-full overflow-hidden"
          disabled={isCheckedIn}
        >
          <LinearGradient
            colors={isCheckedIn ? ['#4facfe', '#00f2fe'] : ['#ef4444', '#f87171']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-row items-center justify-center w-full h-full"
          >
            <Text className="text-white text-base font-medium">
              {isCheckedIn ? 'Checked In' : 'Press to Check In'}
            </Text>
          </LinearGradient>
        </Pressable>
      )}
    </View>
  );
};

export default LocationScreen;
