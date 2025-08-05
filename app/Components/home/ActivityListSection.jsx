import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActivitylistItem from './ActivitylistItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseurl } from '../../config/path'

export default function ActivityListSection() {
   const [arr,setArr] = useState([]);

 const userStatus = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
     if (!userData) return;
     const { userName } = JSON.parse(userData);
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear().toString();

    const body = {
      userName, 
      month,
      year,
      date,
    };
    const response = await fetch(`${baseurl}/api/getAttendanceByUsernameWithDayMonthAndYear`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    const status = result.status;
    const time= result.time;
    const changeIndexes = [0]; 

    for (let i = 1; i < status.length; i++) {
      if (status[i] !== status[i - 1]) {
        changeIndexes.push(i);
      }
    }
    console.log(changeIndexes);

     const activityData = changeIndexes.map((idx) => ({
      title: status[idx],        
      time: time[idx],           
      date: date,               
      icon: <Icon name={status[idx] === 'check-in' ? 'sign-in' : 'sign-out'} size={20} color="#2563EB" />,
    }));
   setArr(activityData);

  } catch (error) {
    console.error("❌ Error in userStatus:", error.message);
    return null;
  }
};

useEffect(()=>{
userStatus();
},[])

  
 

  return (
    <View className="w-full px-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-gray-800">Your Activity</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-sm text-blue-500 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      {/* List of Activities */}
      <View className="space-y-3">
        {arr.map((item, index) => (
          <ActivitylistItem key={index} data={item} />
        ))}
      </View>
    </View>
  );
}
