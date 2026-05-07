import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import ClenderBox from "./ClenderBox";

export default function Clender() {
  const [amu, setAmu] = useState([]);
  const [monthName, setMonthName] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    const generateYearCalendar = (year) => {
      const daysInYear = [];
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31);
      const today = new Date();

      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const day = date.toLocaleDateString("en-GB", { weekday: "short" });
        const dateStr = date.toLocaleDateString("en-GB", { day: "2-digit" });
        const month = date.toLocaleDateString("en-GB", { month: "long" });

        daysInYear.push({
          date: dateStr,
          day,
          month,
          isToday:
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear(),
        });
      }

      return daysInYear;
    };

    const year = new Date().getFullYear();
    const fullYearCalendar = generateYearCalendar(year);

    // Filter only current month
    const currentMonth = new Date().toLocaleDateString("en-GB", { month: "long" });
    setMonthName(currentMonth);
    setAmu(fullYearCalendar.filter((d) => d.month === currentMonth));
  }, []);

  // Scroll to today's date
  useEffect(() => {
    if (amu.length > 0) {
      const todayIndex = amu.findIndex((d) => d.isToday);
      if (todayIndex !== -1 && scrollRef.current) {
        // Approximate box size (80px width + 16px gap)
        const boxWidth = 80 + 16;
        const screenCenterOffset = (todayIndex * boxWidth) - 150;
        scrollRef.current.scrollTo({
          x: screenCenterOffset > 0 ? screenCenterOffset : 0,
          animated: true,
        });
      }
    }
  }, [amu]);

  const goToToday = () => {
    const todayIndex = amu.findIndex((d) => d.isToday);
    if (todayIndex !== -1 && scrollRef.current) {
      const boxWidth = 70 + 16;
      const screenCenterOffset = (todayIndex * boxWidth) - 150;
      scrollRef.current.scrollTo({
        x: screenCenterOffset > 0 ? screenCenterOffset : 0,
        animated: true,
      });
    }
  };

  return (
    <View className="px-5 mt-8">
      <View className="flex-row items-center justify-between mb-4 px-1">
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-1">
            <View className="w-1.5 h-4 rounded-full bg-emerald-500" />
            <Text className="text-lg font-black text-slate-900 tracking-tight">
              Calendar
            </Text>
          </View>
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {monthName} • 2026
          </Text>
        </View>
        <TouchableOpacity 
          onPress={goToToday}
          className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100"
        >
           <Text className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Today</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        className="py-2"
      >
        <View className="flex-row gap-4 px-1">
          {amu.map((item, index) => (
            <ClenderBox key={index} data={item} isToday={item.isToday} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
