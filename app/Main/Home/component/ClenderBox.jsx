import { View, Text } from 'react-native';


export default function ClenderBox({data}) {
  const {date,day}=data;
  return (
    <View className="w-16 h-16 bg-white rounded-lg shadow-md items-center justify-center">
      <Text className="text-lg font-bold text-black">{date}</Text>
      <Text className="text-sm text-gray-500">{day}</Text>
    </View>
  );
}
