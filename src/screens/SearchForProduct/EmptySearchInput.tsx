import { View, FlatList, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { useGetProducts } from '../../hooks/useGetProducts';
import { Card, SectionHeader, Text } from '../../components';
import { gutters } from '../../constants';
import LoaderKitView from 'react-native-loader-kit';
import { appColors } from '../../theme/colors';
import { useTranslation } from 'react-i18next';

const LOADER_SIZE = 50;
const FEATURED_PRODUCTS_START = 15;
const FEATURED_PRODUCTS_END = 25;

const LoadingIndicator = () => (
  <View style={styles.loaderContainer}>
    <LoaderKitView
      style={{ width: LOADER_SIZE, height: LOADER_SIZE }}
      name={'BallPulse'}
      animationSpeedMultiplier={1.0}
      color={appColors.primary}
    />
  </View>
);

const EmptySearchInput = () => {
  const { products, isLoading } = useGetProducts();
  const { t } = useTranslation();
  const data = useMemo(() => (products || []) as any[], [products]);
  const featuredProducts = useMemo(
    () => data.slice(FEATURED_PRODUCTS_START, FEATURED_PRODUCTS_END),
    [data],
  );

  return (
    <View style={styles.emptyListContainer}>
      <SectionHeader sectionTitle={t('featuredProducts')} noViewAll />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={featuredProducts}
          renderItem={({ item }) => <Card product={item} />}
          contentContainerStyle={styles.productsContainer}
          keyExtractor={item => item.id.toString()}
          horizontal
          ListEmptyComponent={() => (
            <Text textAlign="center">No Data Found</Text>
          )}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyListContainer: {
    ...gutters.mt_24,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  productsContainer: {
    ...gutters.gap_16,
    ...gutters.p_4,
    ...gutters.px_24,
  },
});

export default EmptySearchInput;
