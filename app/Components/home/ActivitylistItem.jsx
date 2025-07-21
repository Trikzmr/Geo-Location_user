import React from 'react';
import { View, Text } from 'react-native';

const ActivitylistItem = ({ data }) => {
  const { icon, title, date, time } = data;

  return (
    <View className="bg-white rounded-xl shadow px-4 py-5 w-[97%] self-center flex-row items-center justify-between">
      
      {/* Icon + Title + Date */}
      <View className="flex-row items-center space-x-4">
        <View className="bg-blue-[30px] p-2 rounded-xl">
          {icon}
        </View>
        <View>
          <Text className="text-base font-semibold text-black">{title}</Text>
          <Text className="text-xs text-gray-500">{date}</Text>
        </View>
      </View>

      {/* Time + Status */}
      <View className="items-end">
        <Text className="text-base font-semibold text-black">{time}</Text>
        <Text className="text-xs text-gray-400">On Time</Text>
      </View>

    </View>
  );
};

export default ActivitylistItem;
