import React from 'react';
import { View, Text } from 'react-native';

const LeaveCard = ({ data }) => {
  const { status, count,color } = data;

  return (
    <View className="bg-blue-50 border border-blue-300 rounded-xl w-48 h-36 px-4 py-4 shadow-sm">
      <Text className="text-lg font-semibold text-black">
        Leave{'\n'}{status}
      </Text>
      <Text className="mt-3 text-3xl font-bold text-blue-500">
        {count}
      </Text>
    </View>
  );
};

export default LeaveCard;
