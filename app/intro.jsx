import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Fast Delivery",
    text: "Get your favorite meals delivered in minutes!",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  },
  {
    title: "Tasty Dishes",
    text: "Order from top restaurants near you.",
    image: "https://cdn-icons-png.flaticon.com/512/857/857681.png",
  },
  {
    title: "Easy Payment",
    text: "Pay securely with multiple payment options.",
    image: "https://cdn-icons-png.flaticon.com/512/2830/2830284.png",
  },
  {
    title: "Track Orders",
    text: "Know exactly where your food is — live tracking.",
    image: "https://cdn-icons-png.flaticon.com/512/2942/2942076.png",
  },
];

export default function Intro() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Check login status when screen loads
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          router.replace("/(tabs)");
        }
      } catch (err) {
        console.log("Login check error:", err);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      scrollRef.current.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
    } else {
      // 🔹 If not logged in, go to LoginPage instead of tabs
      const token = await AsyncStorage.getItem("token");
      if (!token) router.replace("stack/LoginPage");
      else router.replace("/(tabs)");
    }
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleScrollEnd = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const progress = scrollX.interpolate({
    inputRange: [0, (slides.length - 1) * width],
    outputRange: ["0deg", "360deg"],
  });

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-orange-50">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-orange-50">
      <Animated.ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
      >
        {slides.map((item, index) => (
          <View key={index} style={{ width }} className="items-center justify-center p-5">
            <Image source={{ uri: item.image }} className="w-56 h-56 mb-8" resizeMode="contain" />
            <Text className="text-2xl font-bold text-orange-500 mb-2">{item.title}</Text>
            <Text className="text-base text-gray-600 text-center px-8">{item.text}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      {/* Circular Progress Indicator */}
      <View className="absolute top-20 right-8 items-center justify-center">
        <View className="w-16 h-16 rounded-full border-4 border-orange-200 items-center justify-center">
          <Animated.View
            className="absolute w-16 h-16 rounded-full border-4 border-orange-500"
            style={{
              transform: [{ rotate: progress }],
              borderRightColor: "transparent",
              borderBottomColor: "transparent",
            }}
          />
        </View>
        <Text className="absolute text-orange-500 font-bold text-base">
          {currentIndex + 1}/{slides.length}
        </Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        className="bg-orange-500 py-4 px-10 rounded-full mb-12 shadow-lg"
        onPress={handleNext}
      >
        <Text className="text-white text-lg font-semibold">
          {currentIndex === slides.length - 1 ? "Start Ordering 🍔" : "Next →"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
