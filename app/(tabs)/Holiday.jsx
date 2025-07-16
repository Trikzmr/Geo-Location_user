import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import HolidaySection from '../components/holiday/HolidaySection';

const Holiday = () => {
  return (
    <ScrollView className="pt-10 bg-white">
      <View>
        <HolidaySection />
      </View>
    </ScrollView>
  );
};

export default Holiday;
