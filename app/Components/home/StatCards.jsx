import { View, Text } from 'react-native';

export default function StatCards({ datas }) {
  const { icon,title, time, description } = datas;

  return (
    <View className="bg-white rounded-2xl w-48 h-36 px-3 py-3 shadow-sm">
      {/* Icon and Title */}
      <View className="flex-row items-center">
        <View className="bg-blue-[30px] p-1 rounded-full mr-1.5">
         {icon}
        </View>
        <Text className="text-sm text-gray-700 font-medium">{title}</Text>
      </View>

      {/* Time */}
      <Text className="text-2xl font-bold text-black mt-1">{time}</Text>

      {/* Description */}
      <Text className="text-base font-medium text-black mt-1">{description}</Text>
    </View>
  );
}
