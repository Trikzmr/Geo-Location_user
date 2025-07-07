import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const tabs = ['Personal', 'Professional'];

const MyProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('Personal');
  const router = useRouter();

  return (
    <View className="bg-white px-4 pt-10 flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
         <Pressable  onPress={() => router.replace('/(tabs)/profile')}>
          <Icon name="angle-left" size={24} color="black" />
        </Pressable>
        <Text className="text-xl font-bold text-black">My Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tab Bar */}
      <View className="flex-row bg-gray-100 rounded-xl overflow-hidden mb-4">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 py-3 items-center ${
              activeTab === tab ? 'bg-blue-500' : 'bg-gray-100'
            }`}
          >
            <Text
              className={`text-base ${
                activeTab === tab ? 'text-white font-semibold' : 'text-gray-800'
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      
        {activeTab === 'Personal' && (
          <View className="px-4 pt-4">
            {/* Full Name */}
            <View className="mb-6 border-b border-gray-200 pb-3">
              <Text className="text-sm text-gray-400 mb-1">Full Name</Text>
              <Text className="text-lg font-semibold text-black">Michael Mitc</Text>
            </View>

            {/* Email Address */}
            <View className="mb-6 border-b border-gray-200 pb-3">
              <Text className="text-sm text-gray-400 mb-1">Email Address</Text>
              <Text className="text-lg font-semibold text-black">michael.mitc@example.com</Text>
            </View>

            {/* Phone Number */}
            <View className="mb-6 border-b border-gray-200 pb-3">
              <Text className="text-sm text-gray-400 mb-1">Phone Number</Text>
              <Text className="text-lg font-semibold text-black">(603) 555-0123</Text>
            </View>

            {/* Address */}
            <View className="mb-6 border-b border-gray-200 pb-3">
              <Text className="text-sm text-gray-400 mb-1">Address</Text>
              <Text className="text-lg font-semibold text-black">
                3517 W. Gray St. Utica, Pennsylvania 57867
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'Professional' && (
          <View className="px-4 pt-4">
             {/* Employee ID */}
      <View className="mb-6 border-b border-gray-200 pb-3">
        <Text className="text-sm text-gray-400 mb-1">Employee ID</Text>
        <Text className="text-lg font-semibold text-black">7879987</Text>
      </View>

      {/* Designation */}
      <View className="mb-6 border-b border-gray-200 pb-3">
        <Text className="text-sm text-gray-400 mb-1">Designation</Text>
        <Text className="text-lg font-semibold text-black">Lead UI/UX Designer</Text>
      </View>

      {/* Company Email Address */}
      <View className="mb-6 border-b border-gray-200 pb-3">
        <Text className="text-sm text-gray-400 mb-1">Company Email Address</Text>
        <Text className="text-lg font-semibold text-black">michael.mitc@example.com</Text>
      </View>
      {/* Employee Type */}
      <View className="mb-6 border-b border-gray-200 pb-3">
        <Text className="text-sm text-gray-400 mb-1">Employee Type</Text>
        <Text className="text-lg font-semibold text-black">Permanent</Text>
      </View>

      {/* Department */}
      <View className="mb-6 border-b border-gray-200 pb-3">
        <Text className="text-sm text-gray-400 mb-1">Department</Text>
        <Text className="text-lg font-semibold text-black">Design</Text>
      </View>

      {/* Reporting Manager */}
      <View className="mb-6 border-b border-gray-200 pb-3">
        <Text className="text-sm text-gray-400 mb-1">Reporting Manager</Text>
        <Text className="text-lg font-semibold text-black">Robert Fox</Text>
      </View>

      {/* Company Experience */}
      <View className="mb-6 border-b border-gray-200 pb-3">
        <Text className="text-sm text-gray-400 mb-1">Company Experience</Text>
        <Text className="text-lg font-semibold text-black">2 Year 5 Months</Text>
      </View>
      {/* Office Time */}
      <View className="mb-6 border-b border-gray-200 pb-3">
        <Text className="text-sm text-gray-400 mb-1">Office Time</Text>
        <Text className="text-lg font-semibold text-black">10:00 am to 07:00 pm</Text>
      </View>
          </View>
        )}
    </View>
  );
};

export default MyProfileTabs;
