import { Platform, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Cart, Favourite, Profile } from '../screens';
import {
  BOTTOM_TAB_HEIGHT,
  gutters,
  layout,
  Theme,
  Routes,
} from '../constants';
import { useAppTheme } from '../theme';
import { Icon } from '../components';
import { appColors } from '../theme/colors';
import { isArabic } from '../localization/i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeBottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();

  const cartLength = useSelector((state: RootState) =>
    state.cart.reduce((total, item) => total + (item.quantity || 1), 0),
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarButton: ({ children, onPress, style }) => (
          // for android only
          <Pressable
            onPress={onPress}
            style={style}
            android_ripple={{ color: 'transparent' }}
          >
            {children}
          </Pressable>
        ),
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles(theme, insets).tabBarStyle,
        tabBarItemStyle: styles(theme).tabBarItemStyle,
        tabBarInactiveTintColor: theme.secondaryText,
        tabBarActiveTintColor: appColors.primary,
      }}
    >
      <Tab.Screen
        name={Routes.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-door-svgrepo-com" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.CART}
        component={Cart}
        options={{
          tabBarBadge: cartLength,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="cart-basket-ui-5-svgrepo-com"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.FAVOURITE}
        component={Favourite}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart-svgrepo-com" size={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" size={size} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={Routes.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-1" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = (theme: Theme, insets?: { bottom: number }) =>
  StyleSheet.create({
    tabBarStyle: {
      height:
        Platform.OS === 'android'
          ? BOTTOM_TAB_HEIGHT + (insets?.bottom || 0)
          : BOTTOM_TAB_HEIGHT,
      direction: isArabic ? 'rtl' : 'ltr',
      elevation: 0,
      borderColor: 'transparent',
      shadowOpacity: 0,
      backgroundColor: theme.tabBarBackgroundColor,
      ...layout.absolute,
      ...layout.overflowHidden,
    },
    tabBarItemStyle: {
      backgroundColor: theme.tabBarBackgroundColor,
      ...gutters.pt_12,
    },
  });

export default HomeBottomTabs;
