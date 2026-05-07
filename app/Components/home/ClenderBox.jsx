import { View, Text } from 'react-native';

export default function ClenderBox({ data, isToday }) {
  const { date, day } = data;

  return (
    <View
      className={`w-[70px] h-[90px] rounded-[24px] items-center justify-center border ${
        isToday 
          ? "bg-emerald-500 border-emerald-400 shadow-xl shadow-emerald-200" 
          : "bg-white border-slate-100 shadow-sm shadow-slate-100"
      }`}
    >
      <Text
        className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
          isToday ? "text-emerald-100" : "text-slate-400"
        }`}
      >
        {day}
      </Text>
      <Text
        className={`text-2xl font-black tracking-tight ${
          isToday ? "text-white" : "text-slate-900"
        }`}
      >
        {date}
      </Text>
      {isToday && (
        <View className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-white/50" />
      )}
    </View>
  );
}
