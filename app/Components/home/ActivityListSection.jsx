import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActivitylistItem from './ActivitylistItem';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ActivityListSection() {
  const store = [
    {
      icon: <Icon name="sign-in" size={30} color="#3B82F6" />,
      title: "Check In",
      date: "April 12, 2023",
      time: "10:00 am"
    },
    {
      icon: <Icon name="sign-out" size={30} color="#3B82F6" />,
      title: "Check Out",
      date: "April 12, 2023",
      time: "11:00 am"
    }
  ];

  const [arr] = useState(store);

  return (
    <View className="w-full px-4 py-3">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-gray-800">Your Activity</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-sm text-blue-500 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {/* List of Activities */}
      <View className="space-y-3">
        {arr.map((item, index) => (
          <ActivitylistItem key={index} data={item} />
        ))}
      </View>
    </View>
  );
}
