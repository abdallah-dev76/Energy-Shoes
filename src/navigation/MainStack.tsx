import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeBottomTabs from './HomeBottomTabs';
import {
  EditProfile,
  History,
  Intro,
  Notifications,
  Payment,
  ProductDetails,
  SearchForProduct,
  Splash,
  ViewAllProducts,
  Checkout,
} from '../screens';
import { Language } from '../screens/Profile/screens';
import { Routes } from '../constants';
import AuthStack from './AuthStack';
const MainStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen
          name="intro"
          component={Intro}
          options={{ gestureEnabled: false }} //prevent from going back to splash screen again
        />

        <Stack.Screen name={Routes.BOTTOM_TABS} component={HomeBottomTabs} />
        <Stack.Screen
          name={Routes.PRODUCT_DETAILS}
          component={ProductDetails}
        />
        <Stack.Screen name={Routes.PAYMENT} component={Payment} />
        <Stack.Screen name={Routes.CHECKOUT} component={Checkout} />
        <Stack.Screen
          name={Routes.VEIW_ALL_PRODUCTS}
          component={ViewAllProducts}
        />
        <Stack.Screen name={Routes.SEARCH} component={SearchForProduct} />

        <Stack.Screen name={Routes.NOTIFICATIONS} component={Notifications} />
        <Stack.Screen name={Routes.HISTORY} component={History} />
        <Stack.Screen name={Routes.LANGUAGE} component={Language} />
        <Stack.Screen name={Routes.AUTH_STACK} component={AuthStack} />
        <Stack.Screen name={Routes.EDIT_PROFILE} component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
