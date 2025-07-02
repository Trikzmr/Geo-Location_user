import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import ClenderBox from './ClenderBox';

export default function Clender() {
  const store = [
    { date: "07", day: "sun", month: "jan", year: "2004" },
    { date: "08", day: "mon", month: "jan", year: "2004" },
    { date: "09", day: "tue", month: "jan", year: "2004" },
    { date: "10", day: "wed", month: "jan", year: "2004" }
  ];

  const [amu, setAmu] = useState(store);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-3 px-4 py-2">
        {amu.map((item, index) => (
          <ClenderBox key={index} data={item} />
        ))}
      </View>
    </ScrollView>
  );
}
