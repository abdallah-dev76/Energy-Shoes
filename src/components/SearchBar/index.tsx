import React from 'react';
import TextInput from '../TextInput';
import { useAppTheme } from '../../theme';
import { Pressable, StyleSheet, View } from 'react-native';
import { gutters, layout } from '../../constants';
import { useTranslation } from 'react-i18next';
import { px } from '../../utils';

export const SearchBar = ({
  onSearch,
  onSearchPress,
  onSearchSubmit,
  isAutoFocus,
  isEditable,
}: {
  onSearch?: (val: string) => void;
  onSearchPress?: () => void;
  onSearchSubmit?: () => void;
  isAutoFocus?: boolean;
  isEditable?: boolean;
}) => {
  const { theme } = useAppTheme();
  const { t } = useTranslation();
  return (
    <Pressable style={styles.container} onPress={onSearchPress}>
      <View style={styles.textInput}>
        <TextInput
          onValueChange={val => onSearch?.(val)}
          isSearchBar
          placeholder={t('search')}
          autoFocus={isAutoFocus}
          onSubmitEditing={onSearchSubmit}
          backgroundColor={theme.bottomSheetBackground}
          noBorder={true}
          editable={isEditable ?? true}
          pointerEvents="none"
        />
      </View>
    </Pressable>
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
