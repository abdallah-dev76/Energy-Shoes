//it's better to pass the styles to any compoent using useMemo , <Button style={()=>useMemo(()=>memoziedStyles)}
//with the usage of React.memo(Button)
import {FlexAlignType, Pressable, ViewStyle} from 'react-native';
import React, {useMemo} from 'react';
import styles from './styles';
import Text from '../Text';
import {useAppTheme} from '../../theme';
import Icon from '../Icon';
import {appColors} from '../../theme/colors';
import {moderateScale} from '../../utils';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  onPress: () => void;
  title?: string;
  iconName?: string;
  isDisabled?: boolean;
  isBorder?: boolean;
  variant?: 'transparent' | 'main' | 'theming';
  style?: ViewStyle;
  alignSelf?: FlexAlignType;
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
}: ButtonProps) => {
  const {theme} = useAppTheme();
  const dynamicSize = useMemo(
    () => (size === 'small' ? 12 : size === 'medium' ? 14 : 16),
    [size],
  );
  const memoizedStyles = useMemo(
    () => styles(theme, size, variant, alignSelf, isDisabled),
    [theme, size, variant, alignSelf, isDisabled],
  );
  const iconVariant = variant === 'main' ? appColors.white : theme?.primaryText;
  return (
    <Pressable
      onPress={onPress}
      style={[
        memoizedStyles.container,
        style,
      ]}
      disabled={isDisabled}>
      {title && (
        <Text
          fontWeight="semiBold"
          fontSize={dynamicSize}
          style={memoizedStyles.text}>
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
  );
};

export default React.memo(Button);
