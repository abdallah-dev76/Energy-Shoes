import React from 'react';
import { View } from 'react-native';
import { SheetManager, SheetProps } from 'react-native-actions-sheet';
import { useAppTheme } from '../../theme';
import Text from '../Text';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import AppBottomSheet from '../AppBottomSheet';

interface ConfirmDeleteSheetPayload {
  title?: string;
  message?: string;
  onConfirm: () => void;
}

const ConfirmDeleteSheet = (props: SheetProps<'confirm-delete-sheet'>) => {
  const { theme } = useAppTheme();
  const { t } = useTranslation();

  const payload = props.payload as ConfirmDeleteSheetPayload;
  const { message, onConfirm, title } = payload || {};

  const handleConfirm = () => {
    SheetManager.hide('confirm-delete-sheet');
    onConfirm?.();
  };

  const handleCancel = () => {
    SheetManager.hide('confirm-delete-sheet');
  };

  return (
    <AppBottomSheet
      title={ title || t('deleteConfirmation')}
      sheetName={'confirm-delete-sheet'}
      sheetContent={
        <View>
          <Text
            fontSize={14}
            color={theme.secondaryText}
            style={styles().message}
          >
            {message || t('deleteConfirmationMessage')}
          </Text>

          <View style={styles().buttonsContainer}>
            <Button
              title={t('yes')}
              onPress={handleConfirm}
              style={styles(theme).confirmButton}
              variant="main"
            />
            <Button
              title={t('no')}
              onPress={handleCancel}
              style={styles(theme).cancelButton}
              variant="theming"
            />
          </View>
        </View>
      }
    />
  );
};

export default ConfirmDeleteSheet;
