import { StyleSheet } from 'react-native';
import { Theme } from '../../constants';
import { appColors } from '../../theme/colors';
import { px, pxH } from '../../utils';

export const styles = (theme: Theme, variant?: 'categories' | 'sizes') =>
  StyleSheet.create({
    tabsContainer: {
      flexGrow: variant === 'sizes' ? 1 : 0,
      gap: px(12),
      marginBottom: pxH(16),
      justifyContent: 'space-between',
    },
    tabContainer: {
      paddingHorizontal: px(10),
      paddingVertical: variant === 'categories' ? pxH(2) : pxH(10),
      borderRadius: variant === 'categories' ? px(24) : px(100),
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
