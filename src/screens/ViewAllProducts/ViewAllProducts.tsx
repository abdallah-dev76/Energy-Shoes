import { FlatList, View, ActivityIndicator } from 'react-native';
import React, { useMemo } from 'react';
import {
  Card,
  MainLayout,
  NavigationAction,
  NavigationHeader,
} from '../../components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../constants';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { useGetProducts } from '../../hooks/useGetProducts';
import { appColors } from '../../theme/colors';

const ViewAllProducts = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'viewAllProducts'>>();
  const { currentCategory } = route.params;
  const { products, isLoading } = useGetProducts();
  const data = useMemo(() => {
    return (products || []) as any[];
  }, [products]);
  const { t } = useTranslation();

  const filteredData = useMemo(() => {
    return data.filter(
      product =>
        currentCategory === t('all') ||
        product.gender === currentCategory ||
        product.brand === currentCategory,
    );
  }, [data, currentCategory, t]);

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
      footer={<View />}
    >
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color={appColors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <Card isShowDetails product={item} />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        />
      )}
    </MainLayout>
  );
};

export default ViewAllProducts;
