import {View} from 'react-native';
import React from 'react';
import Text from '../Text';
import styles from './styles';
import {appColors} from '../../theme/colors';
interface InfoProps {
  title: string | number;
  size?: 'medium' | 'large';
}

const Info = ({title = 'medium'}: InfoProps) => {
  return (
    <View style={styles().container}>
      <Text
        fontSize={14}
        color={appColors.primary}
        textAlign="center"
        fontWeight="medium">
        {title}
      </Text>
    </View>
  );
};

export default React.memo(Info);
