import { StyleSheet } from 'react-native';
import { gutters } from '../../../../constants';

export const styles = () =>
  StyleSheet.create({
    container: {
      ...gutters.px_24,
      ...gutters.gap_24,
    },
  });
