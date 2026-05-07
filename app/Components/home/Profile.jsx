import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  // Fetch user data from AsyncStorage
  const userStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) return;
      const { userName, role } = JSON.parse(userData);
      setUserName(userName || 'Unknown User');
      setUserRole(role || 'No Role');
    } catch (error) {
      console.error(" Error in userStatus:", error.message);
    }
  };

  useEffect(() => {
    userStatus();
  }, []);

  return (
    <View className="bg-slate-900 border-b border-slate-800 pb-12 overflow-hidden">
      {/* Decorative mesh glow */}
      <View className="absolute inset-0 opacity-20">
        <View className="absolute top-[-40px] left-[-40px] w-72 h-72 rounded-full bg-indigo-600 blur-3xl" />
        <View className="absolute bottom-[-60px] right-[-20px] w-64 h-64 rounded-full bg-blue-500 blur-3xl" />
      </View>

      <View className="px-6 pt-16 relative z-10">
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center gap-4">
            <View className="p-1 rounded-full border-2 border-indigo-500/30 shadow-2xl shadow-indigo-500/20">
              <Image
                source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
                className="w-14 h-14 rounded-full border-2 border-white"
              />
            </View>
            <View>
              <View className="flex-row items-center gap-2 mb-1">
                <View className="w-6 h-[2px] bg-indigo-400" />
                <Text className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  {userRole}
                </Text>
              </View>
              <Text className="text-2xl font-black text-white tracking-tight">
                Hi, {userName.split(' ')[0]} 👋
              </Text>
            </View>
          </View>

          <TouchableOpacity className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 items-center justify-center shadow-xl">
             <FontAwesome name="bell-o" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push('stack/Attendance')}
          className="bg-indigo-600 rounded-[28px] p-5 shadow-2xl shadow-indigo-500/30 border border-indigo-400/30 overflow-hidden relative"
        >
          {/* Subtle light streak */}
          <View className="absolute top-0 right-0 w-32 h-full bg-white/5 skew-x-[-20deg]" />
          
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <View className="w-12 h-12 rounded-2xl bg-white/20 items-center justify-center">
                <FontAwesome name="calendar-check-o" size={20} color="white" />
              </View>
              <View>
                <Text className="text-white font-black text-sm uppercase tracking-widest">Mark Attendance</Text>
                <Text className="text-indigo-200 text-xs font-bold mt-0.5">Report your presence today</Text>
              </View>
            </View>
            <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center">
               <FontAwesome name="arrow-right" size={14} color="white" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>

  );
};

export default Profile;
