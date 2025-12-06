import {FlexAlignType, StyleSheet} from 'react-native';
import {appColors} from '../../theme/colors';
import {gutters, layout, Theme} from '../../constants';
import {moderateScale, px} from '../../utils';
export const styles = (
  theme?: Theme,
  size?: 'small' | 'medium' | 'large',
  variant?: 'transparent' | 'main' | 'theming',
  alignSelf?: FlexAlignType,
  isDisabled?: boolean,
) =>
  StyleSheet.create({
    container: {
      backgroundColor:
        variant === 'main'
          ? appColors.primary
          : variant === 'transparent'
          ? 'transparent'
          : theme?.cardBackground,
      borderRadius: size === 'large' ? moderateScale(25) : moderateScale(10),
      ...layout.row,
      ...layout.allCenter,
      ...gutters.gap_8,
      alignSelf: alignSelf,
      paddingVertical:
        variant === 'transparent'
          ? 0
          : size === 'small'
          ? px(4)
          : size === 'medium'
          ? px(6)
          : px(14),
      paddingHorizontal:
        variant === 'transparent' ? 0 : size === 'large' ? px(18) : px(12),
      opacity: isDisabled ? 0.5 : 1,
    },
    text: {
      color: variant === 'main' ? appColors.white : theme?.primaryText,
    },
  });

export default styles;
