import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActivitylistItem from './ActivitylistItem';
import { FontAwesome } from "@expo/vector-icons";
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
    <View className="w-full px-5 mt-10">
      <View className="flex-row items-center justify-between mb-8 px-1">
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-1">
            <View className="w-1.5 h-4 rounded-full bg-blue-500" />
            <Text className="text-lg font-black text-slate-900 tracking-tight">
              Recent Activity
            </Text>
          </View>
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Your Timeline • Today
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
          <Text className="text-[10px] font-black text-blue-500 uppercase tracking-widest">View History</Text>
        </TouchableOpacity>
      </View>

      <View>
        {arr.length > 0 ? (
          arr.map((item, index) => (
            <ActivitylistItem key={index} data={item} />
          ))
        ) : (
          <View className="rounded-[32px] bg-white p-10 border border-slate-100 items-center shadow-lg shadow-slate-100/50">
            <View className="w-16 h-16 rounded-full bg-slate-50 items-center justify-center mb-4">
              <FontAwesome name="history" size={24} color="#CBD5E1" />
            </View>
            <Text className="text-slate-400 font-bold text-sm tracking-wide">No activities logged yet</Text>
          </View>
        )}
      </View>
    </View>
  );
}
