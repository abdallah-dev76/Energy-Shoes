import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeBottomTabs from './HomeBottomTabs';
import {
  History,
  Notifications,
  Payment,
  ProductDetails,
  SearchForProduct,
  Splash,
  ViewAllProducts,
} from '../screens';
import { Language } from '../screens/Profile/screens';
import { Routes } from '../constants';
import AuthStack from './AuthStack';
const MainStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
      >
        <Stack.Screen name="splash" component={Splash} />

        <Stack.Screen name={Routes.BOTTOM_TABS} component={HomeBottomTabs} />
        <Stack.Screen
          name={Routes.PRODUCT_DETAILS}
          component={ProductDetails}
        />
        <Stack.Screen name={Routes.PAYMENT} component={Payment} />
        <Stack.Screen
          name={Routes.VEIW_ALL_PRODUCTS}
          component={ViewAllProducts}
        />
        <Stack.Screen name={Routes.SEARCH} component={SearchForProduct} />

        <Stack.Screen name={Routes.NOTIFICATIONS} component={Notifications} />
        <Stack.Screen name={Routes.HISTORY} component={History} />
        <Stack.Screen name={Routes.LANGUAGE} component={Language} />
        <Stack.Screen name={Routes.AUTH_STACK} component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
