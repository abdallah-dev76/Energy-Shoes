//extend any props for a general component
import {TextInput as TextInputBase, TextInputProps, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './styles';
import {useAppTheme} from '../../theme';
import Text from '../Text';
import {appColors} from '../../theme/colors';
import Icon from '../Icon';
import {px} from '../../utils';
import {isArabic} from '../../localization/i18next';

interface textInputProps extends TextInputProps {
  isSearchBar?: boolean;
  label?: string;
  errorMessage?: string;
  onValueChange: (val: string) => void;
  backgroundColor?: string;
  noBorder?: boolean;
}

const TextInput = ({
  onValueChange,
  isSearchBar,
  label,
  errorMessage,
  backgroundColor,
  noBorder,
  ...otherProps
}: textInputProps) => {
  const {theme} = useAppTheme();
  const [value, setValue] = useState('');
  const onChangeHandler = useCallback(
    (val: string) => {
      setValue(val);
      onValueChange(val);
    },
    [onValueChange],
  );
  return (
    <View style={styles(theme).container}>
      {label && (
        <Text fontSize={14} fontWeight="medium">
          {label}
        </Text>
      )}
      <View style={styles(theme).textInputAndErr}>
        <View style={styles(theme, backgroundColor,noBorder).textInputContainer}>
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
            textAlign={isArabic ? 'right' : 'left'}
            {...otherProps}
          />
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
