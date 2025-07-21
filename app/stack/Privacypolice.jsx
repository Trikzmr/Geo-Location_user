import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const PrivacyPolicy = () => {
    const router = useRouter();
  return (
    <ScrollView className="bg-white px-6 pt-10">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Pressable  onPress={() => router.replace('/(tabs)/profile')}>
          <Icon name="angle-left" size={24} color="black" />
        </Pressable>
        <Text className="text-xl font-bold text-black">Privacy Policy</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      {/* Last Update */}
      <Text className="text-xs text-gray-400 mb-2">Last update: 05/02/2023</Text>

      {/* Description */}
      <Text className="text-sm text-gray-700 mb-4">
        Please read these privacy policy, carefully before using our app operated by us.
      </Text>

      {/* Section Title */}
      <Text className="text-base font-semibold text-blue-600 mb-2">Privacy Policy</Text>

      {/* Content */}
      <Text className="text-sm text-gray-700 leading-relaxed mb-2">
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
      </Text>
    </ScrollView>
  );
};

export default PrivacyPolicy;
