import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const LeaveCard = ({ data }) => {
  const { status, count, color } = data;
  const { width } = Dimensions.get('window');

  // Responsive sizing (2 cards per row with spacing)
  const cardWidth = width * 0.44; // around 44% of total width
  const cardHeight = width * 0.35;

  return (
    <View
      style={{
        width: cardWidth,
        height: cardHeight,
        backgroundColor: `${color}20`,
        borderColor: color,
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#000' }}>
        Leave{'\n'}{status}
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          color,
          alignSelf: 'flex-end',
        }}
      >
        {count}
      </Text>
    </View>
  );
};

export default LeaveCard;
