import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
// We usually use 375 because it corresponds to the logical screen width (dp)
// of a common and widely used device — typically
// iPhone 11, iPhone X, or iPhone 6/7/8 in portrait mode.
// we get the ratio between the most common used screen width
// and the users's screen width to scale the font or gutters and so on
const guidelineBaseWidth = 375; // Base width (iPhone 11)
const guidelineBaseHeight = 812; // Base height (iPhone 11)

/**
for width, marginStart, paddingHorizontal, marginLeft
 */
export const px = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

/**
for height, marginTop, paddingVertical, marginBottom
 */
export const pxH = (size: number) =>
  (SCREEN_HEIGHT / guidelineBaseHeight) * size;

/**
for fontSize.
 */
export const moderateScale = (size: number, factor = 0.5) =>
  size + (px(size) - size) * factor;
