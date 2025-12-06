import {Pressable, View} from 'react-native';
import React from 'react';
import Text from '../Text';
import {appColors} from '../../theme/colors';
import styles from './styles';
import {useTranslation} from 'react-i18next';
interface SectionHeaderProps {
  sectionTitle: string;
  onViewAllPress?: () => void;
  noViewAll?: boolean;
}
const SectionHeader = ({
  sectionTitle,
  onViewAllPress,
  noViewAll,
}: SectionHeaderProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text fontSize={18} fontWeight="medium">
        {sectionTitle}
      </Text>
      {!noViewAll && (
        <Pressable onPress={onViewAllPress}>
          <Text fontSize={12} color={appColors.primary}>
            {t('viewAll')}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default SectionHeader;
