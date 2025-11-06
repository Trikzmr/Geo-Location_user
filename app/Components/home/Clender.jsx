import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Text } from "react-native";
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

  return (
    <View className="px-4 pt-4">
      {/* Month name centered */}
      <Text className="text-lg font-semibold text-gray-800 mb-0">Callender</Text>

      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        className="py-4"
      >
        <View className="flex-row gap-4 px-6">
          {amu.map((item, index) => (
            <ClenderBox key={index} data={item} isToday={item.isToday} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
