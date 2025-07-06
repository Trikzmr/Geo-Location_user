import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AllLeaveItem from './AllLeaveItem';

const AllLeaveSection = () => {
  const store = [
    {
      date: 'Apr 15, 2023 - Apr 18, 2023',
      status: 'Approved',
      applyDays: '3',
      leaveBalance: '15',
      approvedBy: 'Aman',
    },
    {
      date: 'Apr 17, 2023 - Apr 20, 2023',
      status: 'Rejected',
      applyDays: '5',
      leaveBalance: '35',
      approvedBy: 'Singh',
    }
  ]

  const [data, setData] = useState(store);

  return (
    <ScrollView className="">
      <Text className="text-2xl font-bold text-gray-800 px-4 py-2 mb-2">All Leaves</Text>

      {data.map((item, index) => (
        <View key={index} className="px-4 pb-4 mb-4">
          <AllLeaveItem user={item} />
        </View>
      ))}
    </ScrollView>
  );
};

export default AllLeaveSection;
