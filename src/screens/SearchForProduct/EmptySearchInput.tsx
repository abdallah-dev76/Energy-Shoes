import { View, FlatList, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { useGetProducts } from '../../hooks/useGetProducts';
import { Card, SectionHeader, Text } from '../../components';
import { gutters } from '../../constants';
import LoaderKitView from 'react-native-loader-kit';
import { appColors } from '../../theme/colors';
import { useTranslation } from 'react-i18next';

const EmptySearchInput = () => {
  const { products, isLoading } = useGetProducts();
  const { t } = useTranslation();
  const data = useMemo(() => (products || []) as any[], [products]);
  const featuredProducts = useMemo(() => {
    return data.slice(15, 25);
  }, [data]);

  return (
    <View style={styles.emptyListContainer}>
      <SectionHeader sectionTitle={t('featuredProducts')} noViewAll />
      {isLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}
        >
          <LoaderKitView
            style={{ width: 50, height: 50 }}
            name={'BallPulse'}
            animationSpeedMultiplier={1.0} // speed up/slow down animation, default: 1.0, larger is faster
            color={appColors.primary} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
          />
        </View>
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
  productsContainer: {
    ...gutters.gap_16,
    ...gutters.p_4,
    ...gutters.px_24,
  },
});
export default EmptySearchInput;
