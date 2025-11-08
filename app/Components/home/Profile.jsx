import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  // Fetch user data from AsyncStorage
  const userStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) return;
      const { userName, role } = JSON.parse(userData);
      setUserName(userName || 'Unknown User');
      setUserRole(role || 'No Role');
    } catch (error) {
      console.error(" Error in userStatus:", error.message);
    }
  };

  useEffect(() => {
    userStatus();
  }, []);

  return (
    <View className="flex-row items-center justify-between p-4 pb-2 pt-16 bg-white rounded-b-3xl shadow-md">
      {/* Left Section: User Info */}
      <View className="flex-row items-center">
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          className="w-10 h-10 rounded-full"
        />
        <View className="ml-3">
          <Text className="text-xl font-semibold text-black">{userName}</Text>
          <Text className="text-base text-gray-500">{userRole}</Text>
        </View>
      </View>

      {/* Right Section: Mark Attendance Button */}
      <TouchableOpacity
        onPress={() => router.push('stack/Attendance')}
        className="border border-blue-300 bg-blue-50 px-4 py-2 rounded-xl"
      >
        <Text className="text-blue-600 font-semibold text-base">Mark Attendance</Text>
      </TouchableOpacity>
    </View>

  );
};

export default Profile;
