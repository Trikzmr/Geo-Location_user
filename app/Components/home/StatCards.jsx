import { View, Text } from 'react-native';

export default function StatCards({ datas }) {
  const { icon, title, time, description } = datas;

  return (
    <View className="bg-white rounded-2xl flex-1 p-4 min-w-0">
      {/* Icon and Title */}
      <View className="flex-row items-center mb-3">
        <View className="bg-blue-100 p-3 rounded-full mr-3">
          {icon}
        </View>
        <Text className="text-lg font-semibold text-gray-800 flex-shrink">
          {title}
        </Text>
      </View>

      {/* Time */}
      <Text className="text-2xl font-bold text-black leading-tight">
        {time}
      </Text>

      {/* Description */}
      <Text className="text-sm text-gray-500 mt-2 leading-snug">
        {description}
      </Text>
    </View>
  );
}
