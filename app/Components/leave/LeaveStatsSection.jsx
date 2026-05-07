import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { baseurl } from "../../config/path";
import LeaveCard from "./LeaveCard";

const LeaveStatsSection = () => {
  const [stats, setStats] = useState([]);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const router = useRouter();
  const { width } = Dimensions.get("window");
  const interCardGap = 16;
  const availableWidth = layoutWidth || width - 48;
  const cardWidth = Math.floor((availableWidth - interCardGap) / 2);

  useEffect(() => {
    const leaveData = async () => {
      try {
        const reasonString = await AsyncStorage.getItem("userData");

        if (reasonString !== null) {
          const reason = JSON.parse(reasonString);
          const userId = reason.id;

          const response = await fetch(`${baseurl}/api/LeaveDataByuserId`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });

          const result = await response.json();

          if (response.ok) {
            const currentYear = new Date().getFullYear();
            const totalDays = {
              Balance: 20,
              Approved: 0,
              Pending: 0,
              Cancelled: 0,
            };

            result.forEach((item) => {
              const start = new Date(item.startingDate);
              const end = new Date(item.endingDate);
              const year = start.getFullYear();

              if (year === currentYear) {
                const days = Math.max(
                  Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1,
                  0,
                );

                if (totalDays[item.approvalStatus] !== undefined) {
                  totalDays[item.approvalStatus] += days;
                }
              }
            });

            setStats([
              {
                status: "Balance",
                count: Math.max(20 - totalDays.Approved, 0),
                color: "#8B5CF6",
              },
              {
                status: "Approved",
                count: totalDays.Approved,
                color: "#3B82F6",
              },
              { status: "Pending", count: totalDays.Pending, color: "#FACC15" },
              {
                status: "Cancelled",
                count: totalDays.Cancelled,
                color: "#EF4444",
              },
            ]);
          } else {
            Alert.alert("Error", result.message || "Failed to fetch data");
          }
        }
      } catch (error) {
        console.error("API call failed:", error.message);
        Alert.alert("Network Error", "Could not connect to server.");
      }
    };

    leaveData();
  }, []);

  return (
    <View className="px-5 mt-8">
      <View className="bg-white rounded-[32px] p-6 shadow-2xl shadow-slate-200/50 border border-slate-50">
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-1">
              <View className="w-1.5 h-4 rounded-full bg-blue-500" />
              <Text className="text-lg font-black text-slate-900 tracking-tight">
                Leave Balances
              </Text>
            </View>
            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Current Year • 2026
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              className="w-12 h-12 rounded-2xl bg-blue-600 items-center justify-center shadow-lg shadow-blue-200"
              onPress={() => router.push("/stack/ApplyLeaves")}
            >
              <FontAwesome name="plus" size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 items-center justify-center">
              <FontAwesome name="sliders" size={16} color="#475569" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          className="flex-row flex-wrap gap-4"
          onLayout={(event) => setLayoutWidth(event.nativeEvent.layout.width)}
        >
          {stats.map((item, index) => (
            <View
              key={index}
              style={{
                width: cardWidth,
                flexShrink: 0,
              }}
            >
              <LeaveCard data={item} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default LeaveStatsSection;
