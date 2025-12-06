import {appColors} from '../../theme/colors';
import React from 'react';
import Icon from '../Icon';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from '../../utils';
import {layout} from '../../constants';
export const StarRating = ({
  rating = 1,
  size = moderateScale(16),
  color = appColors.yellow,
}) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Icon key={i} name="star-fill" size={size} color={color} />);
    } else if (rating >= i - 0.5) {
      stars.push(
        <Icon
          key={i}
          name="half-star-svgrepo-com"
          size={size * 0.91}
          color={color}
        />, //half-star here
      );
    } else {
      stars.push(<Icon key={i} name="star" size={size} color={color} />); //gray star here
    }
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {...layout.row, ...layout.itemsCenter},
});

export default StarRating;
