import { View } from 'react-native';
import React from 'react';
import Text from '../Text';
import styles from './styles';
import { useAppTheme } from '../../theme';
import { px } from '../../utils';
interface NavigationHeaderProps {
  startAction?: React.ReactNode;
  title?: string;
  endAction?: React.ReactNode;
  backgroundColor?: string;
}
const NavigationHeader = ({
  startAction,
  title,
  endAction,
  backgroundColor,
}: NavigationHeaderProps) => {
  const { theme } = useAppTheme();
  return (
    <View style={styles(theme, backgroundColor).container}>
      <View
        style={
          startAction
            ? styles(theme).actionContainer
            : styles(theme).placeholderContainer
        }
      >
        {startAction}
      </View>
      <Text fontSize={16} textAlign="center" fontWeight="semiBold">
        {title}
      </Text>
      <View
        style={
          endAction
            ? styles(theme).actionContainer
            : styles(theme).placeholderContainer
        }
      >
        {endAction}
      </View>
    </View>
  );
};

export default React.memo(NavigationHeader);
