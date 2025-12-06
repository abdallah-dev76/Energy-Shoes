import React from 'react';
import TextInput from '../TextInput';
import IconButton from '../IconButton';
import {useAppTheme} from '../../theme';
import {StyleSheet, View} from 'react-native';
import {gutters, layout} from '../../constants';
import {useTranslation} from 'react-i18next';

export const SearchBar = ({
  onSearch,
  onSearchPress,
  onSearchSubmit,
  onFilter,
  isAutoFocus,
}: {
  onSearch?: (val: string) => void;
  onSearchPress?: () => void;
  onSearchSubmit?: () => void;
  onFilter?: () => void;
  isAutoFocus?: boolean;
}) => {
  const {theme} = useAppTheme();
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <TextInput
          onValueChange={val => onSearch?.(val)}
          isSearchBar
          placeholder={t('search')}
          autoFocus={isAutoFocus}
          onPress={onSearchPress}
          onSubmitEditing={onSearchSubmit}
          backgroundColor={theme.bottomSheetBackground}
          noBorder
        />
      </View>
      {onFilter && (
        <IconButton
          iconName="preferences-1"
          backgroundColor={theme.textInputBackground}
          onPress={onFilter}
          iconColor={theme.primaryText}
          iconSize="intermediate"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layout.row,
    ...layout.itemsCenter,
    ...gutters.gap_8,
  },
  textInput: {
    ...layout.flex_1,
  },
});
export default React.memo(SearchBar);
