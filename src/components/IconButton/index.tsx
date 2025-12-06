import {Pressable, ViewStyle} from 'react-native';
import React from 'react';
import styles from './styles';
import {useAppTheme} from '../../theme';
import Icon from '../Icon';
import {moderateScale} from '../../utils';

interface IconButtonProps {
  onPress: () => void;
  iconName: string;
  iconSize?: 'large' | 'intermediate' | 'medium' | 'small';
  isDisabled?: boolean;
  isBorder?: boolean;
  isRounded?: boolean;
  backgroundColor?: string;
  iconColor?: string;
  style?: ViewStyle;
}
const IconButton = ({
  iconName,
  iconSize = 'medium',
  onPress,
  isDisabled,
  isBorder,
  isRounded,
  backgroundColor,
  iconColor,
  style,
}: IconButtonProps) => {
  const {theme} = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles(
          theme,
          isBorder,
          isRounded,
          backgroundColor,
          iconSize,
          isDisabled,
        ).container,
        style,
      ]}
      disabled={isDisabled}>
      <Icon
        name={iconName}
        size={
          iconSize === 'large'
            ? moderateScale(24)
            : iconSize === 'intermediate'
            ? moderateScale(18)
            : moderateScale(16)
        }
        color={iconColor ?? theme?.primaryText}
      />
    </Pressable>
  );
};

export default React.memo(IconButton);
