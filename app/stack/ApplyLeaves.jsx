import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";

const ApplyLeavs = () => {
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
    try {
      const response = await fetch(
        "https://geoserver-ph8p.onrender.com/api/addLeaveRequest",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Leave request submitted successfully");
      } else {
        Alert.alert("Failed", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("API call failed:", error.message);
      Alert.alert("Network Error", "Could not connect to server.");
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
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 40,
        }}
      >
        {/* Title */}
        <Text className="text-base text-blue-500 mb-1">Title</Text>
        <TextInput
          value={user.title}
          onChangeText={(text) => setUser({ ...user, title: text })}
          className="border border-blue-300 rounded-xl px-4 py-3 mb-4 text-lg text-black"
        />

        {/* Leave Type */}
        <Text className="text-base text-blue-500 mb-1">Leave Type</Text>
        <TextInput
          value={user.leaveType}
          onChangeText={(text) => setUser({ ...user, leaveType: text })}
          className="border border-blue-300 rounded-xl px-4 py-3 mb-4 text-lg text-black"
        />

        {/* Contact Number */}
        <Text className="text-base text-blue-500 mb-1">Contact Number</Text>
        <TextInput
          keyboardType="phone-pad"
          value={user.number}
          onChangeText={(text) => setUser({ ...user, number: text })}
          className="border border-blue-300 rounded-xl px-4 py-3 mb-4 text-lg text-black"
        />

        {/* Start Date */}
        <Text className="text-base text-blue-500 mb-1">Start Date</Text>
        <TouchableOpacity
          className="border border-blue-300 rounded-xl px-4 py-3 mb-4 flex-row justify-between items-center"
          onPress={() => setShowStartPicker(true)}
        >
          <Text className="text-lg text-black">
            {user.startingDate || "Select start date"}
          </Text>
          <Icon name="calendar" size={20} color="#4B5563" />
        </TouchableOpacity>

        {showStartPicker && (
          <DateTimePicker
            mode="date"
            display="default"
            value={user.startingDate ? new Date(user.startingDate) : new Date()} // defaults to today
            minimumDate={new Date()} // prevents selecting past dates
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

        {/* End Date */}
        <Text className="text-base text-blue-500 mb-1">End Date</Text>
        <TouchableOpacity
          className="border border-blue-300 rounded-xl px-4 py-3 mb-4 flex-row justify-between items-center"
          onPress={() => setShowEndPicker(true)}
        >
          <Text className="text-lg text-black">
            {user.endingDate || "Select end date"}
          </Text>
          <Icon name="calendar" size={20} color="#4B5563" />
        </TouchableOpacity>

        {showEndPicker && (
          <DateTimePicker
            mode="date"
            display="default"
            value={user.endingDate ? new Date(user.endingDate) : new Date()} // defaults to today
            minimumDate={new Date()} // prevents selecting past dates
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

        {/* Reason for Leave */}
        <Text className="text-base text-blue-500 mb-1">Reason for Leave</Text>
        <TextInput
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={user.message}
          onChangeText={(text) => setUser({ ...user, message: text })}
          className="border border-blue-300 rounded-xl px-4 py-3 mb-6 text-lg text-black"
        />

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-blue-600 rounded-xl py-4 items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-semibold">Apply Leave</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ApplyLeavs;
