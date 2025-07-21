import React from 'react';
import { FlatList, View } from 'react-native';
import ProductItem from './ProductItem'; // import card component
const products = [
  {
    image: 'https://images.pexels.com/photos/6311390/pexels-photo-6311390.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Women Printed Kurta',
    description: 'Elegant ethnic wear with beautiful patterns.',
    price: 1500,
    originalPrice: 2499,
    discount: '40% Off',
    rating: 4,
    ratingCount: 56890
  },
  {
    image: 'https://images.pexels.com/photos/6311374/pexels-photo-6311374.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Floral Maxi Dress',
    description: 'Flowy dress perfect for summer outings.',
    price: 1200,
    originalPrice: 2000,
    discount: '40% Off',
    rating: 5,
    ratingCount: 41234
  },
  {
    image: 'https://images.pexels.com/photos/1825178/pexels-photo-1825178.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Casual T-Shirt',
    description: 'Soft cotton tee with premium fabric.',
    price: 499,
    originalPrice: 899,
    discount: '45% Off',
    rating: 3,
    ratingCount: 12000
  },
  {
    image: 'https://images.pexels.com/photos/1839906/pexels-photo-1839906.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Denim Jacket',
    description: 'Stylish slim-fit denim for all seasons.',
    price: 1999,
    originalPrice: 2799,
    discount: '30% Off',
    rating: 4,
    ratingCount: 24345
  },
  {
    image: 'https://images.pexels.com/photos/5704843/pexels-photo-5704843.jpeg?auto=compress&cs=tinysrgb&w=400',
    title: 'Ethnic Kurti Set',
    description: 'Traditional design with a modern twist.',
    price: 1799,
    originalPrice: 2899,
    discount: '38% Off',
    rating: 5,
    ratingCount: 38120
  }
];



const Products = () => {
  return (
    <View className="px-4 py-2">
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ProductItem data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        className='mt-4 gap-4'
      />
    </View>
  );
};

export default Products;
