import {StyleSheet} from 'react-native';
import {gutters} from '../../../../constants';
import {pxH} from '../../../../utils';

export default StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    ...gutters.gapH_32,
  },
  emptyListImage: {height: pxH(150)},
  emptyTextContainer: {...gutters.gapH_10, ...gutters.mt_16},
  productsContainer: {
    ...gutters.gap_16,
    ...gutters.p_4,
    ...gutters.px_24,
  },
});
