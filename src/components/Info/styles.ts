import {StyleSheet} from 'react-native';
import {gutters, layout} from '../../constants';
import {px} from '../../utils';
import {appColors} from '../../theme/colors';

export const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: appColors.secondary,
      borderWidth: px(1),
      borderColor: appColors.primary,
      ...gutters.radius_8,
      ...layout.selfStart,
      ...gutters.px_8,
    },
  });
export default styles;
