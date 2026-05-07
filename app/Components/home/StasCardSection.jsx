import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { baseurl } from "../../config/path";
import StatCards from "./StatCards";

export default function StasCardSection() {
  const router = useRouter();
  const [isAttendanceMarkedToday, setIsAttendanceMarkedToday] = useState(false);

  const defaultData = [
    {
      icon: <FontAwesome name="sign-in" size={20} color="#3B82F6" />,
      iconColor: "#3B82F6",
      title: "Check In",
      time: "N/A",
      description: "On Time Entry",
    },
    {
      icon: <FontAwesome name="sign-out" size={20} color="#10B981" />,
      iconColor: "#10B981",
      title: "Check Out",
      time: "N/A",
      description: "Standard Exit",
    },
    {
      icon: <FontAwesome name="coffee" size={20} color="#F59E0B" />,
      iconColor: "#F59E0B",
      title: "Break",
      time: "12:30:00",
      description: "Daily Interval",
    },
    {
      icon: <FontAwesome name="users" size={20} color="#6366F1" />,
      iconColor: "#6366F1",
      title: "Working Days",
      time: "...",
      description: "This Month",
    },
  ];

  const [data, setData] = useState(defaultData);

  const userData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const user = JSON.parse(userData);
      const userName = user.userName;

      const now = new Date();
      const date = now.toISOString().split("T")[0];
      const month = now.toLocaleString("default", { month: "long" });
      const year = now.getFullYear().toString();

      const body = {
        userName,
        month,
        year,
        date,
      };

      const response = await fetch(
        `${baseurl}/api/getAttendanceByUsernameWithDayMonthAndYear`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );
      const currentYear = new Date().getFullYear();
      const bodys = {
        year: currentYear,
        month,
      };
      const workingDay = await fetch(`${baseurl}/api/getCalenders`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodys),
      });
      const texts = await workingDay.json();
      const workingDays = texts.dayCalander.filter(
        (item) => item.dayType === 1,
      );

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "User data not found");

      const status = result.status || [];
      const time = result.time || [];

      const hasAttendanceToday = Array.isArray(status) && status.length > 0;
      setIsAttendanceMarkedToday(hasAttendanceToday);

      const firstCheckInIndex = status.indexOf("check-in");
      const lastCheckOutIndex = status.lastIndexOf("check-out");

      const firstCheckInTime =
        firstCheckInIndex !== -1 ? time[firstCheckInIndex] : "N/A";
      const lastCheckOutTime =
        lastCheckOutIndex !== -1 ? time[lastCheckOutIndex] : "N/A";

      const newData = [
        {
          icon: <FontAwesome name="sign-in" size={20} color="#3B82F6" />,
          iconColor: "#3B82F6",
          title: "Check In",
          time: firstCheckInTime,
          description: "On Time Entry",
        },
        {
          icon: <FontAwesome name="sign-out" size={20} color="#10B981" />,
          iconColor: "#10B981",
          title: "Check Out",
          time: lastCheckOutTime,
          description: "Standard Exit",
        },
        {
          icon: <FontAwesome name="coffee" size={20} color="#F59E0B" />,
          iconColor: "#F59E0B",
          title: "Break",
          time: "12:30:00",
          description: "Daily Interval",
        },
        {
          icon: <FontAwesome name="users" size={20} color="#6366F1" />,
          iconColor: "#6366F1",
          title: "Working Days",
          time: workingDays.length,
          description: "This Month",
        },
      ];

      setData(newData);
    } catch (error) {
      console.error("API call failed:", error.message);
      Alert.alert("Error", error.message || "Could not connect to server.");
    }
  };

  useEffect(() => {
    userData();
  }, []);

  const chunkedData = [];
  for (let i = 0; i < data.length; i += 2) {
    chunkedData.push(data.slice(i, i + 2));
  }

  return (
    <View className="px-5 mt-10">
      <View className="flex-row items-center justify-between mb-8">
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-1">
            <View className="w-1.5 h-4 rounded-full bg-blue-500" />
            <Text className="text-lg font-black text-slate-900 tracking-tight">
              Today's Summary
            </Text>
          </View>
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {isAttendanceMarkedToday ? "Status: Recorded" : "Status: Pending"}
          </Text>
        </View>
      </View>

      {!isAttendanceMarkedToday && (
        <View className="bg-white rounded-[32px] p-8 mb-8 border border-red-50 shadow-2xl shadow-red-100/50 relative overflow-hidden">
           <View className="absolute top-0 right-0 w-32 h-32 rounded-full bg-red-50 opacity-50 -mr-10 -mt-10" />
           <View className="flex-row items-center gap-4 relative z-10">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center">
                 <FontAwesome name="exclamation-circle" size={20} color="#EF4444" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-900 font-black text-base tracking-tight">Missing Entry</Text>
                <Text className="text-slate-400 text-xs font-bold mt-0.5 leading-4">Your attendance hasn't been logged yet for today.</Text>
              </View>
           </View>
           <TouchableOpacity
              onPress={() => router.push("/stack/Attendance")}
              className="bg-blue-600 rounded-2xl py-4 items-center mt-6 shadow-lg shadow-blue-200"
            >
              <Text className="text-white font-black uppercase tracking-widest text-xs">Mark Presence Now</Text>
           </TouchableOpacity>
        </View>
      )}

      {chunkedData.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-between mb-5">
          {row.map((item, index) => (
            <View key={index} className="w-[47%]">
              <StatCards datas={item} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
