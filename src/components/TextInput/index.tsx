//extend any props for a general component
import {
  Pressable,
  TextInput as TextInputBase,
  TextInputProps,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import styles from './styles';
import { useAppTheme } from '../../theme';
import Text from '../Text';
import { appColors } from '../../theme/colors';
import Icon from '../Icon';
import { px } from '../../utils';
import { isArabic } from '../../localization/i18next';

interface textInputProps extends TextInputProps {
  isSearchBar?: boolean;
  label?: string;
  errorMessage?: string;
  onValueChange: (val: string) => void;
  backgroundColor?: string;
  noBorder?: boolean;
  required?: boolean;
  isPassword?: boolean;
}

const TextInput = ({
  onValueChange,
  required,
  isSearchBar,
  label,
  errorMessage,
  backgroundColor,
  noBorder,
  isPassword = false,
  ...otherProps
}: textInputProps) => {
  const { theme } = useAppTheme();
  const [value, setValue] = useState('');
  const onChangeHandler = useCallback(
    (val: string) => {
      setValue(val);
      onValueChange(val);
    },
    [onValueChange],
  );
  const [showPassrod, setShowPassword] = useState(true);

  return (
    <View style={styles(theme).container}>
      {label && (
        <View style={styles(theme).label}>
          {required && <Text color="red">*</Text>}
          <Text fontSize={14} fontWeight="medium">
            {label}
          </Text>
        </View>
      )}
      <View style={styles(theme).textInputAndErr}>
        <View
          style={styles(theme, backgroundColor, noBorder).textInputContainer}
        >
          {isSearchBar && (
            <View style={styles(theme).searchIconContainer}>
              <Icon name="search-1" size={px(18)} color={theme.primaryText} />
            </View>
          )}
          <TextInputBase
            placeholderTextColor={theme.secondaryText}
            style={styles(theme).textInput}
            selectionColor={appColors.primary}
            value={value}
            cursorColor={appColors.primary}
            onChangeText={onChangeHandler}
            numberOfLines={1}
            secureTextEntry={isPassword && showPassrod}
            textAlign={isArabic ? 'right' : 'left'}
            {...otherProps}
          />
          {isPassword && (
            <Pressable
              onPress={() => setShowPassword(prev => !prev)}
              style={styles(theme).searchIconContainer}
            >
              <Icon
                name={showPassrod ? 'eye-off' : 'eye'}
                color={theme.primaryText}
                size={px(18)}
              />
            </Pressable>
          )}
        </View>
        {errorMessage && (
          <Text color={appColors.red} fontSize={14}>
            {errorMessage}
          </Text>
        )}
      </View>
    </View>
  );
};

export default TextInput;
