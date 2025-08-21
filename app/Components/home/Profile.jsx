import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

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
    <View className="flex-row items-center justify-between bg-white p-4 shadow-sm">
      <View className="flex-row items-center">
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          className="w-12 h-12 rounded-full"
        />
        <View className="ml-3">
          <Text className="text-xl font-semibold text-black">{userName}</Text>
          <Text className="text-base text-gray-500">{userRole}</Text>
        </View>
      </View>

      <TouchableOpacity className="p-2 bg-gray-100 rounded-full">
        <Icon name="bell" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
