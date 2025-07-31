import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import StatCards from './StatCards';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseurl } from '../../config/path';

export default function StasCardSection() {
  const [data, setData] = useState([]);

  const userData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const user = JSON.parse(userData);
      const userName = user.userName;

      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const month = now.toLocaleString('default', { month: 'long' });
      const year = now.getFullYear().toString();

      const body = {
        userName,
        month,
        year,
        date
      };

      const response = await fetch(`${baseurl}/api/getAttendanceByUsernameWithDayMonthAndYear`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // ✅ FIXED
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'User data is not found');
      
      console.log(result);
      const status=result.status;
      const time=result.time;

        const firstCheckInIndex = status.indexOf('check-in');
        const lastCheckOutIndex = status.lastIndexOf('check-out');

        function extractTime(timestamp) {
          return new Date(timestamp).toTimeString().split(' ')[0];
        }
        
        const firstCheckInTime = extractTime(time[firstCheckInIndex]);
        const lastCheckOutTime = extractTime(time[lastCheckOutIndex]);

        console.log(firstCheckInTime);
        console.log(lastCheckOutTime);

      const newData = [
        {
          icon: <Icon name="sign-in" size={20} color="#3B82F6" />,
          title: 'Check In',
          time: firstCheckInTime || 'N/A',
          description: 'On Time',
        },
        {
          icon: <Icon name="sign-out" size={20} color="#3B82F6" />,
          title: 'Check Out',
          time: lastCheckOutTime || 'N/A',
          description: 'Go Time',
        },
        {
          icon: <Icon name="coffee" size={20} color="#3B82F6" />,
          title: 'Break',
          time: "12:30:00" || 'N/A',
          description: 'Break Time',
        },
        {
          icon: <Icon name="user" size={20} color="#3B82F6" />,
          title: userName,
          time: "31",
          description: 'Working',
        },
      ];

      setData(newData);

    } catch (error) {
      console.error('API call failed:', error.message);
      Alert.alert('Error', error.message || 'Could not connect to server.');
    }
  };

  useEffect(() => {
    userData();
  }, []);

  const chunkedData = [];
  for (let i = 0; i < data.length; i += 2) {
    chunkedData.push(data.slice(i, i + 2));
  }

  return (
    <View className="px-4 pt-4">
      <Text className="text-lg font-semibold text-gray-800 mb-4">Today Attendance</Text>

      {chunkedData.length === 0 ? (
        <Text className="text-gray-500 text-center">No data available for today</Text>
      ) : (
        chunkedData.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row justify-between mb-4">
            {row.map((item, index) => (
              <View key={index} className="w-[48%]">
                <StatCards datas={item} />
              </View>
            ))}
          </View>
        ))
      )}
    </View>
  );
}
