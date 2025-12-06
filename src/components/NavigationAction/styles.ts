import {StyleSheet} from 'react-native';
import {px, pxH} from '../../utils';
import {gutters, layout} from '../../constants';

export const styles = StyleSheet.create({
  logo: {
    width: px(65),
    height: pxH(50),
  },
  welcome: {...layout.row, ...gutters.gap_12, ...layout.itemsCenter},
  extraMargin: {marginStart: px(15)},
});
export default styles;
