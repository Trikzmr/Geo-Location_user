import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';

const ActivitylistItem = ({ data }) => {
  const { icon, title, date, time } = data;

  return (
    <View className="bg-white rounded-2xl shadow-md p-4 w-full self-center my-2 flex-row items-center justify-between">
      
      {/* Left: Icon + Title + Date */}
      <View className="flex-row items-center flex-1 space-x-3">
        <View className="bg-blue-100 p-3 rounded-xl">
          {icon}
        </View>
        <View className="flex-shrink">
          <Text className="text-base font-semibold text-black">{title}</Text>
          <Text className="text-xs text-gray-500">{date}</Text>
        </View>
      </View>

      {/* Right: Time + Status */}
      <View className="items-end ml-2">
        <Text className="text-base font-semibold text-black">{time}</Text>
        <Text className="text-xs text-gray-400">On Time</Text>
      </View>
    </View>
  );
};

export default ActivitylistItem;
