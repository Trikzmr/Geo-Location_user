import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import CalendarMonth from "./CalendarMonth";
import HolidayItems from "./HolidayItems";

const HolidaySection = () => {
  const [data, setData] = useState([]);
  const [monthlyHolidays, setMonthlyHolidays] = useState({});

  const weekoff = async () => {
    try {
      const currentYear = new Date().getFullYear();

      const response = await fetch(
        "https://geoserver-ph8p.onrender.com/api/getWeekend",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ year: currentYear }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        const allDays = result.flatMap((item) => item.dayCalander);
        setData(allDays);

        // Organize by month
        const grouped = {};
        allDays.forEach((day) => {
          const date = new Date(day.date);
          const monthKey = date.toLocaleDateString(undefined, {
            month: "long",
            year: "numeric",
          });
          if (!grouped[monthKey]) grouped[monthKey] = [];
          grouped[monthKey].push(day);
        });
        setMonthlyHolidays(grouped);
      } else {
        Alert.alert("Error", result.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("API call failed:", error.message);
      Alert.alert("Network Error", "Could not connect to server.");
    }
  };

  useEffect(() => {
    weekoff();
  }, []);

  const totalHolidays = data.length;
  const totalWorkingDays = 365 - data.length; // Simplified calculation

  return (
    <ScrollView className="px-5 pt-8">
      {data.length === 0 ? (
        <View className="rounded-3xl bg-white border border-slate-200 p-12 items-center shadow-2xl shadow-slate-200/50">
          <View className="w-20 h-20 rounded-full bg-slate-50 items-center justify-center mb-4">
            <FontAwesome name="calendar-times-o" size={32} color="#94A3B8" />
          </View>
          <Text className="text-xl font-bold text-slate-800 mb-2">No Holidays Yet</Text>
          <Text className="text-center text-slate-500 leading-6 max-w-[200px]">
            We couldn't find any scheduled holidays for this year.
          </Text>
        </View>
      ) : (
        <>
          {/* Enhanced Stats Overview */}
          <View className="mb-8 flex-row gap-4">
            <View className="flex-1 rounded-3xl bg-white p-5 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
              <View className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-red-50" />
              <View className="w-10 h-10 rounded-xl bg-red-100 items-center justify-center mb-3">
                <FontAwesome name="flag" size={18} color="#EF4444" />
              </View>
              <Text className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold mb-1">
                Total Holidays
              </Text>
              <View className="flex-row items-end gap-1">
                <Text className="text-3xl font-extrabold text-slate-900">
                  {totalHolidays}
                </Text>
                <Text className="text-xs text-slate-400 mb-1 font-medium">Days</Text>
              </View>
            </View>

            <View className="flex-1 rounded-3xl bg-white p-5 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
              <View className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-emerald-50" />
              <View className="w-10 h-10 rounded-xl bg-emerald-100 items-center justify-center mb-3">
                <FontAwesome name="briefcase" size={18} color="#10B981" />
              </View>
              <Text className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold mb-1">
                Work Days
              </Text>
              <View className="flex-row items-end gap-1">
                <Text className="text-3xl font-extrabold text-slate-900">
                  {totalWorkingDays}
                </Text>
                <Text className="text-xs text-slate-400 mb-1 font-medium">Days</Text>
              </View>
            </View>
          </View>

          {/* Interactive Calendar Section */}
          <View className="mb-10">
            <View className="flex-row items-center justify-between mb-5">
              <View className="flex-row items-center gap-3">
                <View className="w-1.5 h-6 rounded-full bg-blue-500" />
                <Text className="text-lg font-bold text-slate-900 tracking-tight">
                  Annual Calendar
                </Text>
              </View>
              <View className="px-3 py-1 bg-blue-50 rounded-full">
                <Text className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                  Interactive
                </Text>
              </View>
            </View>
            <CalendarMonth holidays={data} />
          </View>

          {/* Holiday Details Section */}
          <View className="pt-8 border-t border-slate-100">
            <View className="flex-row items-center gap-3 mb-8">
              <View className="w-1.5 h-6 rounded-full bg-purple-500" />
              <Text className="text-lg font-bold text-slate-900 tracking-tight">
                Upcoming Schedule
              </Text>
            </View>

            {Object.entries(monthlyHolidays).map(([month, holidays]) => (
              <View key={month} className="mb-10">
                <View className="flex-row items-center gap-4 mb-5">
                  <Text className="text-sm font-black text-slate-400 uppercase tracking-[0.25em]">
                    {month}
                  </Text>
                  <View className="flex-1 h-[1px] bg-slate-100" />
                  <View className="w-6 h-6 rounded-full bg-slate-900 items-center justify-center">
                    <Text className="text-[10px] font-bold text-white">
                      {holidays.length}
                    </Text>
                  </View>
                </View>
                <View className="gap-4">
                  {holidays.map((item, index) => (
                    <HolidayItems key={index} calData={item} />
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Footer Card */}
          <View className="mt-6 pb-8">
            <View className="rounded-[32px] bg-indigo-600 p-8 items-center relative overflow-hidden shadow-2xl shadow-indigo-200">
              <View className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-indigo-500/50" />
              <View className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-indigo-500/50" />
              
              <View className="w-16 h-16 rounded-3xl bg-white/10 items-center justify-center mb-6 border border-white/20">
                <FontAwesome name="rocket" size={28} color="white" />
              </View>
              <Text className="text-xl font-bold text-white text-center mb-3">
                Make it Count
              </Text>
              <Text className="text-indigo-100 text-center text-sm leading-6 font-medium">
                Plan your year wisely and make the most of your well-deserved breaks!
              </Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default HolidaySection;
