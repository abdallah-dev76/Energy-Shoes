import { StyleSheet } from 'react-native';
import { gutters, layout, Theme } from '../../constants';
import { moderateScale, px, pxH } from '../../utils';

export const styles = (
  theme: Theme,
  backgroundColor?: string,
  noBorder?: boolean,
) =>
  StyleSheet.create({
    container: {
      ...gutters.gap_12,
    },
    textInputAndErr: { ...gutters.gap_8 },
    searchIconContainer: { ...layout.selfCenter, ...gutters.me_12 ,...gutters.ms_2},
    textInputContainer: {
      backgroundColor: backgroundColor ?? 'transparent',
      ...gutters.px_12,
      ...gutters.radius_12,
      ...layout.row,
      borderWidth: noBorder ? 0 : px(1),
      borderRadius: px(8),
      borderColor:  theme.infoBorder,
    },
    textInput: {
      fontSize: moderateScale(16),
      color: theme.primaryText,
      ...layout.flex_1,
      paddingVertical: pxH(14),
    },
    label: { ...layout.row, ...layout.itemsCenter, ...gutters.gap_4 },
  });

export default styles;
