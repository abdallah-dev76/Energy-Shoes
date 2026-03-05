import { configureStore } from '@reduxjs/toolkit';
import {
  cartReducer,
  favouriteReducer,
  notificationsReducer,
  userReducer,
  ordersReducer,
} from '../../store/slices';

// Create a mock store WITHOUT persistence for testing
export const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      favourite: favouriteReducer,
      user: userReducer,
      notifications: notificationsReducer,
      orders: ordersReducer,
    },
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });
};

// Default mock state for tests
export const mockStoreState = {
  cart: [],
  favourite: [],
  user: {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    isLoggedIn: false,
    imageProfile: null,
  },
  notifications: [],
  orders: [],
};

export type MockStoreType = ReturnType<typeof createMockStore>;
