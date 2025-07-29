import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = () => {
  return (
    <View className="flex-row items-center justify-between bg-white p-4 shadow-sm">
      
      <View className="flex-row items-center">
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          className="w-12 h-12 rounded-full"
        />
        <View className="ml-3">
          <Text className="text-xl font-semibold text-black">Michael Mitc</Text>
          <Text className="text-base text-gray-500">Lead UI/UX Designer</Text>
        </View>
      </View>

      <TouchableOpacity className="p-2 bg-gray-100 rounded-full">
        <Icon name="bell" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
