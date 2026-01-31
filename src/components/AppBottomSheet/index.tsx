import React, { View } from 'react-native';
import ActionSheet, { SheetManager, Sheets } from 'react-native-actions-sheet';
import Text from '../Text';
import { useAppTheme } from '../../theme';
import IconButton from '../IconButton';
import { ReactNode } from 'react';
import { styles } from './styles';
import { pxH } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppBottomSheetProps {
  sheetName: keyof Sheets;
  sheetContent: ReactNode;
  title: string;
  leftComponent?: ReactNode;
}

const AppBottomSheet = ({
  leftComponent,
  sheetName,
  sheetContent,
  title,
}: AppBottomSheetProps) => {
  const { theme } = useAppTheme();
  const insetsBottom = useSafeAreaInsets().bottom;
  
  return (
    <ActionSheet
      keyboardHandlerEnabled
      gestureEnabled
      containerStyle={[
        styles(theme).container,
        {
          paddingBottom: pxH(16) + insetsBottom,
        },
      ]}
      indicatorStyle={styles(theme).indicator}
    >
      <View style={styles(theme).header}>
        {leftComponent ?? <View style={styles().placeholder} />}
        <Text>{title}</Text>
        <IconButton
          iconName="x"
          iconSize="medium"
          onPress={() => SheetManager.hide(sheetName)}
        />
      </View>
      {sheetContent}
    </ActionSheet>
  );
};

export default AppBottomSheet;
