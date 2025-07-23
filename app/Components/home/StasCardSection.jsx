import React, { useState } from 'react';
import { View, Text } from 'react-native';
import StatCards from './StatCards';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function StasCardSection() {
  const store = [
    { icon: <Icon name="sign-in" size={30} color="#3B82F6"/>, title: "Check In", time: "11:20 am", description: "On Time" },
    { icon: <Icon name="sign-out" size={30} color="#3B82F6"/>, title: "Check Out", time: "11:40 am", description: "Go Time" },
    { icon: <Icon name="coffee" size={30} color="#3B82F6"/>, title: "Break Time", time: "12:20 am", description: "Avg Time 30 min" },
    { icon: <Icon name="user" size={30} color="#3B82F6"/>, title: "Aman", time: "31", description: "Working Days" }
  ];

  const [data, setData] = useState(store);

  // Group data into chunks of 2
  const chunked = [];
  for (let i = 0; i < data.length; i += 2) {
    chunked.push(data.slice(i, i + 2));
  }

  return (
    <View className="flex-col space-y-4 px-4 py-2 mx-auto">
      <Text className="text-lg font-semibold text-gray-800 mb-2">
        Today Attendance
      </Text>

      {chunked.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row">
          {row.map((item, index) => (
            <View key={index} className="mb-3 mx-2 flex-1">
              <StatCards datas={item} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
