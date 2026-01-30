//margin and position doesn't work for content container style
import { StyleSheet } from 'react-native';
import { layout, Theme } from '../../constants';
import { isArabic } from '../../localization/i18next';

export const styles = (theme: Theme, statusBarBackgroundColor?: string) =>
  StyleSheet.create({
    mainContainer: {
      ...layout.flex_1,
      backgroundColor: statusBarBackgroundColor ?? theme.backgroundColor,
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

export const headerMargin = (value: number) => ({
  marginTop: value,
});

export const scrollMargin = (value: number) => ({
  marginTop: value,
});

export const footerPadding = (value: number) => ({
  paddingBottom: value,
});

export default styles;
