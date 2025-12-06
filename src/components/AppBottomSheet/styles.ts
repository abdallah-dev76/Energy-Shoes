import {StyleSheet} from 'react-native';
import {gutters, layout, Theme} from '../../constants';
import {px} from '../../utils';
import {appColors} from '../../theme/colors';

export const styles = (theme?: Theme) =>
  StyleSheet.create({
    container: {
      ...gutters.py_8,
      ...gutters.px_24,
      ...gutters.pb_16,
      ...gutters.gapH_16,
      backgroundColor: theme?.bottomSheetBackground,
    },
    indicator: {backgroundColor: appColors.gray100},
    header: {
      ...layout.row,
      ...layout.justifyBetween,
      ...layout.itemsCenter,
      ...gutters.mb_24,
    },
    placeholder: {width: px(18)},
  });
