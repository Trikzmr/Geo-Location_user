import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import HolidaySection from "../Components/holiday/HolidaySection";

const Holiday = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Rich Header Design */}
        <View className="bg-slate-900 border-b border-slate-800 pb-10 overflow-hidden">
          <View className="absolute inset-0 opacity-20">
            <View className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full bg-blue-500 blur-3xl" />
            <View className="absolute bottom-[-50px] left-[-50px] w-64 h-64 rounded-full bg-purple-500 blur-3xl" />
          </View>
          
          <View className="px-6 pt-10 relative z-10">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <View className="flex-row items-center gap-2 mb-2">
                  <View className="w-8 h-[2px] bg-blue-400" />
                  <Text className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Company Schedule
                  </Text>
                </View>
                <Text className="text-4xl font-bold text-white tracking-tight">
                  Holidays
                </Text>
                <Text className="text-slate-400 text-sm mt-3 leading-6 max-w-[260px]">
                  Stay ahead of the curve. View all upcoming company holidays and plan your time off.
                </Text>
              </View>
              <View className="w-14 h-14 rounded-2xl bg-white/10 items-center justify-center border border-white/20">
                <FontAwesome name="calendar-o" size={24} color="#60A5FA" />
              </View>
            </View>
          </View>
        </View>
        <HolidaySection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Holiday;
