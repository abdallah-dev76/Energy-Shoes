import {StyleSheet} from 'react-native';
import {gutters} from '../../constants';

export default StyleSheet.create({
  screenContainer: {...gutters.gapH_24, ...gutters.pb_24},
  productsContainer: {
    ...gutters.gap_16,
    ...gutters.px_24,
  },
  tabsWrapper: {...gutters.px_24},
  brands: {...gutters.gap_16, ...gutters.px_24},
});
