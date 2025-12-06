import {StyleSheet} from 'react-native';
import {gutters, layout, Theme} from '../../constants';
import {appColors} from '../../theme/colors';

export const styles = (_theme: Theme) =>
  StyleSheet.create({
    container: {...layout.row, ...gutters.gap_24},
    optionContainer: {...gutters.gap_8, ...layout.allCenter},
    icon: {
      ...gutters.p_12,
      borderRadius: 100,
      backgroundColor: appColors.primary,
    },
  });

export default styles;
