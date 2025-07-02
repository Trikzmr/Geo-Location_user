import React, { useState } from 'react';
import { View, Text } from 'react-native';
import StatCards from './StatCards';

export default function StasCardSection() {
  const store = [
    { title: "Check In", time: "11:20 am", description: "On Time" },
    { title: "Check Out", time: "11:40 am", description: "Go Time" },
    { title: "Break Time", time: "12:20 am", description: "Avg Time 30 min" },
    { title: "Aman", time: "31", description: "Working Days" },
    { title: "Break Time", time: "12:20 am", description: "Avg Time 30 min" }
  ];

  const [data, setData] = useState(store);

  // Group data into chunks of 2
  const chunked = [];
  for (let i = 0; i < data.length; i += 2) {
    chunked.push(data.slice(i, i + 2));
  }

  return (
    <View className="flex-col space-y-4 px-4 py-2">
      <Text className="text-lg font-semibold text-gray-800 mb-2">
        Today Attendance
      </Text>

      {chunked.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-between space-x-3">
          {row.map((item, index) => (
            <StatCards key={index} datas={item} />
          ))}
        </View>
      ))}
    </View>
  );
}
