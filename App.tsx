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

function App() {
  return <AppContent />;
}

function AppContent() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider>
          <SheetProvider>
            <MainStack />
            <Toast />
          </SheetProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
