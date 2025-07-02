import React from 'react';
import { View, Text } from 'react-native';

const ActivitylistItem = ({ data }) => {
  const { title, date, time } = data;

  return (
    <View className="bg-white rounded-xl shadow px-6 py-5 w-80 min-h-24 flex-row items-center justify-between">
      
      <View className="space-y-1">
        <Text className="text-base font-semibold text-black">{title}</Text>
        <Text className="text-xs text-gray-500">{date}</Text>
      </View>

      <View className="items-end space-y-1">
        <Text className="text-base font-semibold text-black">{time}</Text>
        <Text className="text-xs text-gray-400">On Time</Text>
      </View>

    </View>
  );
};

export default ActivitylistItem;
