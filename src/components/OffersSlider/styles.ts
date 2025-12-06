import {Dimensions, ImageStyle, StyleSheet} from 'react-native';
import {gutters, layout} from '../../constants';
import {pxH} from '../../utils';
export default StyleSheet.create({
  mainContainer: {...gutters.gapH_16},
  image: {
    ...layout.fullHeight,
    ...layout.fullWidth,
    ...gutters.radius_12,
  } as ImageStyle,
  imageContainer: {
    paddingHorizontal: 24,
    width: Dimensions.get('window').width,
    height: pxH(200),
  },
  dotsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#aaa',
    borderRadius: 50,
  },
});
