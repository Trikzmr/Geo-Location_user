import { Text, View } from "react-native";

const LeaveCard = ({ data }) => {
  const { status, count, color } = data;

  return (
    <View className="bg-slate-50 rounded-3xl p-5 border border-slate-100 min-h-[140px] flex-col justify-between">
      <View className="flex-row items-center justify-between">
        <View 
          className="w-1.5 h-6 rounded-full"
          style={{ backgroundColor: color }}
        />
        <View 
          className="w-8 h-8 rounded-xl items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <View 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
        </View>
      </View>

      <View className="mt-4">
        <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
          {status}
        </Text>
        <View className="flex-row items-end gap-1">
          <Text className="text-3xl font-black text-slate-900 leading-tight">
            {count}
          </Text>
          <Text className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase">
            Days
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LeaveCard;
