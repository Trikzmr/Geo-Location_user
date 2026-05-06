import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LeaveCard from './LeaveCard';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseurl } from '../../config/path';

const LeaveStatsSection = () => {
  const [user, setUser] = useState([]);
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const isSmallScreen = width < 360; // phones like iPhone SE or small Androids

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

            const totalDays = {
              Balance: 20,
              Approved: 0,
              Pending: 0,
              Cancelled: 0,
            };

            result.forEach(item => {
              const start = new Date(item.startingDate);
              const end = new Date(item.endingDate);
              const year = start.getFullYear();

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

            setUser([
              { status: 'Balance', count: Math.max(20 - totalDays.Approved, 0), color: '#8B5CF6' },
              { status: 'Approved', count: totalDays.Approved, color: '#3B82F6' },
              { status: 'Pending', count: totalDays.Pending, color: '#FACC15' },
              { status: 'Cancelled', count: totalDays.Cancelled, color: '#EF4444' },
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

  return (
    <View className="px-6 pt-10 py-3 bg-white rounded-b-7xl" style={{
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  }}>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4 py-2">
        <Text className="text-2xl font-bold text-gray-800">Leave Stats</Text>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className="w-8 h-8 rounded-md border border-gray-300 items-center justify-center"
            onPress={() => router.push('/stack/ApplyLeaves')}
          >
            <Icon name="plus" size={16} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity className="w-8 h-8 rounded-md border border-gray-300 items-center justify-center">
            <Icon name="sliders" size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Responsive Card Grid */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          rowGap: width * 0.04,
          columnGap: width * 0.04,
          
        }}
      >
        {user.map((item, index) => (
          <View
            key={index}
            style={{
              width: isSmallScreen ? '100%' : '47%',
              marginBottom: width * 0.04,
            }}
          >
            <LeaveCard data={item} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default LeaveStatsSection;
