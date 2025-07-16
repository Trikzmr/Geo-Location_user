import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LeaveCard from './LeaveCard';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseurl } from '../../config/path';

const LeaveStatsSection = () => {
  
  const [user,setUser] = useState([]);
  const router = useRouter();
  useEffect(() => {
  const leaveData = async () => {
    try {
      const reasonString = await AsyncStorage.getItem('userData');

      if (reasonString !== null) {
        const reason = JSON.parse(reasonString);
        const userId = reason.id;

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
          const currentYear = new Date().getFullYear();

          // Initialize total days for each status
          const totalDays = {
            Balance: 20,
            Approved: 0,
            Pending: 0,
            Cancelled: 0,
          };

          // Filter and count days
          result.forEach(item => {
            const start = new Date(item.startingDate);
            const end = new Date(item.endingDate);
            const year = start.getFullYear(); // or use endingDate if needed

            if (year === currentYear) {
              const days = Math.max(
                Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1,
                0
              );

              if (totalDays[item.approvalStatus] !== undefined) {
                totalDays[item.approvalStatus] += days;
              }
            }
          });

          console.log("Total Days by Status:", totalDays);

          // Optional: show in cards
          setUser([
            { status: 'Balance', count: Math.max(20 - totalDays.Approved, 0), color: 'bg-purple-500' },
            { status: 'Approved', count: totalDays.Approved, color: 'bg-blue-500' },
            { status: 'Pending', count: totalDays.Pending, color: 'bg-yellow-400' },
            { status: 'Cancelled', count: totalDays.Cancelled, color: 'bg-red-400' },
          ]);
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

  leaveData();
}, []);


  // Chunking into rows of two
  const chunked = [];
  for (let i = 0; i < user.length; i += 2) {
    chunked.push(user.slice(i, i + 2));
  }

  return (
    <View className="px-4 py-3 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4 py-2">
        <Text className="text-2xl font-bold text-gray-800">Leave Stats</Text>
        <View className="flex-row items-center space-x-3 gap-2">
          <TouchableOpacity
            className="w-8 h-8 rounded-md border border-gray-300 items-center justify-center"
            onPress={() => router.replace('/stack/ApplyLeaves')}
          >
            <Icon name="plus" size={16} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity className="w-8 h-8 rounded-md border border-gray-300 items-center justify-center">
            <Icon name="sliders" size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Cards: Two per row */}
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
