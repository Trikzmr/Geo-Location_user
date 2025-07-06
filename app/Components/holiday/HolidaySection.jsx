import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import HolidayItems from './HolidayItems';

const HolidaySection = () => {
  const store = [
    {
      date: 'January 24, 2023',
      day: 'Monday',
      type: 'Holi',
    },
    {
      date: 'January 26, 2023',
      day: 'Thursday',
      type: 'Republic Day',
    },
    {
      date: 'March 8, 2023',
      day: 'Wednesday',
      type: 'Women’s Day',
    },
    {
      date: 'April 14, 2023',
      day: 'Friday',
      type: 'Ambedkar Jayanti',
    },
  ];

  const [data, setData] = useState(store);

  return (
    <ScrollView className="">
      <Text className="text-2xl font-bold text-gray-800 px-4 py-4">Holiday List</Text>

      {data.map((item, index) => (
        <View key={index} className="px-4 pb-2">
          <HolidayItems date={item.date} day={item.day} type={item.type} />
        </View>
      ))}
    </ScrollView>
  );
};

export default HolidaySection;
