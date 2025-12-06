import {StyleSheet} from 'react-native';
import {gutters, layout} from '../../constants';

export default StyleSheet.create({
  priceContainer: {
    ...layout.row,
    ...gutters.gap_4,
  },
});
