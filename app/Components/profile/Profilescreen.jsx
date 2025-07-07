import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const Profilescreen = () => {
  const router = useRouter();

  return (
    <ScrollView className="bg-white px-6 pt-10">
      {/* Profile Image Section */}
      <View className="items-center mb-4">
        <View className="relative">
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            className="w-32 h-32 rounded-full"
          />
          <View className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
            <Icon name="camera" size={18} color="#fff" />
          </View>
        </View>

        <Text className="text-3xl font-bold text-black mt-4">Michael Mitc</Text>
        <Text className="text-lg font-semibold text-gray-700">Lead UI/UX Designer</Text>
      </View>

      {/* Edit Profile */}
      <TouchableOpacity
        className="bg-blue-500 rounded-xl py-5 items-center mb-6"
        onPress={() => console.log('Edit Profile pressed')}
      >
        <Text className="text-white text-xl font-bold">Edit Profile</Text>
      </TouchableOpacity>

      {/* Menu Items */}
      <View className="space-y-2">
        <TouchableOpacity
          className="flex-row justify-between items-center border-b border-gray-200 py-5"
          onPress={() => router.replace('/stack/Myprofile')}>
          <View className="flex-row items-center gap-5">
            <Icon name="user" size={24} color="#6B7280" />
            <Text className="text-xl font-semibold text-gray-800">My Profile</Text>
          </View>
          <Icon name="angle-right" size={24} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row justify-between items-center border-b border-gray-200 py-5"
          onPress={() => console.log('Navigate to Settings')}
        >
          <View className="flex-row items-center gap-5">
            <Icon name="cog" size={24} color="#6B7280" />
            <Text className="text-xl font-semibold text-gray-800">Settings</Text>
          </View>
          <Icon name="angle-right" size={24} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row justify-between items-center border-b border-gray-200 py-5"
           onPress={() => router.replace('/stack/Tearmcondition')}
        >
          <View className="flex-row items-center gap-5">
            <Icon name="file-text-o" size={24} color="#6B7280" />
            <Text className="text-xl font-semibold text-gray-800">Terms & Conditions</Text>
          </View>
          <Icon name="angle-right" size={24} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row justify-between items-center border-b border-gray-200 py-5"
           onPress={() => router.replace('/stack/Privacypolice')}
        >
          <View className="flex-row items-center gap-5">
            <Icon name="shield" size={24} color="#6B7280" />
            <Text className="text-xl font-semibold text-gray-800">Privacy Policy</Text>
          </View>
          <Icon name="angle-right" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity
        className="flex-row items-center gap-4 py-6"
        onPress={() => {
          console.log('Logging out...');
          // router.replace('/login') // Uncomment if you have a login route
        }}
      >
        <Icon name="sign-out" size={24} color="#EF4444" />
        <Text className="text-xl font-bold text-red-500">Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profilescreen;
