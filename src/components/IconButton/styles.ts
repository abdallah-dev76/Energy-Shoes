import {StyleSheet} from 'react-native';
import {layout, Theme} from '../../constants';
import {moderateScale, px} from '../../utils';
import {appColors} from '../../theme/colors';

export const styles = (
  theme: Theme,
  isBorder?: boolean,
  isRounded?: boolean,
  backgroundColor?: string,
  iconSize?: string,
  isDisabled?: boolean,
) =>
  StyleSheet.create({
    container: {
      ...layout.allCenter,

      padding:
        isBorder || backgroundColor
          ? iconSize === 'medium'
            ? px(10)
            : iconSize === 'intermediate'
            ? px(12)
            : px(6)
          : px(0),
      borderWidth: isBorder ? px(2) : 0,
      borderColor: appColors.primary,
      borderRadius: isRounded ? moderateScale(100) : moderateScale(12),
      backgroundColor,
      opacity: isDisabled ? 0.5 : 1,
    },
  });

export default styles;
