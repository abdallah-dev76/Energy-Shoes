import {StyleSheet} from 'react-native';
import {gutters, layout, Theme} from '../../constants';
import {px} from '../../utils';
export const styles = (theme: Theme, backgroundColor?: string) =>
  StyleSheet.create({
    container: {
      ...layout.row,
      ...layout.justifyBetween,
      ...layout.itemsCenter,
      ...gutters.p_24,
      backgroundColor: backgroundColor ?? theme.backgroundColor,
    },
    actionContainer: {
      width: undefined,
    },
    placeholderContainer: {
      width: px(36),
    },
  });

export default styles;
