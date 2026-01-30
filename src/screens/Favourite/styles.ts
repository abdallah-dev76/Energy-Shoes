import {StyleSheet} from 'react-native';
import {px, pxH} from '../../utils';

const styles = () =>
  StyleSheet.create({
    contentContainer: {
      gap: pxH(16),
      paddingHorizontal: px(24),
      flexGrow: 1,
      paddingBottom: pxH(24),
    },
  });

export default styles;
