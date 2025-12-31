import React, { useState } from 'react';
import {
  Card,
  MainLayout,
  NavigationAction,
  NavigationHeader,
  OffersSlider,
  SearchBar,
  SectionHeader,
  Tabs,
  Text,
} from '../../components';
import { FlatList, Pressable, ScrollView, View } from 'react-native';
import ShoesData from '../../data/ShoesData.json';
import ShoesDataAr from '../../data/ShoesDataAr.json';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProductDto, RootStackParamList } from '../../constants';
import { brands, categoriesTabs } from '../../constants/data';
import { useTranslation } from 'react-i18next';
import { isArabic } from '../../localization/i18next';
import { appColors } from '../../theme/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Home = () => {
  const data = isArabic ? Object.values(ShoesDataAr) : Object.values(ShoesData);
  const [activeTab, setActiveTab] = useState(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const filterDataByCategory = data.filter(
    item => activeTab === 0 || categoriesTabs(t)[activeTab] === item.gender,
  );
  const user = useSelector((state: RootState) => state.user);

  return (
    <MainLayout
      isScrollable
      statusBarBackgroundColor={appColors.primary}
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
        <View
          style={{
            backgroundColor: appColors.primary,
            paddingBottom: 24,
            paddingHorizontal: 24,
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
          }}
        >
          <SearchBar onSearchPress={() => navigation.navigate('search')} />
        </View>
        <View>
          <SectionHeader sectionTitle="Special For You" noViewAll />
          <OffersSlider />
        </View>
        <View>
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
            ListEmptyComponent={() => (
              <Text textAlign="center">No Data Found</Text>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
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
        </View>
        <View>
          <SectionHeader sectionTitle={t('offers')} noViewAll />
          <FlatList
            data={data.filter((item: ProductDto) => item?.discount)}
            renderItem={({ item }) => <Card product={item} />}
            contentContainerStyle={styles.productsContainer}
            keyExtractor={item => item.id.toString()}
            horizontal
            ListEmptyComponent={() => (
              <Text textAlign="center">No Data Found</Text>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default Home;
