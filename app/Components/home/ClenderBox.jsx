import { View, Text } from 'react-native';

export default function ClenderBox({ data, isToday }) {
  const { date, day } = data;

  return (
    <View
      className={`w-20 h-20 rounded-lg items-center justify-center p-2 border 
        ${isToday ? 'bg-[#2563eb] border-[#2563eb]' : 'bg-white border-gray-200'}
      `}
    >
      <Text
        className={`text-2xl font-bold ${isToday ? 'text-white' : 'text-black'}`}
      >
        {date}
      </Text>
      <Text
        className={`text-base ${isToday ? 'text-white' : 'text-gray-500'}`}
      >
        {day}
      </Text>
    </View>
  );
}
