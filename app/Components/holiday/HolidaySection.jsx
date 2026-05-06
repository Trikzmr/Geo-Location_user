import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import HolidayItems from './HolidayItems';

const HolidaySection = () => {
  const [data, setData] = useState([]);

  const weekoff = async () => {
    try {
      const currentYear = new Date().getFullYear();

      const response = await fetch('https://geoserver-ph8p.onrender.com/api/getWeekend', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year: currentYear }),
      });

      const result = await response.json();

      if (response.ok) {
        // Combine all dayCalander arrays from different months
        const allDays = result.flatMap(item => item.dayCalander);
        console.log(allDays);
        setData(allDays);
      } else {
        Alert.alert('Error', result.message || 'Failed to fetch data');
      }
    } catch (error) {
      console.error('API call failed:', error.message);
      Alert.alert('Network Error', 'Could not connect to server.');
    }
  };

  useEffect(() => {
    weekoff();
  }, []);

  return (
    <ScrollView className="">
      <Text className="text-2xl font-bold text-gray-800 px-4 py-4">Holiday List</Text>

      {data.map((item, index) => (
        <View key={index} className="px-4 pb-2">
          <HolidayItems calData={item} />
        </View>
      ))}
    </ScrollView>
  );
};

export default HolidaySection;
