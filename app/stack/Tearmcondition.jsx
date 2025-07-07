import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const TermsAndConditions = () => {
    const router = useRouter();
  return (
    <ScrollView className="bg-white px-6 pt-10">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Pressable  onPress={() => router.replace('/(tabs)/profile')}>
          <Icon name="angle-left" size={28} color="black" />
        </Pressable>
        <Text className="text-2xl font-bold text-black">Terms & Conditions</Text>
        <View style={{ width: 28 }} /> {/* Spacer for symmetry */}
      </View>

      {/* Last Update */}
      <Text className="text-base text-gray-400 mb-3">Last update: 05/02/2023</Text>

      {/* Intro Description */}
      <Text className="text-lg text-gray-700 mb-5">
        Please read these terms of service, carefully before using our app operated by us.
      </Text>

      {/* Section Title */}
      <Text className="text-xl font-semibold text-blue-600 mb-3">Conditions of Uses</Text>

      {/* Paragraphs */}
      <Text className="text-lg text-gray-700 leading-relaxed mb-3">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
        as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
        and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
      </Text>
    </ScrollView>
  );
};

export default TermsAndConditions;
