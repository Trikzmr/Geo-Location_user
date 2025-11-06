import { Stack, useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StackLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        header: ({ route, options }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f9f9ff",
              paddingHorizontal: 16,
              paddingVertical: 12,
              elevation: 4,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 3,
              paddingTop: 40,
            }}
          >
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginRight: 12, padding: 6 }}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            {/* Dynamic Title */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#000",
              }}
            >
              {options.title ?? route.name}
            </Text>
          </View>
        ),
      }}
    />
  );
}
