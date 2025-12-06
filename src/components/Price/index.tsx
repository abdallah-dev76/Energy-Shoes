import {View} from 'react-native';
import React from 'react';
import Text from '../Text';
import {appColors} from '../../theme/colors';
import styles from './styles';

interface PriceProps {
  price: number;
  priceSize?: number;
}
const Price = ({price, priceSize = 16}: PriceProps) => {
  return (
    <View style={styles.priceContainer}>
      <Text
        fontSize={priceSize}
        color={appColors.primary}
        fontWeight="semiBold">
        $
      </Text>
      <Text fontSize={priceSize} fontWeight="semiBold">
        {price}
      </Text>
    </View>
  );
};

export default React.memo(Price);
