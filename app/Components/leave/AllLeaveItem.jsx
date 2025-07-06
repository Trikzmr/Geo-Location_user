import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const AllLeaveItem = ({ user, onPress }) => {
  const { date, status, applyDays, leaveBalance, approvedBy } = user;
  const router = useRouter();

  return (
    <Pressable onPress={() => router.replace('/stack/LeaveDetails')} >
      <View className="bg-white rounded-xl shadow p-4 w-full min-h-[150px] space-y-4">
        {/* Top Row: Date and Status */}
        <View className="flex-row justify-between items-start">
          <View className="space-y-1">
            <Text className="text-lg text-gray-500">Date</Text>
            <Text className="font-semibold text-xl text-gray-800">{date}</Text>
          </View>
          <View className="px-4 py-1 bg-teal-100 rounded-full">
            <Text className="text-lg text-teal-600 font-semibold">{status}</Text>
          </View>
        </View>

        {/* Divider */}
        <View className="my-2">
          <View className="h-px bg-gray-200" />
        </View>

        {/* Bottom Row */}
        <View className="flex-row justify-between">
          <View className="space-y-1">
            <Text className="text-lg text-gray-500">Apply Days</Text>
            <Text className="font-bold text-xl">{applyDays} Days</Text>
          </View>
          <View className="space-y-1">
            <Text className="text-lg text-gray-500">Leave Balance</Text>
            <Text className="font-bold text-xl">{leaveBalance}</Text>
          </View>
          <View className="space-y-1">
            <Text className="text-lg text-gray-500">Approved By</Text>
            <Text className="font-bold text-xl">{approvedBy}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default AllLeaveItem;
