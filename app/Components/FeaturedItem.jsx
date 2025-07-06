import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const FeaturedItem = ({ data }) => {
  const { title, icon } = data;

  return (
    <View className="w-[64px] h-[90px] items-center justify-between">
      {/* Icon Container */}
      <View className="w-[56px] h-[56px] rounded-full items-center justify-center border-2 border-[#F83758] ">
        <FontAwesome5 name={icon} size={24} color="#F83758" />
      </View>

      {/* Fixed height for Text */}
      <View className="h-[28px] justify-center">
        <Text
          className="text-black text-xs text-center leading-[14px]"
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export default FeaturedItem;
