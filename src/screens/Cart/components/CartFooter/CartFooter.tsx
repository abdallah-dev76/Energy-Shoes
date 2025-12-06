import {Platform, View} from 'react-native';
import React from 'react';
import {Button, Price, Text} from '../../../../components';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';
import {useAppTheme} from '../../../../theme';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {BOTTOM_TAB_HEIGHT} from '../../../../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const CartFooter = () => {
  const {theme, isDarkMode} = useAppTheme();
  const cartStore = useSelector((state: RootState) => state.cart);
  const {t} = useTranslation();
  const totalPrice = cartStore.reduce((acc, current) => {
    return acc + current.price;
  }, 0);
  const bottomIndicatorHeight = useSafeAreaInsets().bottom;
  const bottomTabHeight =
    Platform.OS === 'ios'
      ? BOTTOM_TAB_HEIGHT - bottomIndicatorHeight
      : BOTTOM_TAB_HEIGHT;
  return (
    !!totalPrice && (
      <View
        style={[
          styles(theme, isDarkMode).footerContainer,
          {paddingBottom: bottomTabHeight},
        ]}>
        <View style={styles(theme).textStyle}>
          <Text fontSize={14}>{t('subtotal')}</Text>
          <Price priceSize={14} price={totalPrice} />
        </View>
        <View style={styles(theme).textStyle}>
          <Text fontSize={14}>{t('shopping')}</Text>
          <Price priceSize={14} price={50} />
        </View>
        <View style={styles(theme).dashlineContainer}>
          <View style={styles(theme).dashedLine} />
        </View>
        <View style={styles(theme).textStyle}>
          <Text fontWeight="semiBold">{t('total')}</Text>
          <Price price={totalPrice + 50} />
        </View>
        <Button
          alignSelf="stretch"
          size="large"
          title={t('checkout')}
          onPress={() => console.log('Checkout')}
        />
      </View>
    )
  );
};

export default CartFooter;
