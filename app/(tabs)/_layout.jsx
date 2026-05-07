import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const tabIcons = {
  index: "home",
  leave: "calendar",
  Holiday: "gift",
  profile: "person",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={tabIcons[route.name] ?? "ellipse"}
            size={size}
            color={color}
          />
        ),
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#64748B",
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="leave" options={{ title: "Leave" }} />
      <Tabs.Screen name="Holiday" options={{ title: "Holiday" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
