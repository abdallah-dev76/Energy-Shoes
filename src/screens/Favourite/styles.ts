import {StyleSheet} from 'react-native';
import {gutters, layout} from '../../constants';

const styles = () =>
  StyleSheet.create({
    contentContainer: {
      ...gutters.gapH_16,
      ...gutters.px_24,
      ...layout.flexGrow_1,
      ...gutters.pb_24,
    },
  });

export default styles;
