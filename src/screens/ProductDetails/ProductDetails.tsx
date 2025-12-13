import { View, ImageBackground, FlatList } from 'react-native';
import { gutters, layout, RootStackParamList } from '../../constants';
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
import ShoesData from '../../data/ShoesData.json';
import ShoesDataAr from '../../data/ShoesDataAr.json';
import styles from './styles';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { useAppTheme } from '../../theme';
import { useDispatch } from 'react-redux';
import { add } from '../../store/slices/cart.slice';
import { isArabic } from '../../localization/i18next';
import { useTranslation } from 'react-i18next';
const ProductDetails = () => {
  const data = isArabic ? Object.values(ShoesDataAr) : Object.values(ShoesData);
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
  const handleAddToCart = useCallback(() => {
    dispatch(add({ ...product, selected_size: available_sizes[activeTab] }));
  }, [dispatch, product, available_sizes, activeTab]);
  const { t } = useTranslation();
  const similiarProducts = data
    .filter(item => item.brand === brand && item.name !== name)
    .slice(0, 4);

  return (
    <MainLayout
      bottomIndicatorColor={theme.bottomSheetBackground}
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
            style={{ flex: 1 }}
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
            <Text style={{ marginTop: 1 }} fontSize={14} fontWeight="medium">
              {average_rating.toFixed(1)}
            </Text>
          </View>
        </View>

        <View>
          <ReadMoreText description={description} numberOfLines={3} />
        </View>

        <View style={gutters.gapH_16}>
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
      </View>
    </MainLayout>
  );
};

export default ProductDetails;
