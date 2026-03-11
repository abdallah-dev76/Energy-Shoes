import {
  StyleSheet,
  FlatList,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import { Icon, MainLayout, SearchBar, Text } from '../../components';
import { isArabic } from '../../localization/i18next';
import { RootStackParamList, Routes, Theme } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { px, pxH } from '../../utils';
import { useAppTheme } from '../../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NoProductsFound from './NoProductsFound';
import { useGetProducts } from '../../hooks/useGetProducts';
import { appColors } from '../../theme/colors';

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
      !isSearchEmpty
        ? product.name.toLowerCase().includes(search.toLowerCase())
        : undefined,
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
            <ActivityIndicator size="large" color={appColors.primary} />
          </View>
        ) : (
          <FlatList
            data={filteredData}
            ListEmptyComponent={!isSearchEmpty ? NoProductsFound : undefined}
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
