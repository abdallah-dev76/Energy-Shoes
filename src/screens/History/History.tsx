import { View, FlatList, ScrollView, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  MainLayout,
  NavigationHeader,
  NavigationAction,
  Text,
  Price,
} from '../../components';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../../theme';
import styles from './styles';

const History = () => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const orders = useSelector((state: RootState) => state.orders);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderOrderItem = ({ item: order }: any) => (
    <View style={[styles.orderCard, { backgroundColor: theme.cardBackground }]}>
      {/* Order Header */}
      <View style={styles.orderHeader}>
        <View>
          <Text fontWeight="bold" fontSize={16}>
            {`${t('order')} #${order.id.slice(-6)}`}
          </Text>
          <Text fontSize={12} color={theme.secondaryText}>
            {formatDate(order.date)}
          </Text>
        </View>
      </View>

      {/* Order Items */}
      <View style={styles.itemsSection}>
        <Text fontWeight="medium" fontSize={14} style={styles.sectionTitle}>
          {`  ${t('items')} (${order.items.length})`}
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.itemsScroll}
        >
          {order.items.map((item: any, index: number) => (
            <View key={`${item.id}-${index}`} style={styles.itemThumbnail}>
              <Image
                source={{ uri: item.imageURL }}
                style={styles.itemImage}
                resizeMode="contain"
              />
              <View style={styles.itemDetails}>
                <Text fontWeight="semiBold" fontSize={14} lineHeight={16}>
                  {item.name}
                </Text>
                <Text fontSize={14} lineHeight={16}>{`${item.price}$`}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Delivery Address */}
      <View style={styles.section}>
        <Text fontWeight="medium" fontSize={14} style={styles.sectionTitle}>
          {t('deliveryAddress')}
        </Text>
        <Text fontSize={13} color={theme.secondaryText}>
          {`${order.deliveryAddress.firstName} ${order.deliveryAddress.lastName}`}
        </Text>
        <Text fontSize={13} color={theme.secondaryText}>
          {`${order.deliveryAddress.address} ${
            order.deliveryAddress.apartment
              ? `, ${order.deliveryAddress.apartment}`
              : ''
          }`}
        </Text>
        <Text fontSize={13} color={theme.secondaryText}>
          {`${order.deliveryAddress.city}, ${order.deliveryAddress.country} ${
            order.deliveryAddress.postalCode
              ? ` ${order.deliveryAddress.postalCode}`
              : ''
          }`}
        </Text>
      </View>

      {/* Payment Info */}
      <View style={styles.section}>
        <Text fontWeight="medium" fontSize={14} style={styles.sectionTitle}>
          {t('paymentMethod')}
        </Text>
        <Text fontSize={13} color={theme.secondaryText}>
          {order.paymentMethod === 'cod'
            ? t('cashOnDelivery')
            : t('creditCard')}
        </Text>
      </View>

      {/* Order Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text fontSize={13} color={theme.secondaryText}>
            {t('subtotal')}
          </Text>
          <Price price={order.subtotal} priceSize={13} />
        </View>
        <View style={styles.summaryRow}>
          <Text fontSize={13} color={theme.secondaryText}>
            {t('shipping')}
          </Text>
          <Price price={order.shippingCost} priceSize={13} />
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text fontWeight="bold" fontSize={16}>
            {t('total')}
          </Text>
          <Price price={order.total} priceSize={16} />
        </View>
      </View>
    </View>
  );

  return (
    <MainLayout
      hideBottomTabs
      isFixedHeader
      header={
        <NavigationHeader
          startAction={<NavigationAction.BackButton />}
          title={t('history')}
        />
      }
    >
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text fontSize={18} fontWeight="medium" textAlign="center">
            {t('noOrdersYet')}
          </Text>
          <Text
            fontSize={14}
            color={theme.secondaryText}
            textAlign="center"
            style={styles.emptySubtext}
          >
            {t('startShoppingToSeeOrders')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </MainLayout>
  );
};

export default History;
