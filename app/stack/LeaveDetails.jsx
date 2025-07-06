import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const LeaveDetails = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white p-4">
      
      {/* Top Section with Back Arrow */}
        <View className="relative items-center mb-6">
        <Pressable
            onPress={() => router.replace('/(tabs)/cart')}
            className="absolute left-0"
        >
            <Icon name="arrow-left" size={28} color="#000" />
        </Pressable>
        <Text className="text-2xl font-bold text-black">Leave Details</Text>
    </View>



      {/* Content Section with extra space top and bottom */}
      <View className="mt-8 mb-6">
        <Detail label="Title" value="Sick Leave" />
        <Detail label="Leave Type" value="Medical Leave" />
        <Detail label="Date" value="April 15, 2023 - April 18, 2023" />
        <Detail label="Reason" value="I need to take a medical leave." />
        <Detail label="Applied on" value="February 20, 2023" />
        <Detail label="Contact Number" value="(603) 555-0123" />
        <Detail label="Status" value="Pending" />
        <Detail label="Approved By" value="Michael Mitc" />
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between">
        <TouchableOpacity className="flex-1 bg-red-400 py-4 rounded-lg items-center mr-2 flex-row justify-center space-x-2">
          <Icon name="times-circle" size={22} color="white" />
          <Text className="text-white text-xl font-bold ml-2">Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 bg-emerald-500 py-4 rounded-lg items-center ml-2 flex-row justify-center space-x-2">
          <Icon name="check-circle" size={22} color="white" />
          <Text className="text-white text-xl font-bold ml-2">Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Reusable Detail Component with larger fonts
const Detail = ({ label, value }) => (
  <View className="mb-6">
    <Text className="text-base text-gray-400 mb-1">{label}</Text>
    <Text className="text-xl text-black font-medium">{value}</Text>
  </View>
);

export default LeaveDetails;
