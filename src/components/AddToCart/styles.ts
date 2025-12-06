import {StyleSheet} from 'react-native';
import {px, pxH} from '../../utils';
import {layout} from '../../constants';

export default StyleSheet.create({
  container: {gap: pxH(24)},
  row: {...layout.row, gap: px(16)},
  image: {...layout.flex_1, aspectRatio: 1 / 1},
  details: {...layout.flex_1, gap: pxH(16)},
});
