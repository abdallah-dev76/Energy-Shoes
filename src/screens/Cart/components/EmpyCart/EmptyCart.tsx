import LottieView from 'lottie-react-native';
import { View, FlatList } from 'react-native';
import React, { useMemo } from 'react';
import { Button, Card, SectionHeader, Text } from '../../../../components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../constants';
import AppImages from '../../../../assets/app_images';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { useGetProducts } from '../../../../hooks/useGetProducts';
import { appColors } from '../../../../theme/colors';
import { LoaderKitView } from 'react-native-loader-kit';

export const EmptyCart = () => {
  const { products, isLoading } = useGetProducts();
  const data = useMemo(() => (products || []) as any[], [products]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const featuredProducts = useMemo(() => {
    return data.slice(6, 14);
  }, [data]);

  return (
    <View style={styles.emptyListContainer}>
      <View>
        <LottieView
          source={AppImages.empry_cart_animation}
          autoPlay
          loop
          style={styles.emptyListImage}
        />
        <View style={styles.emptyTextContainer}>
          <Text fontSize={18} fontWeight="semiBold" textAlign="center">
            {t('emptyCart')}
          </Text>
          <Button
            title={t('startShopping')}
            alignSelf="center"
            size="small"
            onPress={() => navigation.navigate('home')}
          />
        </View>
      </View>
      <View>
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
    </View>
  );
};

export default EmptyCart;
