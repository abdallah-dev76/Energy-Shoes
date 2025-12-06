import {Dimensions, StyleSheet} from 'react-native';
import {gutters, layout, Theme} from '../../constants';
import {moderateScale} from '../../utils';
const height = Dimensions.get('window').height;
const styles = (theme: Theme, isDarkMode?: boolean) =>
  StyleSheet.create({
    productsContainer: {
      ...gutters.gap_16,
      ...gutters.mb_24,
      ...gutters.px_24,
    },
    productImage: {
      height: height * 0.3,
    },
    detailsContainer: {
      ...gutters.px_24,
      ...gutters.pt_24,
      ...gutters.gap_24,
    },
    footerContainer: {
      ...layout.row,
      ...gutters.gap_16,
      backgroundColor: theme.tabBarBackgroundColor,
      ...gutters.py_16,
      ...gutters.px_24,
      ...layout.itemsCenter,
      borderTopLeftRadius: moderateScale(18),
      borderTopRightRadius: moderateScale(18),
      shadowColor: isDarkMode ? 'transparent' : 'rgba(0, 0, 0, 0.25)',
      shadowOffset: {width: 0, height: 4}, // iOS shadow direction
      shadowOpacity: 0.2, // iOS shadow intensity
      shadowRadius: 6, // iOS shadow blur
      elevation: 10, // Android shadow
    },
    addToCartButton: {...layout.flex_1},
    tags: {...layout.row, ...gutters.gap_12},
    nameAndRating: {
      ...layout.row,
      ...layout.itemsCenter,
      ...layout.justifyBetween,
      ...gutters.gap_12,
    },
    innerContainer: {...gutters.gapH_12},
    rateContainer: {
      ...layout.row,
      ...layout.itemsCenter,
      ...gutters.gap_2,
    },
  });

export default styles;
