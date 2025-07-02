import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActivitylistItem from './ActivitylistItem';

export default function ActivityListSection() {
  const store = [
    {
      title: "Check In",
      date: "April 12, 2023",
      time: "10:00 am"
    },
    {
      title: "Check out",
      date: "April 12, 2023",
      time: "11:00 am"
    }
  ];

  const [arr, setArr] = useState(store);

  function work(item, index) {
    return <ActivitylistItem key={index} data={item} />;
  }

  return (
    <View className="space-y-3 px-4 py-2">
      
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold text-black">Your Activity</Text>
        <TouchableOpacity >
          <Text className="text-sm text-blue-500 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {arr.map(work)}

    </View>
  );
}
