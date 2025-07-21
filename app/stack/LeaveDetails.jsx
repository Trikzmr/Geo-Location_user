import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter, useLocalSearchParams } from 'expo-router';

const LeaveDetails = () => {
  
  const router = useRouter();
  const { data } = useLocalSearchParams(); // ✅ Get passed data
  const user = JSON.parse(data); // ✅ Parse to object
  const { title,
     leaveType,
     startingDate,
     endingDate,
     message,
     requestedDate,
     number,
     approvalStatus}=user;

     const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};


  return (
    <View className="flex-1 bg-white p-4">
      
      {/* Top Section with Back Arrow */}
        <View className="relative items-center mb-6">
        <Pressable
            onPress={() => router.replace('/(tabs)/leave')}
            className="absolute left-0"
        >
            <Icon name="arrow-left" size={28} color="#000" />
        </Pressable>
        <Text className="text-2xl font-bold text-black">Leave Details</Text>
    </View>



      {/* Content Section with extra space top and bottom */}
      <View className="mt-8 mb-6">
        <Detail label="Title" value={title} />
        <Detail label="Leave Type" value={leaveType} />
        <Detail label="Date" value={`${formatDate(startingDate)} - ${formatDate(endingDate)}`} />
        <Detail label="Reason" value={message} />
        <Detail label="Applied on" value={formatDate(requestedDate)} />
        <Detail label="Contact Number" value={number} />
        <Detail label="Status" value="Pending" />
        <Detail label="Approved By" value={approvalStatus}/>
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
