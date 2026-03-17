//it's better to pass the styles to any compoent using useMemo , <Button style={()=>useMemo(()=>memoziedStyles)}
//with the usage of React.memo(Button)
import { FlexAlignType, Pressable, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import styles from './styles';
import Text from '../Text';
import { useAppTheme } from '../../theme';
import Icon from '../Icon';
import { appColors } from '../../theme/colors';
import { moderateScale } from '../../utils';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  onPress: () => void;
  title?: string;
  iconName?: string;
  isDisabled?: boolean;
  variant?: 'transparent' | 'main' | 'theming';
  style?: ViewStyle;
  alignSelf?: FlexAlignType;
  testID?: string;
}
const Button = ({
  size = 'medium',
  title,
  iconName,
  onPress,
  isDisabled,
  variant = 'main',
  style,
  alignSelf = 'flex-start',
  testID,
}: ButtonProps) => {
  const { theme } = useAppTheme();
  const scale = useSharedValue(1);
  const isNotSmall = size === 'medium' ? 14 : 16;
  const dynamicSize = useMemo(
    () => (size === 'small' ? 12 : isNotSmall),
    [isNotSmall, size],
  );
  const memoizedStyles = useMemo(
    () => styles(theme, size, variant, alignSelf, isDisabled),
    [theme, size, variant, alignSelf, isDisabled],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconVariant = variant === 'main' ? appColors.white : theme?.primaryText;
  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.95);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={onPress}
        style={[memoizedStyles.container, style]}
        disabled={isDisabled}
        testID={testID}
      >
        {title && (
          <Text
            fontWeight="semiBold"
            fontSize={dynamicSize}
            style={memoizedStyles.text}
          >
            {title}
          </Text>
        )}
        {iconName && (
          <Icon
            name={iconName}
            size={moderateScale(dynamicSize)}
            color={iconVariant}
          />
        )}
      </Pressable>
    </Animated.View>
  );
};

export default React.memo(Button);
