import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { baseurl } from "../../config/path";
import AllLeaveItem from "./AllLeaveItem";

const AllLeaveSection = () => {
  const [data, setData] = useState([]);

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
          setData(result);
        } else {
          Alert.alert("Error", result.message || "Failed to fetch data");
        }
      }
    } catch (error) {
      console.error("API call failed:", error.message);
      Alert.alert("Network Error", "Could not connect to server.");
    }
  };

  useEffect(() => {
    leaveData();
  }, []);

  return (
    <View className="px-5 mt-10">
      <View className="flex-row items-center justify-between mb-8">
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-1">
            <View className="w-1.5 h-4 rounded-full bg-indigo-500" />
            <Text className="text-lg font-black text-slate-900 tracking-tight">
              Request History
            </Text>
          </View>
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Recent Activity • Status
          </Text>
        </View>
      </View>

      {data.length > 0 ? (
        data.map((item, index) => (
          <View key={index} className="mb-4">
            <AllLeaveItem user={item} />
          </View>
        ))
      ) : (
        <View className="rounded-[32px] bg-white p-10 border border-slate-100 items-center shadow-lg shadow-slate-100/50">
          <View className="w-16 h-16 rounded-full bg-slate-50 items-center justify-center mb-4">
            <FontAwesome name="folder-open-o" size={24} color="#CBD5E1" />
          </View>
          <Text className="text-slate-400 font-bold text-sm tracking-wide">No Requests Found</Text>
        </View>
      )}
    </View>
  );
};

export default AllLeaveSection;
