import { View, Text } from 'react-native';

export default function StatCards({ datas }) {
  const { icon, title, time, description } = datas;

  return (
    <View className="bg-white rounded-2xl flex-1 p-4 shadow-md min-w-0">
      {/* Icon and Title */}
      <View className="flex-row items-center mb-2">
        <View className="bg-blue-100 p-2 rounded-full mr-3">
          {icon}
        </View>
        <Text className="text-base font-medium text-gray-800">{title}</Text>
      </View>

      {/* Time */}
      <Text className="text-xl font-bold text-black">{time}</Text>

      {/* Description */}
      <Text className="text-sm text-gray-500 mt-1">{description}</Text>
    </View>
  );
}
