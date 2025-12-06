import {StyleSheet} from 'react-native';
import {gutters, layout, Theme} from '../../../../constants';
import {moderateScale, px, pxH} from '../../../../utils';
import {appColors} from '../../../../theme/colors';

export const styles = (theme: Theme, isDarkMode?: boolean) =>
  StyleSheet.create({
    footerContainer: {
      backgroundColor: theme.bottomSheetBackground,
      borderTopLeftRadius: moderateScale(18),
      borderTopRightRadius: moderateScale(18),
      ...gutters.py_24,
      ...gutters.px_24,
      shadowColor: isDarkMode ? 'transparent' : appColors.gray500,
      shadowOffset: {width: 0, height: pxH(4)},
      shadowOpacity: 0.2,
      shadowRadius: moderateScale(6),
      elevation: 10,
      marginBottom: pxH(-18),
    },
    textStyle: {
      ...layout.row,
      ...layout.justifyBetween,
      ...layout.itemsCenter,
      ...gutters.mb_8,
    },
    dashlineContainer: {...layout.overflowHidden},
    dashedLine: {
      borderWidth: px(1),
      borderColor: theme.secondaryText,
      borderStyle: 'dashed',
      ...layout.fullWidth,
      ...gutters.mb_8,
    },
  });

export default styles;
