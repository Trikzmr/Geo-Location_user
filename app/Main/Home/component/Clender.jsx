import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import ClenderBox from './ClenderBox';

export default function Clender() {
  const store = [
    { date: "07", day: "Sun", month: "Jan", year: "2004" },
    { date: "08", day: "Mon", month: "Jan", year: "2004" },
    { date: "09", day: "Tue", month: "Jan", year: "2004" },
    { date: "10", day: "Wed", month: "Jan", year: "2004" },
    { date: "09", day: "Tue", month: "Jan", year: "2004" },
    { date: "10", day: "Wed", month: "Jan", year: "2004" }
  ];

  const [amu, setAmu] = useState(store);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="py-4"
    >
      <View className="flex-row gap-4 px-6">
        {amu.map((item, index) => (
          <ClenderBox key={index} data={item} />
        ))}
      </View>
    </ScrollView>
  );
}
