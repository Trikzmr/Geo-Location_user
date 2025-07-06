import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActivitylistItem from './ActivitylistItem';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ActivityListSection() {
  const store = [
    {
      icon: <Icon name="sign-in" size={30} color="#3B82F6"/>,
      title: "Check In",
      date: "April 12, 2023",
      time: "10:00 am"
    },
    {
      icon: <Icon name="sign-out" size={30} color="#3B82F6"/>,
      title: "Check out",
      date: "April 12, 2023",
      time: "11:00 am"
    }
  ];

  const [arr, setArr] = useState(store);

  return (
    <View className="px-4 py-2">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold text-gray-800">Your Activity</Text>
        <TouchableOpacity>
          <Text className="text-lg text-blue-500 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {/* Activity Items */}
      {arr.map((item, index) => (
        <View key={index} className="mb-3">
          <ActivitylistItem data={item} />
        </View>
      ))}
    </View>
  );
}
