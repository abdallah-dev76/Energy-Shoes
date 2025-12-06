import {FlatList, View} from 'react-native';
import React, {useMemo} from 'react';
import {
  Card,
  MainLayout,
  NavigationAction,
  NavigationHeader,
} from '../../components';
import ShoesData from '../../data/ShoesData.json';
import ShoesDataAr from '../../data/ShoesDataAr.json';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../constants';
import styles from './styles';
import {isArabic} from '../../localization/i18next';
import {useTranslation} from 'react-i18next';

const ViewAllProducts = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'viewAllProducts'>>();
  const {currentCategory} = route.params;
  const data = useMemo(() => {
    return isArabic ? Object.values(ShoesDataAr) : Object.values(ShoesData);
  }, []);
  const {t} = useTranslation();

  return (
    <MainLayout
      isFixedHeader
      hideBottomTabs
      header={
        <NavigationHeader
          startAction={<NavigationAction.BackButton />}
          title={`${currentCategory}`}
        />
      }
      footer={<View />}>
      <FlatList
        data={data.filter(
          product =>
            currentCategory === t('all') ||
            product.gender === currentCategory ||
            product.brand === currentCategory,
        )}
        renderItem={({item}) => <Card isShowDetails product={item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
    </MainLayout>
  );
};

export default ViewAllProducts;
