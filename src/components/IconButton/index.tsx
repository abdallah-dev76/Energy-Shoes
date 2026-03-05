import { Pressable, ViewStyle } from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import styles from './styles';
import { useAppTheme } from '../../theme';
import Icon from '../Icon';
import { moderateScale } from '../../utils';

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
  testID?: string;
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
  testID,
}: IconButtonProps) => {
  const { theme } = useAppTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.85);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
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
        disabled={isDisabled}
        testID={testID}
      >
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
    </Animated.View>
  );
};

export default React.memo(IconButton);
