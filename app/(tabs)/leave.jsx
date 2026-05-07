import { SafeAreaView, ScrollView, Text, View } from "react-native";
import AllLeaveSection from "../Components/leave/AllLeaveSection";
import LeaveStatsSection from "../Components/leave/LeaveStatsSection";

export default function leave() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Premium Header Design */}
        <View className="bg-slate-900 border-b border-slate-800 pb-10 overflow-hidden">
          <View className="absolute inset-0 opacity-20">
            <View className="absolute top-[-50px] left-[-50px] w-64 h-64 rounded-full bg-indigo-500 blur-3xl" />
            <View className="absolute bottom-[-50px] right-[-50px] w-64 h-64 rounded-full bg-emerald-500 blur-3xl" />
          </View>
          
          <View className="px-6 pt-12 relative z-10">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <View className="flex-row items-center gap-2 mb-2">
                  <View className="w-8 h-[2px] bg-indigo-400" />
                  <Text className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Self Service
                  </Text>
                </View>
                <Text className="text-4xl font-bold text-white tracking-tight">
                  Leave
                </Text>
                <Text className="text-slate-400 text-sm mt-3 leading-6 max-w-[280px]">
                  Manage your balance, review requests, and track approvals seamlessly.
                </Text>
              </View>
              <View className="px-4 py-2 rounded-2xl bg-white/10 border border-white/20">
                <Text className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  Overview
                </Text>
              </View>
            </View>
          </View>
        </View>

        <LeaveStatsSection />
        <AllLeaveSection />
      </ScrollView>
    </SafeAreaView>
  );
}
