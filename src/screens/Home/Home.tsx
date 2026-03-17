import React, { useState, useEffect } from 'react';
import {
  Card,
  MainLayout,
  NavigationAction,
  NavigationHeader,
  OffersSlider,
  SearchBar,
  SectionHeader,
  Tabs,
} from '../../components';
import { FlatList, Pressable, ScrollView, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProductDto, RootStackParamList } from '../../constants';
import { brands, categoriesTabs } from '../../constants/data';
import { useTranslation } from 'react-i18next';
import { appColors } from '../../theme/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { px, pxH } from '../../utils';
import NoDataFound from './NoDataFound';
import { useGetProducts } from '../../hooks/useGetProducts';
import { LoaderKitView } from 'react-native-loader-kit';

const Home = () => {
  const { products, isLoading } = useGetProducts();
  const data = (products || []) as ProductDto[];
  const [activeTab, setActiveTab] = useState(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const filterDataByCategory = data.filter(
    item => activeTab === 0 || categoriesTabs(t)[activeTab] === item.gender,
  );
  const user = useSelector((state: RootState) => state.user);

  // Animation values for each section
  const searchOpacity = useSharedValue(0);
  const searchTranslateY = useSharedValue(50);

  const specialOpacity = useSharedValue(0);
  const specialTranslateY = useSharedValue(50);

  const recommendedOpacity = useSharedValue(0);
  const recommendedTranslateY = useSharedValue(50);

  const brandsOpacity = useSharedValue(0);
  const brandsTranslateY = useSharedValue(50);

  const offersOpacity = useSharedValue(0);
  const offersTranslateY = useSharedValue(50);

  const delayBetweenSections = 200;

  useEffect(() => {
    // Animation config
    const animationConfig = {
      duration: 700,
      easing: Easing.out(Easing.cubic),
    };

    // Animate each section with staggered delays
    searchOpacity.value = withDelay(0, withTiming(1, animationConfig));
    searchTranslateY.value = withDelay(0, withTiming(0, animationConfig));

    specialOpacity.value = withDelay(
      delayBetweenSections,
      withTiming(1, animationConfig),
    );
    specialTranslateY.value = withDelay(
      delayBetweenSections,
      withTiming(0, animationConfig),
    );

    recommendedOpacity.value = withDelay(
      delayBetweenSections * 2,
      withTiming(1, animationConfig),
    );
    recommendedTranslateY.value = withDelay(
      delayBetweenSections * 2,
      withTiming(0, animationConfig),
    );

    brandsOpacity.value = withDelay(
      delayBetweenSections * 3,
      withTiming(1, animationConfig),
    );
    brandsTranslateY.value = withDelay(
      delayBetweenSections * 3,
      withTiming(0, animationConfig),
    );

    offersOpacity.value = withDelay(
      delayBetweenSections * 4,
      withTiming(1, animationConfig),
    );
    offersTranslateY.value = withDelay(
      delayBetweenSections * 4,
      withTiming(0, animationConfig),
    );
  }, [
    brandsOpacity,
    brandsTranslateY,
    offersOpacity,
    offersTranslateY,
    recommendedOpacity,
    recommendedTranslateY,
    searchOpacity,
    searchTranslateY,
    specialOpacity,
    specialTranslateY,
  ]);

  // Animated styles for each section
  const specialAnimatedStyle = useAnimatedStyle(() => ({
    opacity: specialOpacity.value,
    transform: [{ translateY: specialTranslateY.value }],
  }));

  const recommendedAnimatedStyle = useAnimatedStyle(() => ({
    opacity: recommendedOpacity.value,
    transform: [{ translateY: recommendedTranslateY.value }],
  }));

  const brandsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: brandsOpacity.value,
    transform: [{ translateY: brandsTranslateY.value }],
  }));

  const offersAnimatedStyle = useAnimatedStyle(() => ({
    opacity: offersOpacity.value,
    transform: [{ translateY: offersTranslateY.value }],
  }));

  return (
    <MainLayout
      isScrollable
      header={
        <NavigationHeader
          startAction={
            <NavigationAction.WelcomeComponent
              name={user?.name}
              imageUrl={user?.imageProfile ?? ''}
            />
          }
          endAction={
            <NavigationAction.NofificationsButton
              onPress={() => navigation.navigate('notifications')}
            />
          }
          backgroundColor={appColors.primary}
        />
      }
    >
      <View style={styles.screenContainer}>
        <Animated.View
          style={[
            {
              backgroundColor: appColors.primary,
              paddingBottom: pxH(24),
              paddingHorizontal: px(24),
              borderBottomLeftRadius: 18,
              borderBottomRightRadius: 18,
            },
          ]}
        >
          <SearchBar
            isEditable={false}
            onSearchPress={() => navigation.navigate('search')}
          />
        </Animated.View>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: pxH(40),
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
          <>
            <Animated.View style={specialAnimatedStyle}>
              <SectionHeader sectionTitle={t('specialForYou')} noViewAll />
              <OffersSlider />
            </Animated.View>
            <Animated.View style={recommendedAnimatedStyle}>
              <SectionHeader
                sectionTitle={t('recommendedForYou')}
                onViewAllPress={() =>
                  navigation.navigate('viewAllProducts', {
                    currentCategory: categoriesTabs(t)[activeTab],
                  })
                }
              />
              <View style={styles.tabsWrapper}>
                <Tabs
                  tabs={categoriesTabs(t)}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  variant="categories"
                />
              </View>
              <FlatList
                data={filterDataByCategory.slice(0, 8)}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Card product={item} />}
                contentContainerStyle={styles.productsContainer}
                horizontal
                ListEmptyComponent={NoDataFound}
                showsHorizontalScrollIndicator={false}
              />
            </Animated.View>
            <Animated.View style={brandsAnimatedStyle}>
              <SectionHeader sectionTitle={t('featuredBrands')} noViewAll />
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={styles.brands}
              >
                {brands.map(brand => (
                  <Pressable
                    key={brand.name}
                    onPress={() =>
                      navigation.navigate('viewAllProducts', {
                        currentCategory: brand.name,
                      })
                    }
                  >
                    <brand.Logo />
                  </Pressable>
                ))}
              </ScrollView>
            </Animated.View>
            <Animated.View style={offersAnimatedStyle}>
              <SectionHeader sectionTitle={t('offers')} noViewAll />
              <FlatList
                data={data.filter((item: ProductDto) => item?.discount)}
                renderItem={({ item }) => <Card product={item} />}
                contentContainerStyle={styles.productsContainer}
                keyExtractor={item => item.id.toString()}
                horizontal
                ListEmptyComponent={NoDataFound}
                showsHorizontalScrollIndicator={false}
              />
            </Animated.View>
          </>
        )}
      </View>
    </MainLayout>
  );
};

export default Home;
