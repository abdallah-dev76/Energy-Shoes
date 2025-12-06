import {StyleSheet} from 'react-native';
import {appColors} from '../../theme/colors';
import {moderateScale, px} from '../../utils';
import {layout} from '../../constants';

export const styles = (
  size?: 'small' | 'medium' | 'large',
  isSquare?: boolean,
) =>
  StyleSheet.create({
    container: {
      width: size === 'small' ? px(40) : size === 'medium' ? px(60) : px(100),
      aspectRatio: 1 / 1,
      borderRadius: isSquare ? moderateScale(12) : moderateScale(200),
      ...layout.overflowHidden,
      ...layout.allCenter,
      backgroundColor: appColors.white,
    },
    image: {...layout.fullHeight, ...layout.fullWidth},
  });

export default styles;
