import { View, Text } from 'react-native';

export default function ClenderBox({ data }) {
  const { date, day } = data;
  return (
    <View className="w-20 h-20 bg-white rounded-lg items-center justify-center p-2 border border-gray-200">
      <Text className="text-2xl font-bold text-black">{date}</Text>
      <Text className="text-base text-gray-500">{day}</Text>
    </View>
  );
}
