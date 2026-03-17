import { StyleSheet, FlatList, View, Pressable } from 'react-native';
import React, { useState, useMemo } from 'react';
import { Icon, MainLayout, SearchBar, Text } from '../../components';
import { isArabic } from '../../localization/i18next';
import { gutters, RootStackParamList, Routes, Theme } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { px, pxH } from '../../utils';
import { useAppTheme } from '../../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NoProductsFound from './NoProductsFound';
import { useGetProducts } from '../../hooks/useGetProducts';
import { appColors } from '../../theme/colors';
import LoaderKitView from 'react-native-loader-kit';
import EmptySearchInput from './EmptySearchInput';

const SearchForProduct = () => {
  const { products, isLoading } = useGetProducts();
  const data = useMemo(() => (products || []) as any[], [products]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useAppTheme();
  const [search, setSearch] = useState<string>('');
  const isSearchEmpty = search === '';

  const filteredData = useMemo(() => {
    return data.filter(product =>
      isSearchEmpty
        ? undefined
        : product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search, isSearchEmpty]);

  return (
    <MainLayout isFixedHeader hideBottomTabs>
      <View style={styles(theme).container}>
        <View style={styles().header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name={isArabic ? 'arrow-right-2' : 'arrow-left-2'}
              size={px(16)}
              color={theme.primaryText}
            />
          </Pressable>
          <View style={styles().searchBarContainer}>
            <SearchBar isAutoFocus onSearch={val => setSearch(val)} />
          </View>
        </View>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <LoaderKitView
              style={{ width: 50, height: 50 }}
              name={'BallPulse'}
              animationSpeedMultiplier={1} // speed up/slow down animation, default: 1.0, larger is faster
              color={appColors.primary} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
            />
          </View>
        ) : (
          <FlatList
            data={filteredData}
            ListEmptyComponent={
              isSearchEmpty ? EmptySearchInput : NoProductsFound
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable
                style={styles().item}
                onPress={() =>
                  navigation.navigate(Routes.PRODUCT_DETAILS, {
                    product: item,
                  })
                }
              >
                <Text color={theme.primaryText}>{item.name}</Text>
              </Pressable>
            )}
          />
        )}
      </View>
    </MainLayout>
  );
};

const styles = (theme?: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.backgroundColor,
      ...gutters.mt_24,
    },
    header: {
      paddingHorizontal: px(24),
      flexDirection: 'row',
      alignItems: 'center',
      gap: px(16),
    },
    searchBarContainer: {
      flex: 1,
    },
    item: {
      flexDirection: 'row',
      paddingVertical: pxH(16),
      borderColor: '#aaa',
      borderBottomWidth: px(1),
      paddingHorizontal: px(24),
    },
  });

export default SearchForProduct;
