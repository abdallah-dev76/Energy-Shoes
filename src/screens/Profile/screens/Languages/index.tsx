import React from 'react';
import {
  MainLayout,
  NavigationAction,
  NavigationHeader,
} from '../../../../components';
import AppImages from '../../../../assets/app_images';
import { useTranslation } from 'react-i18next';
import { LanguageRadioButton } from '../../components';
import { gutters } from '../../../../constants';
import { View } from 'react-native';

export default function Language() {
  const { t } = useTranslation();

  return (
    <MainLayout
      isFixedHeader
      header={
        <NavigationHeader
          startAction={<NavigationAction.BackButton />}
          title={t('language')}
        />
      }
    >
      <View style={styles.container}>
        <LanguageRadioButton
          language="en"
          label={t('english')}
          flag={AppImages.usa}
        />
        <LanguageRadioButton
          language="ar"
          label={t('arabic')}
          flag={AppImages.egypt}
        />
      </View>
    </MainLayout>
  );
}
