import {StyleSheet} from 'react-native';
import {gutters, layout, Theme} from '../../constants';
import {appColors} from '../../theme/colors';
import {px} from '../../utils';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: appColors.primary,
      ...layout.flex_1,
      paddingTop: '25%',
    },
    container: {
      ...layout.flex_1,
      backgroundColor: theme.backgroundColor,
      borderTopRightRadius: px(100),
      ...gutters.pt_32,
      ...gutters.px_24,
      ...gutters.gap_24,
    },
  });
