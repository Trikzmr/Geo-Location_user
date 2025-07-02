import { View, Text } from 'react-native';

export default function StatCards({ datas }) {
  const { title, time, description } = datas;

  return (
    <View className="bg-white rounded-2xl shadow-md w-44 px-4 py-3 space-y-2">
      <Text className="text-sm text-gray-600">{title}</Text>
      <Text className="text-xl font-bold text-black">{time}</Text>
      <Text className="text-xs text-gray-500">{description}</Text>
    </View>
  );
}
