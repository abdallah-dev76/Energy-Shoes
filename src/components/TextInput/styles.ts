import {StyleSheet} from 'react-native';
import {gutters, layout, Theme} from '../../constants';
import {moderateScale, px, pxH} from '../../utils';
import {appColors} from '../../theme/colors';

export const styles = (
  theme: Theme,
  backgroundColor?: string,
  noBorder?: boolean,
) =>
  StyleSheet.create({
    container: {
      ...gutters.gap_12,
    },
    textInputAndErr: {...gutters.gap_8},
    searchIconContainer: {...layout.selfCenter, ...gutters.me_12},
    textInputContainer: {
      backgroundColor: backgroundColor ?? 'transparent',
      ...gutters.px_12,
      ...gutters.radius_12,
      ...layout.row,
      borderWidth: noBorder ? 0 : px(2),
      borderRadius: px(8),
      borderColor: appColors.gray500,
    },
    textInput: {
      fontSize: moderateScale(16),
      color: theme.primaryText,
      ...layout.flex_1,
      paddingVertical: pxH(14),
    },
  });

export default styles;
