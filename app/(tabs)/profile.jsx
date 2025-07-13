import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Profilescreen from '../components/profile/Profilescreen';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-white px-6 pt-10"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Profilescreen />

      {/* Login Button */}
      <View className="mt-6">
        <TouchableOpacity
          className="bg-blue-600 rounded-xl py-3 items-center"
          onPress={() => router.replace('/stack/LoginPage')}
        >
          <Text className="text-white font-semibold text-base">Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
