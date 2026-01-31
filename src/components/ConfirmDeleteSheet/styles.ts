import { StyleSheet } from 'react-native';
import { px, pxH } from '../../utils';
import { appColors } from '../../theme/colors';
import { Theme } from '../../constants';
import { isArabic } from '../../localization/i18next';

export const styles = (theme?: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme?.bottomSheetBackground,
      borderTopLeftRadius: px(20),
      borderTopRightRadius: px(20),
    },
    indicator: {
      backgroundColor: theme?.secondaryText,
      width: px(40),
      height: pxH(4),
    },

    message: {
      textAlign: isArabic ? 'right' : 'left',
      marginBottom: pxH(24),
      lineHeight: pxH(20),
    },
    buttonsContainer: {
      gap: pxH(12),
    },
    confirmButton: {
      width: '100%',
      backgroundColor: appColors.red,
    },
    cancelButton: {
      width: '100%',
      borderWidth: px(1),
      borderColor: 'transparent',
    },
  });
