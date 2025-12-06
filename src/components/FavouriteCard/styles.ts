import {StyleSheet} from 'react-native';
import {gutters, layout, Theme} from '../../constants';
export const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      ...layout.row,
      ...gutters.p_16,
      ...gutters.radius_16,
      ...gutters.gap_16,
      backgroundColor: theme.cardBackground,
    },
    image: {
      ...layout.flex_1,
      ...gutters.radius_16,
      ...gutters.p_8,
      ...layout.overflowHidden,
      ...layout.itemsEnd,
    },
    rightContainer: {...gutters.gapH_8, ...layout.flex_1},
    rateContainer: {...layout.row, ...gutters.gap_8, ...layout.itemsCenter},
    buttonContainer: {...layout.selfEnd},
  });
export default styles;
