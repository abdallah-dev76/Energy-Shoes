import {StyleSheet} from 'react-native';
import {gutters, layout, Theme} from '../../constants';
export const styles = (theme: Theme, backgroundColor?: string) =>
  StyleSheet.create({
    container: {
      ...layout.row,
      ...layout.justifyBetween,
      ...layout.itemsCenter,
      ...gutters.p_24,
      backgroundColor: backgroundColor ?? theme.backgroundColor,
    },
  });

export default styles;
