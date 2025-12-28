import './src/localization/i18next';
import React from 'react';
import { ThemeProvider } from './src/theme';
import { MainStack } from './src/navigation';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store/store';
import './sheets.tsx';
import { SheetProvider } from 'react-native-actions-sheet';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { useNotifications } from './src/notifications/index.tsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';

function App() {
  useNotifications();

  return <AppContent />;
}

function AppContent() {
  if (__DEV__) {
    LogBox.ignoreAllLogs(true);
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider>
          <SheetProvider>
            <SafeAreaProvider>
              <MainStack />
              <Toast />
            </SafeAreaProvider>
          </SheetProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
