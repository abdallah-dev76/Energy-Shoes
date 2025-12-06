import {StyleSheet} from 'react-native';
import {gutters, layout, Theme} from '../../constants';
import {appColors} from '../../theme/colors';

export const styles = (theme: Theme, screenName?: string) =>
  StyleSheet.create({
    container: {
      ...layout.justifyBetween,
      ...layout.itemsCenter,
      ...layout.row,
      ...gutters.py_16,
      borderBottomWidth: screenName === 'authStack' ? 0 : 1,
      borderColor: appColors.gray100,
    },
    rowContainer: {
      ...layout.row,
      ...layout.itemsCenter,
      ...gutters.gap_12,
    },
    iconContainer: {
      backgroundColor: appColors.secondary,
      borderRadius: 100,
      ...layout.allCenter,
      ...gutters.p_8,
    },
  });

export default styles;
