import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Modal } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  MainLayout,
  NavigationHeader,
  NavigationAction,
  Text,
  TextInput,
  Button,
  Price,
  Icon,
} from '../../components';
import { useAppTheme } from '../../theme';
import { RootState } from '../../store/store';
import { clearCart } from '../../store/slices/cart.slice';
import { addOrder } from '../../store/slices/orders.slice';
import { appColors } from '../../theme/colors';
import { createCheckoutSchema } from './schema';
import { Theme } from '../../constants';
import DropdownMenu from '../../components/DropDownMenu';
import { formatCardNumber, formatExpiryDate } from './utils';
import { px, pxH } from '../../utils';

const Checkout = () => {
  const { theme } = useAppTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartStore = useSelector((state: RootState) => state.cart);

  const countries = [
    { label: t('egypt'), value: 'egypt' },
    { label: t('saudiArabia'), value: 'saudi' },
    { label: t('uae'), value: 'uae' },
  ];
  const cities = {
    egypt: [t('cairo'), t('alexandria'), t('giza'), t('aswan')],
    saudi: [t('riyadh'), t('jeddah'), t('mecca'), t('medina')],
    uae: [t('dubai'), t('abuDhabi'), t('sharjah'), t('ajman')],
  };

  const [selectedPayment, setSelectedPayment] = useState<string>('cod');
  const [selectedCountry, setSelectedCountry] = useState('egypt');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const subtotal = cartStore.reduce(
    (acc, current) => acc + current.price * (current.quantity || 1),
    0,
  );
  const shippingCost = 50;
  const total = subtotal + shippingCost;

  const {
    control,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(createCheckoutSchema(t)),
    mode: 'onChange',
    defaultValues: {
      paymentMethod: 'cod',
    },
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = () => {
    const formData = watch();

    // Create order object
    const order = {
      id: Date.now().toString(),
      items: [...cartStore],
      subtotal,
      shippingCost,
      total,
      date: new Date().toISOString(),
      contactInfo: {
        email: formData.email,
        phone: formData.phone,
      },
      deliveryAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        apartment: formData.apartment || '',
        city: formData.city,
        country: formData.country,
        postalCode: formData.postalCode || '',
      },
      paymentMethod: formData.paymentMethod,
      status: 'completed' as const,
    };

    // Add order to store
    dispatch(addOrder(order));

    // Clear cart
    dispatch(clearCart());

    // Show success modal
    setShowSuccessModal(true);

    // Hide modal and navigate after 2 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
      navigation.navigate('homeBottomTabs' as never);
    }, 3000);
  };

  const PaymentOption = ({
    value,
    label,
    iconName,
  }: {
    value: string;
    label: string;
    iconName?: string;
  }) => {
    const isSelected = selectedPayment === value;
    return (
      <Pressable
        style={[
          styles(theme).paymentOption,
          isSelected && styles(theme).paymentOptionSelected,
        ]}
        onPress={() => {
          setSelectedPayment(value);
          setValue('paymentMethod', value as any);
        }}
      >
        <View style={styles(theme).paymentOptionLeft}>
          <View
            style={[
              styles(theme).radio,
              isSelected && styles(theme).radioSelected,
            ]}
          >
            {isSelected && <View style={styles(theme).radioDot} />}
          </View>
          <Text fontSize={15} fontWeight="medium">
            {label}
          </Text>
        </View>
        {iconName && (
          <View style={styles(theme).paymentIcons}>
            {value === 'card' && (
              <>
                <Icon name="visa" size={32} color={theme.primaryText} />
                <Icon
                  name="chip"
                  size={24}
                  color={theme.primaryText}
                  style={styles(theme).chipIcon}
                />
              </>
            )}
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <MainLayout
      isScrollable
      hideBottomTabs
      header={
        <NavigationHeader
          title={t('checkout')}
          startAction={<NavigationAction.BackButton />}
        />
      }
    >
      <View style={styles(theme).container}>
        {/* Order Summary */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={styles(theme).section}
        >
          <Text
            fontSize={18}
            fontWeight="semiBold"
            style={styles(theme).sectionTitle}
          >
            {t('orderSummary')}
          </Text>
          <View style={styles(theme).summaryCard}>
            <View style={styles(theme).summaryRow}>
              <Text fontSize={14}>{t('subtotal')}</Text>
              <Price priceSize={14} price={subtotal} />
            </View>
            <View style={styles(theme).summaryRow}>
              <Text fontSize={14}>{t('shopping')}</Text>
              <Price priceSize={14} price={shippingCost} />
            </View>
            <View style={styles(theme).divider} />
            <View style={styles(theme).summaryRow}>
              <Text fontSize={16} fontWeight="semiBold">
                {t('total')}
              </Text>
              <Price price={total} priceSize={18} />
            </View>
          </View>
        </Animated.View>

        {/* Contact Information */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles(theme).section}
        >
          <Text
            fontSize={18}
            fontWeight="semiBold"
            style={styles(theme).sectionTitle}
          >
            {t('contactInformation')}
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={t('email')}
                value={value}
                onValueChange={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={t('phone')}
                value={value}
                onValueChange={onChange}
                keyboardType="phone-pad"
                errorMessage={errors.phone?.message}
                maxLength={11}
              />
            )}
          />
        </Animated.View>

        {/* Delivery Address */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          style={styles(theme).section}
        >
          <Text
            fontSize={18}
            fontWeight="semiBold"
            style={styles(theme).sectionTitle}
          >
            {t('deliveryAddress')}
          </Text>

          <Controller
            control={control}
            name="country"
            render={({ field: { onChange, value } }) => (
              <DropdownMenu
                data={[...countries]}
                value={value}
                setValue={val => {
                  setSelectedCountry(val);
                  onChange(val);
                }}
                placeholder={t('selectCountry')}
              />
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value } }) => (
              <DropdownMenu
                data={cities[selectedCountry as keyof typeof cities]?.map(
                  city => ({
                    label: city,
                    value: city,
                  }),
                )}
                value={value}
                setValue={onChange}
                placeholder={t('selectCity')}
              />
            )}
          />

          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={t('firstName')}
                value={value}
                onValueChange={onChange}
                errorMessage={errors.firstName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={t('lastName')}
                value={value}
                onValueChange={onChange}
                errorMessage={errors.lastName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={t('address')}
                value={value}
                onValueChange={onChange}
                errorMessage={errors.address?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="apartment"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={t('apartment')}
                value={value || ''}
                onValueChange={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="postalCode"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={t('postalCode')}
                value={value || ''}
                onValueChange={onChange}
                keyboardType="number-pad"
                errorMessage={errors.postalCode?.message}
              />
            )}
          />
        </Animated.View>

        {/* Payment Method */}
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          style={styles(theme).section}
        >
          <Text
            fontSize={18}
            fontWeight="semiBold"
            style={styles(theme).sectionTitle}
          >
            {t('paymentMethod')}
          </Text>

          <Controller
            control={control}
            name="paymentMethod"
            render={() => (
              <View style={styles(theme).paymentMethods}>
                <PaymentOption value="cod" label={t('cashOnDelivery')} />
                <PaymentOption
                  value="card"
                  label={t('creditCard')}
                  iconName="card"
                />
              </View>
            )}
          />

          {/* Card Details (shown only if card is selected) */}
          {paymentMethod === 'card' && (
            <Animated.View
              entering={FadeInDown.springify()}
              style={styles(theme).cardDetails}
            >
              <Controller
                control={control}
                name="cardNumber"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder={t('cardNumber')}
                    value={value}
                    onValueChange={val => onChange(formatCardNumber(val))}
                    keyboardType="number-pad"
                    maxLength={19}
                    errorMessage={errors.cardNumber?.message}
                  />
                )}
              />

              <View style={styles(theme).row}>
                <Controller
                  control={control}
                  name="expiryDate"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles(theme).expiryDateContainer}>
                      <TextInput
                        placeholder={t('expiryDate')}
                        value={value}
                        onValueChange={text => onChange(formatExpiryDate(text))}
                        keyboardType="number-pad"
                        maxLength={5}
                        errorMessage={errors.expiryDate?.message}
                      />
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="cvv"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles(theme).cvvContainer}>
                      <TextInput
                        placeholder={t('cvv')}
                        value={value}
                        onValueChange={onChange}
                        keyboardType="number-pad"
                        maxLength={4}
                        secureTextEntry
                        errorMessage={errors.cvv?.message}
                      />
                    </View>
                  )}
                />
              </View>

              <Controller
                control={control}
                name="cardName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder={t('cardholderName')}
                    value={value}
                    onValueChange={onChange}
                    errorMessage={errors.cardName?.message}
                  />
                )}
              />
            </Animated.View>
          )}
        </Animated.View>

        {/* Submit Button */}
        <Animated.View
          entering={FadeInDown.delay(500).springify()}
          style={styles(theme).submitSection}
        >
          <Button
            title={t('pay')}
            size="large"
            onPress={onSubmit}
            isDisabled={!isValid}
          />
        </Animated.View>
      </View>

      {/* Success Modal */}
      <Modal transparent visible={showSuccessModal} animationType="fade">
        <View style={styles(theme).modalOverlay}>
          <LottieView
            source={require('../../assets/animations/successful.json')}
            autoPlay
            loop={false}
            style={styles(theme).lottieAnimation}
          />
        </View>
      </Modal>
    </MainLayout>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: px(24),
      paddingBottom: pxH(24),
    },
    section: {
      marginTop: pxH(24),
      gap: pxH(16),
    },
    sectionTitle: {
      marginBottom: pxH(16),
    },
    summaryCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: px(16),
      padding: px(16),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: pxH(2) },
      shadowOpacity: 0.1,
      shadowRadius: px(8),
      elevation: 3,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    divider: {
      height: 1,
      backgroundColor: theme.infoBorder,
      marginVertical: pxH(8),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    dropdown: {
      backgroundColor: theme.textInputBackground,
      borderRadius: px(12),
      padding: px(16),
      marginBottom: pxH(16),
    },
    paymentMethods: {
      gap: pxH(12),
    },
    paymentOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.cardBackground,
      borderRadius: px(12),
      padding: px(16),
      borderWidth: 2,
      borderColor: 'transparent',
    },
    paymentOptionSelected: {
      borderColor: appColors.primary,
      backgroundColor: theme.cardBackground,
    },
    paymentOptionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: px(12),
    },
    radio: {
      width: px(20),
      height: pxH(20),
      borderRadius: px(10),
      borderWidth: 2,
      borderColor: theme.secondaryText,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioSelected: {
      borderColor: appColors.primary,
    },
    radioDot: {
      width: px(10),
      height: pxH(10),
      borderRadius: px(5),
      backgroundColor: appColors.primary,
    },
    paymentIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    chipIcon: {
      marginLeft: px(8),
    },
    cardDetails: {
      marginTop: pxH(16),
      gap: pxH(8),
    },
    expiryDateContainer: {
      flex: 1,
      marginRight: px(8),
    },
    cvvContainer: {
      flex: 1,
    },
    submitSection: {
      marginTop: pxH(32),
      marginBottom: pxH(20),
    },
    modalOverlay: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: px(20),
      padding: px(32),
      gap: pxH(16),
    },
    lottieAnimation: {
      width: px(500),
      height: pxH(500),
    },
  });

export default Checkout;
