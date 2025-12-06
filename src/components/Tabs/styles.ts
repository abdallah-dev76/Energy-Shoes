import {StyleSheet} from 'react-native';
import {gutters, layout, Theme} from '../../constants';
import {appColors} from '../../theme/colors';
import {moderateScale, px} from '../../utils';

export const styles = (theme: Theme, variant?: 'categories' | 'sizes') =>
  StyleSheet.create({
    tabsContainer: {
      flexGrow: variant === 'sizes' ? 1 : 0,
      ...gutters.gap_12,
      ...gutters.mb_16,
      ...layout.justifyBetween,
    },
    tabContainer: {
      ...gutters.px_10,
      paddingVertical: variant === 'categories' ? px(2) : px(10),
      borderRadius:
        variant === 'categories' ? moderateScale(24) : moderateScale(100),
    },
    activeTabContainer: {
      backgroundColor: appColors.primary,
      borderWidth: px(1),
      borderColor: appColors.primary,
    },
    inactiveTabColor: {
      backgroundColor: theme.backgroundColor,
      borderWidth: px(1),
      borderColor: appColors.gray500,
    },
  });
export default styles;
