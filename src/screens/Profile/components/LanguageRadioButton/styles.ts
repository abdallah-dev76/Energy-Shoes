import { StyleSheet } from 'react-native';
import { px, pxH } from '../../../../utils';
import { gutters, layout, Theme } from '../../../../constants';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    optionStyle: {
      width: px(16),
      height: pxH(16),
      borderRadius: px(8),
      outlineOffset: px(2),
      outlineWidth: px(1.5),
      outlineColor: theme.primaryText,
    },
    optionContainer: {
      ...layout.row,
      ...layout.itemsCenter,
      ...gutters.gap_16,
    },
    flag: {
      width: px(16),
      aspectRatio: 1,
    },
    valueLanguage: {
      ...layout.row,
      ...layout.itemsCenter,
      ...gutters.gap_8,
    },
  });
