import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
    Dimensions,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const CalendarMonth = ({ holidays = [] }) => {
  const [currentDate, setCurrentDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const screenWidth = Dimensions.get("window").width;

  // Create a set of holiday dates for quick lookup
  const holidayDates = new Set(
    holidays.map((h) => new Date(h.date).toDateString()),
  );

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Get first day of month and number of days
  const date = new Date(year, month, 1);
  const firstDay = date.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Create arrays for days
  const prevMonthDays = Array.from({ length: firstDay }, (_, i) => ({
    day: daysInPrevMonth - firstDay + i + 1,
    isCurrentMonth: false,
  }));

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: true,
  }));

  const nextMonthDays = Array.from(
    { length: 42 - prevMonthDays.length - currentMonthDays.length },
    (_, i) => ({
      day: i + 1,
      isCurrentMonth: false,
    }),
  );

  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isHoliday = (dayNum) => {
    if (!currentMonthDays.find((d) => d.day === dayNum)) return false;
    const checkDate = new Date(year, month, dayNum).toDateString();
    return holidayDates.has(checkDate);
  };

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    );
  };

  const getMonthColor = () => {
    const colors = [
      { bg: "from-red-50 to-pink-50", accent: "#EF4444", light: "#FEE2E2" },
      { bg: "from-orange-50 to-amber-50", accent: "#F97316", light: "#FFF7ED" },
      { bg: "from-yellow-50 to-lime-50", accent: "#FBBF24", light: "#FEFCE8" },
      {
        bg: "from-green-50 to-emerald-50",
        accent: "#10B981",
        light: "#F0FDF4",
      },
      { bg: "from-cyan-50 to-blue-50", accent: "#06B6D4", light: "#ECFDF5" },
      { bg: "from-blue-50 to-indigo-50", accent: "#3B82F6", light: "#F0F9FF" },
      { bg: "from-purple-50 to-pink-50", accent: "#A855F7", light: "#F9F5FF" },
      { bg: "from-pink-50 to-rose-50", accent: "#EC4899", light: "#FDF2F8" },
      { bg: "from-rose-50 to-red-50", accent: "#F43F5E", light: "#FFF5F7" },
      { bg: "from-slate-50 to-gray-50", accent: "#6B7280", light: "#F9FAFB" },
      { bg: "from-amber-50 to-orange-50", accent: "#D97706", light: "#FFFBEB" },
      { bg: "from-teal-50 to-cyan-50", accent: "#14B8A6", light: "#F0FDFA" },
    ];
    return colors[month];
  };

  const monthColor = getMonthColor();

  return (
    <View className="mb-6">
      {/* Header with improved navigation */}
      <View
        className="bg-white rounded-[32px] p-6 mb-6 shadow-xl shadow-slate-200/50 border border-slate-50"
      >
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity
            className="w-12 h-12 rounded-2xl bg-slate-50 items-center justify-center border border-slate-100"
            onPress={goToPreviousMonth}
          >
            <FontAwesome name="chevron-left" size={14} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity onPress={goToToday} className="items-center">
            <Text className="text-2xl font-black text-slate-900 tracking-tight">
              {currentDate.toLocaleDateString("en-US", { month: "long" })}
            </Text>
            <Text className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mt-1">
              {year} • Today
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-12 h-12 rounded-2xl bg-slate-50 items-center justify-center border border-slate-100"
            onPress={goToNextMonth}
          >
            <FontAwesome name="chevron-right" size={14} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Improved Stats bar */}
        <View className="flex-row gap-3">
          <View className="flex-1 rounded-2xl bg-slate-50 px-3 py-3 items-center border border-slate-100">
            <Text className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">
              Days
            </Text>
            <Text className="text-sm font-black text-slate-900">
              {daysInMonth}
            </Text>
          </View>
          <View className="flex-1 rounded-2xl bg-red-50 px-3 py-3 items-center border border-red-100">
            <Text className="text-[9px] text-red-400 font-bold uppercase tracking-wider mb-1">
              Holidays
            </Text>
            <Text
              className="text-sm font-black text-red-600"
            >
              {currentMonthDays.filter((d) => isHoliday(d.day)).length}
            </Text>
          </View>
          <View className="flex-1 rounded-2xl bg-emerald-50 px-3 py-3 items-center border border-emerald-100">
            <Text className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider mb-1">
              Work
            </Text>
            <Text className="text-sm font-black text-emerald-600">
              {daysInMonth -
                currentMonthDays.filter((d) => isHoliday(d.day)).length}
            </Text>
          </View>
        </View>
      </View>

      {/* Calendar grid with cleaner styling */}
      <View className="bg-white rounded-[32px] border border-slate-100 p-5 shadow-2xl shadow-slate-200/50">
        {/* Weekday headers */}
        <View className="flex-row mb-4">
          {weekDays.map((day, idx) => (
            <View key={idx} className="flex-1 items-center">
              <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {day[0]}
              </Text>
            </View>
          ))}
        </View>

        {/* Calendar grid cells */}
        <View>
          {Array.from({ length: Math.ceil(allDays.length / 7) }).map(
            (_, weekIdx) => (
              <View key={weekIdx} className="flex-row mb-1">
                {allDays
                  .slice(weekIdx * 7, (weekIdx + 1) * 7)
                  .map((dayObj, dayIdx) => {
                    const isHolidayDay =
                      dayObj.isCurrentMonth && isHoliday(dayObj.day);
                    const isToday =
                      dayObj.isCurrentMonth &&
                      dayObj.day === new Date().getDate() &&
                      new Date().getMonth() === month &&
                      new Date().getFullYear() === year;

                    return (
                      <View
                        key={dayIdx}
                        className="flex-1 aspect-square items-center justify-center p-1"
                      >
                        <View
                          className={`w-full h-full rounded-2xl items-center justify-center relative ${
                            isHolidayDay
                              ? "bg-red-500 shadow-lg shadow-red-200"
                              : isToday
                                ? "bg-blue-500 shadow-lg shadow-blue-200"
                                : dayObj.isCurrentMonth
                                  ? "bg-white border border-slate-50"
                                  : "bg-transparent"
                          }`}
                        >
                          <Text
                            className={`text-xs font-black ${
                              isHolidayDay || isToday
                                ? "text-white"
                                : dayObj.isCurrentMonth
                                  ? "text-slate-700"
                                  : "text-slate-200"
                            }`}
                          >
                            {dayObj.day}
                          </Text>
                          {isToday && !isHolidayDay && (
                            <View className="absolute bottom-2 w-1 h-1 rounded-full bg-white/50" />
                          )}
                        </View>
                      </View>
                    );
                  })}
              </View>
            ),
          )}
        </View>

        {/* Simplified Legend */}
        <View className="mt-6 flex-row items-center justify-center gap-6 pt-6 border-t border-slate-50">
          <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-200" />
            <Text className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Today</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-red-200" />
            <Text className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Holiday</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-slate-100 border border-slate-200" />
            <Text className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Working</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CalendarMonth;
