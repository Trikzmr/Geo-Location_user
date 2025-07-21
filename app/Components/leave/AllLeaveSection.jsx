import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllLeaveItem from './AllLeaveItem';
import { baseurl } from '../../config/path'; // ✅ Fixed import

const AllLeaveSection = () => {
  const [data, setData] = useState([]);

 const leaveData = async () => {
  try {
    const reasonString = await AsyncStorage.getItem('userData');

    if (reasonString !== null) {
      const reason = JSON.parse(reasonString); // Parse string to object
      const userId = reason.id;
      console.log('User ID:', userId);
    
      const response = await fetch(`${baseurl}/api/LeaveDataByuserId`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const result = await response.json();

      if (response.ok) {
        setData(result);
        console.log(result);
      } else {
        Alert.alert('Error', result.message || 'Failed to fetch data');
      }
    } else {
      console.log('No userData found');
    }
  } catch (error) {
    console.error('API call failed:', error.message);
    Alert.alert('Network Error', 'Could not connect to server.');
  }
};

  useEffect(() => {
    leaveData();
  }, []);

  return (
    <View className="">
      <Text className="text-2xl font-bold text-gray-800 px-4 py-2 mb-2">All Leaves</Text>
      {data.map((item, index) => (
        <View key={index} className="px-4 pb-4 mb-4">
          <AllLeaveItem user={item} />
        </View>
      ))}
    </View>
  );
};

export default AllLeaveSection;
