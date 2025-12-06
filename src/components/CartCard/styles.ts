import {StyleSheet} from 'react-native';
import {gutters, layout} from '../../constants';
export default StyleSheet.create({
  container: {
    ...layout.row,
    ...gutters.gap_16,
    ...gutters.px_24,
  },
  imageContainer: {
    ...gutters.radius_16,
    flex: 0.5,
    aspectRatio: 1 / 1,
    ...layout.overflowHidden,
  },
  image: {
    ...layout.fullHeight,
    ...layout.fullWidth,
  },
  gapSpace: {...gutters.gapH_8},
  rightContainer: {
    ...layout.justifyBetween,
    ...layout.flex_1,
  },
  rowContainer: {
    ...layout.row,
    ...layout.justifyBetween,
    ...gutters.gap_12,
  },
  textWidth: {...layout.flex_1},
});
