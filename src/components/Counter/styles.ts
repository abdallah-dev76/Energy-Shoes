import {StyleSheet} from 'react-native';
import {layout} from '../../constants';
import {px} from '../../utils';

export const styles = StyleSheet.create({
  counterConainer: {
    ...layout.row,
    ...layout.itemsCenter,
  },
  counterText: {width: px(40)},
});

export default styles;
