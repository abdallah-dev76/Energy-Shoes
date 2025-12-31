import React from 'react';
import Svg, { Text, Defs, LinearGradient, Stop } from 'react-native-svg';

const EnergyShoesLogo = () => {
  return (
    <Svg width={320} height={120} viewBox="0 0 320 120">
      <Defs>
        <LinearGradient
          id="energyGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <Stop offset="0%" stopColor="#8FC1F0" />
          <Stop offset="50%" stopColor="#5B9EE1" />
          <Stop offset="100%" stopColor="#2F6FB6" />
        </LinearGradient>
      </Defs>

      <Text
        x="160"
        y="80"
        textAnchor="middle"
        fontSize="56"
        fontFamily="Bebas Neue" // sporty, clean, strong
        fill="url(#energyGradient)"
      >
        Energy Shoes
      </Text>
    </Svg>
  );
};

export default EnergyShoesLogo;
