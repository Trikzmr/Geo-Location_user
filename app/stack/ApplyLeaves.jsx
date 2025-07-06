import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const ApplyLeavs = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 py-4">
      {/* Back Arrow */}
      <View className="relative items-center mb-6">
        <Pressable
          className="absolute left-0"
          onPress={() => router.replace('/(tabs)/cart')}
        >
          <Icon name="arrow-left" size={26} color="#000" />
        </Pressable>
        <Text className="text-2xl font-bold text-black">Apply Leave</Text>
      </View>

      {/* Title */}
      <Text className="text-base text-blue-500 mb-1">Title</Text>
      <TextInput
        placeholder="Sick Leave"
        className="border border-blue-300 rounded-xl px-4 py-3 mb-4 text-lg text-black"
      />

      {/* Leave Type */}
      <Text className="text-base text-blue-500 mb-1">Leave Type</Text>
      <View className="border border-blue-300 rounded-xl px-4 py-3 mb-4 flex-row justify-between items-center">
        <Text className="text-lg text-black">Medical Leave</Text>
        <Icon name="chevron-down" size={18} color="#4B5563" />
      </View>

      {/* Contact Number */}
      <Text className="text-base text-blue-500 mb-1">Contact Number</Text>
      <TextInput
        placeholder="(603) 555-0123"
        keyboardType="phone-pad"
        className="border border-blue-300 rounded-xl px-4 py-3 mb-4 text-lg text-black"
      />

      {/* Start Date */}
      <Text className="text-base text-blue-500 mb-1">Start Date</Text>
      <View className="border border-blue-300 rounded-xl px-4 py-3 mb-4 flex-row justify-between items-center">
        <Text className="text-lg text-black">April 15, 2023</Text>
        <Icon name="calendar" size={20} color="#4B5563" />
      </View>

      {/* End Date */}
      <Text className="text-base text-blue-500 mb-1">End Date</Text>
      <View className="border border-blue-300 rounded-xl px-4 py-3 mb-4 flex-row justify-between items-center">
        <Text className="text-lg text-black">April 18, 2023</Text>
        <Icon name="calendar" size={20} color="#4B5563" />
      </View>

      {/* Reason for Leave */}
      <Text className="text-base text-blue-500 mb-1">Reason for Leave</Text>
      <TextInput
        placeholder="I need to take a medical leave."
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        className="border border-blue-300 rounded-xl px-4 py-3 mb-6 text-lg text-black"
      />

      {/* Submit Button */}
      <TouchableOpacity className="bg-blue-600 rounded-xl py-4 items-center">
        <Text className="text-white text-lg font-semibold">Apply Leave</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ApplyLeavs;
