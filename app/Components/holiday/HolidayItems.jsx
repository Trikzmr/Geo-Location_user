import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";

const HolidayItems = ({ calData }) => {
  const { date, title } = calData;
  const dateObj = new Date(date);
  const day = dateObj.toLocaleDateString(undefined, { weekday: "short" });
  const dayNum = dateObj.getDate();
  const month = dateObj.toLocaleDateString(undefined, { month: "short" });

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <View className="rounded-[24px] bg-white border border-slate-100 shadow-lg shadow-slate-100/40 overflow-hidden">
      <View className="flex-row items-center p-4">
        {/* Date Leaf Component */}
        <View className="w-16 h-20 rounded-2xl bg-slate-50 items-center justify-center border border-slate-100 relative">
          <View className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500 rounded-t-2xl" />
          <Text className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
            {month}
          </Text>
          <Text className="text-2xl font-black text-slate-900 my-0.5">
            {dayNum}
          </Text>
          <Text className="text-[9px] font-bold text-blue-500 uppercase">
            {day}
          </Text>
        </View>

        {/* Content Area */}
        <View className="flex-1 ml-5">
          <View className="flex-row items-center gap-2 mb-2">
            <View className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Planned Holiday
            </Text>
          </View>
          <Text className="text-base font-bold text-slate-900 leading-tight mb-2">
            {title}
          </Text>
          <View className="flex-row items-center gap-1">
            <FontAwesome name="clock-o" size={10} color="#94A3B8" />
            <Text className="text-[10px] font-medium text-slate-400">
              {formatDate(date)}
            </Text>
          </View>
        </View>

        {/* Arrow Action Decorator */}
        <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center">
          <FontAwesome name="chevron-right" size={12} color="#CBD5E1" />
        </View>
      </View>
    </View>
  );
};

export default HolidayItems;
