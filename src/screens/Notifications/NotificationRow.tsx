import { View, StyleSheet } from 'react-native';
import React from 'react';
import { appColors } from '../../theme/colors';
import { Text } from '../../components';

type NotificationRowProps = { title: string; desc: string };

const NotificationRow = ({ title, desc }: NotificationRowProps) => {
  return (
    <View style={styles.container}>
      <Text fontSize={16} fontWeight="medium">
        {title}
      </Text>
      <Text fontSize={14} fontWeight="regular">
        {desc}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: appColors.gray400,
    paddingVertical: 16,
  },
});
export default NotificationRow;
