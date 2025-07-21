import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const AllLeaveItem = ({user}) => {
  const { startingDate,endingDate,approvalStatus, adminName } = user;
  const router = useRouter();

   const start = new Date(startingDate);
  const end = new Date(endingDate);
  const applyDays = Math.max(
    Math.ceil((end - start) / (1000 * 60 * 60 * 24))+1 ,
    0
  );
  const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/stack/LeaveDetails',
          params: { data: JSON.stringify(user) },
        })
      }
      
      className="rounded-xl overflow-hidden"
    >
      <View className="bg-white rounded-xl shadow p-4 w-full min-h-[150px] space-y-4">
        {/* Top Row: Date and Status */}
        <View className="flex-row justify-between items-start">
          <View className="space-y-1">
            <Text className="text-lg text-gray-500">Date</Text>
           <Text className="font-semibold text-xl text-gray-800">
                  {formatDate(startingDate)} - {formatDate(endingDate)}
            </Text>
          </View>
          <View className="px-4 py-1 bg-teal-100 rounded-full">
            <Text className="text-lg text-teal-600 font-semibold">{approvalStatus}</Text>
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
            <Text className="font-bold text-xl">{applyDays || 0} Days</Text>
          </View>
          <View className="space-y-1">
            <Text className="text-lg text-gray-500">Leave Balance</Text>
            <Text className="font-bold text-xl">0</Text>
          </View>
          <View className="space-y-1">
            <Text className="text-lg text-gray-500">Approved By</Text>
            <Text className="font-bold text-xl">{adminName || 'Not Yet'}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default AllLeaveItem;
