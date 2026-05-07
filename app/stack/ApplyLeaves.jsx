import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ApplyLeaves = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    userId: "",
    userName: "",
    title: "",
    leaveType: "",
    startingDate: "",
    endingDate: "",
    message: "",
    number: "",
  });

  const [loading, setLoading] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const reasonString = await AsyncStorage.getItem("userData");
      if (reasonString) {
        const reason = JSON.parse(reasonString);
        setUser((prev) => ({
          ...prev,
          userId: reason.id,
          userName: reason.userName,
        }));
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        "https://geoserver-ph8p.onrender.com/api/addLeaveRequest",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Leave request submitted successfully");
        router.back();
      } else {
        Alert.alert("Failed", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("API call failed:", error.message);
      Alert.alert("Network Error", "Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-50"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        className="px-5 pt-10"
      >
        <View className="bg-white rounded-[32px] p-8 mb-8 shadow-2xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden">
          <View className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-50" />
          <View className="flex-row items-center justify-between relative z-10">
            <View className="flex-1 pr-4">
              <View className="flex-row items-center gap-2 mb-2">
                <View className="w-8 h-[2px] bg-blue-500" />
                <Text className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Request Form
                </Text>
              </View>
              <Text className="text-3xl font-black text-slate-900 tracking-tight">
                Apply Leave
              </Text>
              <Text className="mt-3 text-xs leading-5 text-slate-400 font-medium max-w-[200px]">
                Submit your request details and track approval status.
              </Text>
            </View>
            <View className="w-16 h-16 rounded-[24px] bg-blue-600 items-center justify-center shadow-lg shadow-blue-200">
               <FontAwesome name="paper-plane" size={24} color="white" />
            </View>
          </View>
        </View>

        <View className="bg-white rounded-[32px] p-7 shadow-2xl shadow-slate-200/40 border border-slate-50 mb-8">
          <Text className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 border-b border-slate-50 pb-4">
            Leave Information
          </Text>

          <View className="space-y-6">
            <View>
              <Text className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                Request Title
              </Text>
              <TextInput
                value={user.title}
                onChangeText={(text) => setUser({ ...user, title: text })}
                placeholder="e.g. Family Emergency"
                placeholderTextColor="#CBD5E1"
                className="rounded-2xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm font-bold text-slate-900"
              />
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                  Type
                </Text>
                <TextInput
                  value={user.leaveType}
                  onChangeText={(text) => setUser({ ...user, leaveType: text })}
                  placeholder="Casual"
                  placeholderTextColor="#CBD5E1"
                  className="rounded-2xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm font-bold text-slate-900"
                />
              </View>
              <View className="flex-1">
                <Text className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                  Contact
                </Text>
                <TextInput
                  keyboardType="phone-pad"
                  value={user.number}
                  onChangeText={(text) => setUser({ ...user, number: text })}
                  placeholder="Mobile"
                  placeholderTextColor="#CBD5E1"
                  className="rounded-2xl bg-slate-50 border border-slate-100 px-5 py-4 text-sm font-bold text-slate-900"
                />
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                  Start Date
                </Text>
                <TouchableOpacity
                  className="rounded-2xl bg-slate-50 border border-slate-100 px-5 py-4 flex-row items-center justify-between"
                  onPress={() => setShowStartPicker(true)}
                >
                  <Text className="text-sm font-bold text-slate-900">
                    {user.startingDate || "Select"}
                  </Text>
                  <FontAwesome name="calendar-o" size={14} color="#94A3B8" />
                </TouchableOpacity>
              </View>
              <View className="flex-1">
                <Text className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                  End Date
                </Text>
                <TouchableOpacity
                  className="rounded-2xl bg-slate-50 border border-slate-100 px-5 py-4 flex-row items-center justify-between"
                  onPress={() => setShowEndPicker(true)}
                >
                  <Text className="text-sm font-bold text-slate-900">
                    {user.endingDate || "Select"}
                  </Text>
                  <FontAwesome name="calendar-o" size={14} color="#94A3B8" />
                </TouchableOpacity>
              </View>
            </View>

            {showStartPicker && (
              <DateTimePicker
                mode="date"
                display="default"
                value={
                  user.startingDate ? new Date(user.startingDate) : new Date()
                }
                minimumDate={new Date()}
                onChange={(event, date) => {
                  setShowStartPicker(false);
                  if (date) {
                    setUser((prev) => ({
                      ...prev,
                      startingDate: formatDate(date),
                    }));
                  }
                }}
              />
            )}

            {showEndPicker && (
              <DateTimePicker
                mode="date"
                display="default"
                value={user.endingDate ? new Date(user.endingDate) : new Date()}
                minimumDate={new Date()}
                onChange={(event, date) => {
                  setShowEndPicker(false);
                  if (date) {
                    setUser((prev) => ({
                      ...prev,
                      endingDate: formatDate(date),
                    }));
                  }
                }}
              />
            )}

            <View>
              <Text className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">
                Description / Reason
              </Text>
              <TextInput
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={user.message}
                onChangeText={(text) => setUser({ ...user, message: text })}
                placeholder="Briefly explain the reason for your request..."
                placeholderTextColor="#CBD5E1"
                className="min-h-[120px] rounded-2xl bg-slate-50 border border-slate-100 px-5 py-5 text-sm font-bold text-slate-900"
              />
            </View>
          </View>
        </View>

        <View className="rounded-[32px] bg-slate-900 p-8 flex-row items-center justify-between mb-8 shadow-xl shadow-slate-900/10">
          <View className="flex-1 pr-4">
             <Text className="text-white font-black text-sm uppercase tracking-widest mb-1">Attention</Text>
             <Text className="text-slate-400 text-[10px] leading-4 font-bold">Manager approval is required. Please double check all details.</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-white/10 items-center justify-center">
            <FontAwesome name="info" size={14} color="white" />
          </View>
        </View>

        <TouchableOpacity
          className={`rounded-[24px] py-5 items-center shadow-2xl ${loading ? "bg-blue-400 shadow-none" : "bg-blue-600 shadow-blue-200"}`}
          onPress={handleSubmit}
          disabled={loading}
        >
          <View className="flex-row items-center gap-3">
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Text className="text-white text-base font-black uppercase tracking-widest">
                  Confirm & Submit
                </Text>
                <FontAwesome name="arrow-right" size={12} color="white" />
              </>
            )}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ApplyLeaves;
