import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HolidayItems = ({ date, day, type }) => {
  return (
    <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative mb-3">
      {/* Day - Top Right */}
      <Text className="absolute top-3 right-4 text-base text-gray-400 font-medium">
        {day}
      </Text>

      {/* Date Row */}
      <View className="flex-row items-center space-x-4 mb-2 gap-3">
        <Icon name="calendar" size={22} color="#000" />
        <Text className="text-lg font-semibold text-black">{date}</Text>
      </View>

      {/* Holiday Name */}
      <Text className="text-xl font-bold text-black">{type}</Text>
    </View>
  );
};

export default HolidayItems;
