import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {cartReducer, favouriteReducer, userSlice} from './slices';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistStore from 'redux-persist/es/persistStore';
const combinedReducers = combineReducers({
  cart: cartReducer,
  favourite: favouriteReducer,
  user: userSlice,
});

const presistConfigurations = {
  key: 'root',
  storage: AsyncStorage,
};

const presistedCombinedReducers = persistReducer(
  presistConfigurations,
  combinedReducers,
);

export const store = configureStore({
  reducer: presistedCombinedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // 👇 skip redux‑persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // optional: if you still get a path warning, ignore it too
        ignoredActionPaths: ['register', 'rehydrate'],
      },
    }),
});

export const persistor = persistStore(store);
// persistor.purge();
//persistor.purge() is a method provided by redux-persist that clears all persisted state from the storage (like localStorage or AsyncStorage).
// This is useful if you want to reset the stored Redux state, such as when:
//Logging out a user.
//Clearing corrupted state.
//Resetting the app.
//purge() returns a promise so u can use .then() with it
export type RootState = ReturnType<typeof store.getState>;
