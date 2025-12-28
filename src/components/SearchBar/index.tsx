import React from 'react';
import TextInput from '../TextInput';
import { useAppTheme } from '../../theme';
import { StyleSheet, View } from 'react-native';
import { gutters, layout } from '../../constants';
import { useTranslation } from 'react-i18next';
import { px } from '../../utils';

export const SearchBar = ({
  onSearch,
  onSearchPress,
  onSearchSubmit,
  isAutoFocus,
}: {
  onSearch?: (val: string) => void;
  onSearchPress?: () => void;
  onSearchSubmit?: () => void;
  onFilter?: () => void;
  isAutoFocus?: boolean;
}) => {
  const { theme } = useAppTheme();
  const { t } = useTranslation();
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layout.row,
    ...layout.itemsCenter,
    ...gutters.gap_8,
    ...layout.overflowHidden,
    borderRadius: px(25),
  },
  textInput: {
    ...layout.flex_1,
  },
});
export default React.memo(SearchBar);
