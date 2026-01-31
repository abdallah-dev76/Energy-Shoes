//margin and position doesn't work for content container style
import { StyleSheet } from 'react-native';
import { layout, Theme } from '../../constants';
import { isArabic } from '../../localization/i18next';
import { appColors } from '../../theme/colors';

export const styles = (theme: Theme, statusBarBackgroundColor?: string) =>
  StyleSheet.create({
    mainContainer: {
      ...layout.flex_1,
      backgroundColor: statusBarBackgroundColor ?? appColors.primary,
      direction: isArabic ? 'rtl' : 'ltr',
    },
    fixedContainer: {
      ...layout.flex_1,
      backgroundColor: theme.backgroundColor,
    },
    scrollableContainer: {
      ...layout.flexGrow_1,
      backgroundColor: theme.backgroundColor,
    },
  });

export const bottomPadding = (value: number) => ({
  paddingBottom: value,
});


export const scrollMargin = (value: number) => ({
  marginTop: value,
});

export default styles;
