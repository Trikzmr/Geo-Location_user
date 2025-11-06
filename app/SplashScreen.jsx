import React from "react";
import { View, Text, Image, SafeAreaView, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {

  return (
    

    <SafeAreaView className="flex-1 bg-white">
      {/* Top Background Pattern */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1598514983223-cbfa5a30f7d4?auto=format&fit=crop&w=200&q=80",
        }}
        resizeMode="contain"
        className="absolute top-0 left-0 w-52 h-52"
      />

      {/* Logo Section */}
      <View className="flex-1 items-center justify-center">
        <View className="flex-row items-center">
          <Text className="text-4xl font-bold text-neutral-900">Geo</Text>
          <Text className="text-4xl font-bold text-orange-500">Cence</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
