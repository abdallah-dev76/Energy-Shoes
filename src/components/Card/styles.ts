import {Dimensions, StyleSheet} from 'react-native';
import {gutters, layout, Theme} from '../../constants';
import {moderateScale, px, pxH} from '../../utils';
const {width} = Dimensions.get('window');
export const styles = (
  theme: Theme,
  isFullWidth?: boolean,
  isDarkMode?: boolean,
) =>
  StyleSheet.create({
    container: {
      ...gutters.gapH_12,
      width: isFullWidth ? '100%' : width * 0.4,
      backgroundColor: theme.cardBackground,
      ...gutters.radius_18,
      ...layout.overflowHidden,
      shadowColor: isDarkMode ? 'transparent' : 'rgba(0, 0, 0, 0.25)',
      shadowOffset: {width: 0, height: 4}, // iOS shadow direction
      shadowOpacity: 0.2, // iOS shadow intensity
      shadowRadius: 6, // iOS shadow blur
      // elevation: 5, // Android shadow
    },
    imageContainer: {
      ...layout.fullWidth,
      aspectRatio: 1 / 1,
      ...layout.overflowHidden,
    },
    loveContainer: {
      ...layout.selfEnd,
      ...gutters.p_12,
    },
    rateContainer: {
      ...layout.row,
      ...layout.itemsCenter,
      ...gutters.gap_4,
      ...layout.selfEnd,
      backgroundColor: 'rgba(0,0,0,0.6)',
      ...gutters.px_12,
      borderBottomLeftRadius: moderateScale(18),
    },
    nameAndDescription: {paddingHorizontal: isFullWidth ? px(16) : px(8)},
    productName: {height: pxH(24)},
    cardFooter: {
      ...layout.row,
      ...layout.justifyBetween,
      ...layout.itemsCenter,

      ...gutters.gap_4,
      paddingStart: isFullWidth ? px(16) : px(8),
    },
    addButton: {
      borderTopEndRadius: 0,
      borderTopStartRadius: moderateScale(16),
      borderBottomStartRadius: 0,
      ...gutters.p_12,
    },
  });
export default styles;
