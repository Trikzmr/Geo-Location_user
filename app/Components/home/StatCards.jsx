import { View, Text } from 'react-native';

export default function StatCards({ datas }) {
  const { icon, title, time, description, iconColor = "#3B82F6" } = datas;

  return (
    <View className="bg-white rounded-[32px] p-5 border border-slate-50 shadow-2xl shadow-slate-200/50 min-h-[140px] flex-col justify-between">
      <View className="flex-row items-center justify-between">
        <View 
          className="w-1.5 h-6 rounded-full"
          style={{ backgroundColor: iconColor }}
        />
        <View 
          className="w-10 h-10 rounded-2xl items-center justify-center"
          style={{ backgroundColor: `${iconColor}10` }}
        >
          {icon}
        </View>
      </View>

      <View className="mt-4">
        <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
          {title}
        </Text>
        <View className="flex-row items-end gap-1">
          <Text className="text-xl font-black text-slate-900 leading-tight">
            {time}
          </Text>
        </View>
        <Text className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">
          {description}
        </Text>
      </View>
    </View>
  );
}
