import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import FeaturedItem from './FeaturedItem';

const beautyCategories = [
  { title: "Makeup", icon: "paint-brush" },
  { title: "Skincare", icon: "spa" },
  { title: "Haircare", icon: "cut" },
  { title: "Nail Art", icon: "hand-sparkles" },
  { title: "Perfume", icon: "spray-can" },
  { title: "Beauty Tools", icon: "tools" },
  { title: "Lipsticks", icon: "kiss-beam" },
  { title: "Salon", icon: "store" },
];

const Featured = () => {
  return (
    <>
      <View className="flex-row items-center justify-between px-4 py-2">
        <Text className='text-[18px] font-semibold leading-[24px]'>Featured</Text>
        <Text className='text-[14px] text-[#F83758] font-semibold leading-[20px]'>See All</Text>
      </View> 
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-2 mt-[16px]">
        {beautyCategories.map((item, index) => (
          <View key={index} className="mr-4">
            <FeaturedItem data={item} />
          </View>
        ))}
      </ScrollView>
    </>
    
  );
};

export default Featured;
