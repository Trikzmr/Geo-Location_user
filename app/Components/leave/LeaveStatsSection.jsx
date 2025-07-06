import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LeaveCard from './LeaveCard';
import { useRouter } from 'expo-router';

const LeaveStatsSection = () => {
  const store = [
    { status: "Approved", count: "20",color:"blue" },
    { status: "Balance", count: "20",color:"[#ff5733]" },
    { status: "Pending", count: "20",color:"yellow" },
    { status: "Cancelled", count: "20",color:"green" }
  ];

  const [user, setUser] = useState(store);

  // Chunk the cards into rows of two
  const chunked = [];
  for (let i = 0; i < user.length; i += 2) {
    chunked.push(user.slice(i, i + 2));
  }
   const router = useRouter();
  return (
    <View className="px-4 py-3 bg-white">
      {/* Header Row */}
     <View className="flex-row items-center justify-between mb-4 py-2">
  <Text className="text-2xl font-bold text-gray-800">Leave Stats</Text>

  <View className="flex-row items-center space-x-3 gap-2">
    <TouchableOpacity className="w-8 h-8 rounded-md border border-gray-300 items-center justify-center" onPress={() => router.replace('/stack/ApplyLeaves')}>
      <Icon name="plus" size={16} color="#3B82F6" />
    </TouchableOpacity>
    <TouchableOpacity className="w-8 h-8 rounded-md border border-gray-300 items-center justify-center">
      <Icon name="sliders" size={16} color="#3B82F6" />
    </TouchableOpacity>
  </View>
</View>

      {/* Leave Cards in 2 per row layout */}
      {chunked.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-between mb-3">
          {row.map((item, index) => (
            <View key={index} className="w-[48%]">
              <LeaveCard data={item} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default LeaveStatsSection;
