import LottieView from 'lottie-react-native';
import {View, FlatList} from 'react-native';
import React from 'react';
import {Button, Card, SectionHeader, Text} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../constants';
import AppImages from '../../../../assets/app_images';
import ShoesData from '../../../../data/ShoesData.json';
import ShoesDataAr from '../../../../data/ShoesDataAr.json';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {isArabic} from '../../../../localization/i18next';
export const EmptyCart = () => {
  const data = isArabic ? Object.values(ShoesDataAr) : Object.values(ShoesData);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {t} = useTranslation();
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
        <FlatList
          data={data.slice(6, 14)}
          renderItem={({item}) => <Card product={item} />}
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
  );
};

export default EmptyCart;
