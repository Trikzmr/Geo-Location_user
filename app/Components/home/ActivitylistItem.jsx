import { FontAwesome } from "@expo/vector-icons";
import React from 'react';
import { View, Text } from 'react-native';

const ActivitylistItem = ({ data }) => {
  const isCheckIn = data.title === 'check-in';
  const statusColor = isCheckIn ? '#3B82F6' : '#10B981';

  return (
    <View className="flex-row items-center mb-6">
      {/* Timeline indicator */}
      <View className="items-center mr-4">
        <View 
          className="w-10 h-10 rounded-2xl items-center justify-center shadow-lg shadow-slate-100"
          style={{ backgroundColor: `${statusColor}10` }}
        >
          <FontAwesome 
            name={isCheckIn ? "sign-in" : "sign-out"} 
            size={16} 
            color={statusColor} 
          />
        </View>
        <View className="w-[1px] h-8 bg-slate-100 mt-2" />
      </View>

      <View className="flex-1 bg-white rounded-[24px] p-5 border border-slate-50 shadow-sm shadow-slate-100/50">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
              {isCheckIn ? 'Entry Recorded' : 'Exit Recorded'}
            </Text>
            <Text className="text-base font-black text-slate-900 tracking-tight capitalize">
              {data.title.replace('-', ' ')}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-sm font-black text-slate-700">{data.time}</Text>
            <Text className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{data.date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActivitylistItem;
