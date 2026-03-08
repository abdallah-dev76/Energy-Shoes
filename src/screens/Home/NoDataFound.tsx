import React from 'react';
import { Text } from '../../components';
import { useTranslation } from 'react-i18next';

const NoDataFound = () => {
  const { t } = useTranslation();
  return <Text textAlign="center">{t('noDataFound')}</Text>;
};

export default NoDataFound;
