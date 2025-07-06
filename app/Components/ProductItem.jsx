import React from 'react';
import { View, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ProductItem = ({ data }) => {
  const {
    image,
    title,
    description,
    price,
    originalPrice,
    discount,
    rating,
    ratingCount
  } = data;

  return (
    <View className="bg-white rounded-xl p-2 mx-2 w-56">
      <Image
        source={{ uri: image }}
        className="w-full h-36 rounded-lg"
        resizeMode="cover"
      />

      <Text className="text-base font-semibold mt-2">{title}</Text>
      <Text className="text-xs text-gray-500 mt-1">{description}</Text>

      <View className="flex-row items-center mt-2">
        <Text className="text-black font-bold text-base">₹{price}</Text>
        <Text className="text-gray-400 line-through text-sm ml-2">₹{originalPrice}</Text>
        <Text className="text-red-500 text-sm ml-2">{discount}</Text>
      </View>

      <View className="flex-row items-center mt-1">
        {[...Array(5)].map((_, i) => (
          <FontAwesome
            key={i}
            name="star"
            size={14}
            color={i < rating ? "#facc15" : "#e5e7eb"} // yellow-400 / gray-200
          />
        ))}
        <Text className="text-gray-400 text-xs ml-2">{ratingCount}</Text>
      </View>
    </View>
  );
};

export default ProductItem;
