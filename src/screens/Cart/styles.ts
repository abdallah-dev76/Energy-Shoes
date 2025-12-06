import {StyleSheet} from 'react-native';
import {gutters, layout} from '../../constants';

export default StyleSheet.create({
  cartContainer: {
    ...gutters.gapH_16,
    ...gutters.pb_24,
    ...layout.flexGrow_1,
  },
});
