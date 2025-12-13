import { StyleProp, TextProps, TextStyle } from 'react-native';
import { Text as ReactNativeText } from 'react-native';
import React from 'react';
import appFonts from '../../assets/fonts';
import { useAppTheme } from '../../theme';
import { moderateScale } from '../../utils';
interface LocalTextProps extends TextProps {
  fontSize?: number;
  fontWeight?:
    | 'regular'
    | 'medium'
    | 'bold'
    | 'italic'
    | 'extraBold'
    | 'light'
    | 'semiBold'
    | 'extraLight'
    | 'thin';
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  children?: string | number;
  style?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  numberOfLines?: number;
  lineHeight?: number;
}
const Text = ({
  fontSize = 16,
  fontWeight = 'regular',
  textAlign,
  children,
  color,
  style,
  numberOfLines,
  lineHeight = 24,
  ...props
}: LocalTextProps) => {
  const { theme } = useAppTheme();
  return (
    <ReactNativeText
      style={[
        {
          fontFamily: appFonts[fontWeight],
          fontSize: moderateScale(fontSize),
          textAlign: textAlign,
          color: color ?? theme.primaryText,
          lineHeight: moderateScale(lineHeight),
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
      {...props}
    >
      {children}
    </ReactNativeText>
  );
};

export default Text;
