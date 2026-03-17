import { View, ImageBackground, FlatList, ScrollView } from 'react-native';
import {
  gutters,
  layout,
  ProductDto,
  RootStackParamList,
} from '../../constants';
import {
  Icon,
  MainLayout,
  NavigationAction,
  NavigationHeader,
  Text,
  Card,
  SectionHeader,
  Price,
  Button,
  Tabs,
  Info,
  ReadMoreText,
} from '../../components';
import { moderateScale } from '../../utils';
import { appColors } from '../../theme/colors';
import styles from './styles';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppTheme } from '../../theme';
import { useDispatch } from 'react-redux';
import { add } from '../../store/slices/cart.slice';
import { useTranslation } from 'react-i18next';
import {
  createCartItem,
  createBuyNowProduct,
  getSimilarProducts,
} from './utils';
import { useGetProducts } from '../../hooks/useGetProducts';
import { LoaderKitView } from 'react-native-loader-kit';

const ProductDetails = () => {
  const { products, isLoading } = useGetProducts();
  const data = useMemo(() => products || ([] as ProductDto[]), [products]);
  const [activeTab, setActiveTab] = useState(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'productDetails'>>();
  const { product } = route.params;
  const {
    brand,
    name,
    price,
    category,
    gender,
    description,
    available_sizes,
    average_rating,
    imageURL,
  } = product;
  const { theme, isDarkMode } = useAppTheme();
  const addToCardStyle = useMemo(() => styles(theme).addToCartButton, [theme]);
  const dispatch = useDispatch();
  const scrollRef = useRef<ScrollView>(null);
  const handleAddToCart = useCallback(() => {
    const cartItem = createCartItem(product, activeTab);
    dispatch(add(cartItem));
  }, [dispatch, product, activeTab]);
  const { t } = useTranslation();
  const similiarProducts = useMemo(() => {
    if (isLoading || !data || data.length === 0) return [];
    return getSimilarProducts(data, product, 4);
  }, [data, isLoading, product]);

  useEffect(() => {
    // Scroll to top on first render
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  return (
    <MainLayout
      ref={scrollRef}
      isScrollable
      hideBottomTabs
      header={
        <NavigationHeader
          startAction={<NavigationAction.BackButton />}
          endAction={<NavigationAction.LoveButton product={product} />}
          backgroundColor="transparent"
        />
      }
      footer={
        <View style={styles(theme, isDarkMode).footerContainer}>
          <Price price={price} priceSize={21} />
          <Button
            title={t('addToCart')}
            size="large"
            onPress={handleAddToCart}
            style={addToCardStyle}
          />
          <Button
            title={t('buyItNow')}
            size="large"
            style={addToCardStyle}
            onPress={() => {
              const buyNowProduct = createBuyNowProduct(product, activeTab);
              navigation.navigate('checkout', {
                buyNowProduct,
              });
            }}
          />
        </View>
      }
    >
      <View style={layout.overflowHidden}>
        <ImageBackground
          source={{ uri: imageURL }}
          style={styles(theme).productImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles(theme).detailsContainer}>
        <View style={styles(theme).tags}>
          <Info title={brand} />
          <Info title={gender} />
          <Info title={category} />
        </View>

        <View style={styles(theme).nameAndRating}>
          <Text
            style={styles(theme).productName}
            numberOfLines={1}
            fontSize={18}
            fontWeight="semiBold"
          >
            {name}
          </Text>
          <View style={styles(theme).rateContainer}>
            <Icon
              name="star-fill"
              color={appColors.yellow}
              size={moderateScale(18)}
            />
            <Text
              style={styles(theme).ratingText}
              fontSize={14}
              fontWeight="medium"
            >
              {average_rating.toFixed(1)}
            </Text>
          </View>
        </View>

        <View>
          <ReadMoreText description={description} numberOfLines={3} />
        </View>

        <View style={styles(theme).sizesSection}>
          <Text fontWeight="medium">{t('sizes')}</Text>
          <Tabs
            tabs={available_sizes}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            variant="sizes"
          />
        </View>
      </View>

      <View style={gutters.mt_16}>
        <SectionHeader
          sectionTitle={t('similiarProducts')}
          onViewAllPress={() =>
            navigation.navigate('viewAllProducts', {
              currentCategory: brand,
            })
          }
        />
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
            data={similiarProducts}
            renderItem={({ item }) => <Card product={item} />}
            contentContainerStyle={styles(theme).productsContainer}
            keyExtractor={item => item.id.toString()}
            horizontal
            ListEmptyComponent={() => (
              <Text textAlign="center">No Data Found</Text>
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </MainLayout>
  );
};

export default ProductDetails;
