import {StyleSheet} from 'react-native';
import {px} from '../../utils';
import {appColors} from '../../theme/colors';

export const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: appColors.secondary,
      borderWidth: px(1),
      borderColor: appColors.primary,
      borderRadius: px(8),
      alignSelf: 'flex-start',
      paddingHorizontal: px(8),
    },
  });
export default styles;
