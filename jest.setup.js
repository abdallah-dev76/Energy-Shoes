// Mock native modules for Jest
import 'react-native-gesture-handler/jestSetup';

// Mock utility functions
jest.mock('./src/utils', () => ({
  px: jest.fn(value => value),
  pxH: jest.fn(value => value),
  pxW: jest.fn(value => value),
  moderateScale: jest.fn(value => value),
  toast: jest.fn(),
  storeData: jest.fn(),
  getBooleanData: jest.fn(),
  getData: jest.fn(),
  applyDiscount: jest.fn((price, discount) => price - (price * discount) / 100),
  translate: jest.fn(key => key),
}));

// Mock Animated.Value related methods
globalThis.Animated = {
  ...globalThis.Animated,
  Value: jest.fn(() => ({
    interpolate: jest.fn(() => '#000000'),
    setValue: jest.fn(),
  })),
};

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const { View, Text, ScrollView, Image } = require('react-native');

  const Reanimated = {
    default: {
      View,
      Text,
      ScrollView,
      Image,
      createAnimatedComponent: Component => Component,
    },
    View,
    Text,
    ScrollView,
    Image,
    createAnimatedComponent: Component => Component,
    useSharedValue: jest.fn(() => ({ value: 0 })),
    useAnimatedStyle: jest.fn(() => ({})),
    withSpring: jest.fn(toValue => toValue),
    withTiming: jest.fn(toValue => toValue),
    withSequence: jest.fn((..._animations) => 0),
    Easing: {
      linear: jest.fn(),
      ease: jest.fn(),
      quad: jest.fn(),
      bezier: jest.fn(),
    },
  };

  return Reanimated;
});

// Mock react-native-actions-sheet
jest.mock('react-native-actions-sheet', () => {
  const React = require('react');
  const ActionSheet = ({ children }) =>
    React.createElement('View', { testID: 'action-sheet' }, children);
  return {
    __esModule: true,
    default: ActionSheet,
    SheetManager: {
      show: jest.fn(),
      hide: jest.fn(),
    },
    registerSheet: jest.fn(),
    SheetProvider: ({ children }) => children,
  };
});

// Mock react-native-localize
jest.mock('react-native-localize', () => ({
  getLocales: jest.fn(() => [{ languageCode: 'en', countryCode: 'US' }]),
  findBestAvailableLanguage: jest.fn(() => ({
    languageTag: 'en',
    isRTL: false,
  })),
  getNumberFormatSettings: jest.fn(() => ({
    decimalSeparator: '.',
    groupingSeparator: ',',
  })),
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaConsumer: ({ children }) => children(inset),
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
  };
});

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      reset: jest.fn(),
      setParams: jest.fn(),
      dispatch: jest.fn(),
      isFocused: jest.fn(() => true),
      canGoBack: jest.fn(() => true),
      addListener: jest.fn(() => jest.fn()),
      removeListener: jest.fn(),
      setOptions: jest.fn(),
      getId: jest.fn(),
      getParent: jest.fn(),
      getState: jest.fn(),
    }),
    useRoute: () => ({
      key: 'test-route-key',
      name: 'TestScreen',
      params: {
        product: {
          id: 1,
          name: 'Test Shoe',
          price: 100,
          images: ['test-image1.jpg', 'test-image2.jpg'],
          brand: 'Nike',
          rating: 4.5,
          description: 'A great test shoe',
          sizes: [40, 41, 42, 43, 44],
          colors: ['Black', 'White', 'Red'],
        },
      },
      path: undefined,
    }),
    useFocusEffect: jest.fn(),
    useIsFocused: jest.fn(() => true),
  };
});

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn(key => key),
    i18n: {
      t: jest.fn(key => key),
      changeLanguage: jest.fn(),
      language: 'en',
      languages: ['en', 'ar'],
      isInitialized: true,
    },
    ready: true,
  }),
  Trans: ({ children }) => children,
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

// Mock useAppTheme hook
jest.mock('./src/theme', () => ({
  ...jest.requireActual('./src/theme'),
  useAppTheme: () => ({
    theme: {
      backgroundColor: '#f5f4f4',
      primaryText: '#2A2D35',
      secondaryText: 'rgba(60, 60, 67, 0.6)',
      tabBarBackgroundColor: '#FFFFFF',
      textInputBackground: '#FFFFFF',
      cardBackground: '#FFFFFF',
      infoBackground: '#FFFFFF',
      infoBorder: '#aaa',
      iconBackground: '#7A7A7A',
      bottomSheetBackground: '#FFFFFF',
      dropdownBackgroundColor: '#FFFFFF',
      activeDropDown: '#7A7A7A',
    },
    isDarkMode: false,
    toggleTheme: jest.fn(),
  }),
}));

// Mock @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
    getAllKeys: jest.fn(() => Promise.resolve([])),
    multiGet: jest.fn(() => Promise.resolve([])),
    multiSet: jest.fn(() => Promise.resolve()),
    multiRemove: jest.fn(() => Promise.resolve()),
  },
}));

// Mock redux-persist
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
    persistStore: jest.fn().mockImplementation(() => ({
      purge: jest.fn(() => Promise.resolve()),
      flush: jest.fn(() => Promise.resolve()),
      pause: jest.fn(),
      persist: jest.fn(),
    })),
  };
});

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    getBoolean: jest.fn(),
    getNumber: jest.fn(),
    delete: jest.fn(),
    clearAll: jest.fn(),
    getAllKeys: jest.fn(() => []),
  })),
}));

// Mock @notifee/react-native
jest.mock('@notifee/react-native', () => ({
  default: {
    requestPermission: jest.fn(() =>
      Promise.resolve({ authorizationStatus: 1 }),
    ),
    displayNotification: jest.fn(() => Promise.resolve()),
    createChannel: jest.fn(() => Promise.resolve()),
    onBackgroundEvent: jest.fn(),
  },
}));

// Mock @react-native-firebase/messaging
jest.mock('@react-native-firebase/messaging', () => {
  return () => ({
    getToken: jest.fn(() => Promise.resolve('mock-token')),
    requestPermission: jest.fn(() => Promise.resolve(1)),
    hasPermission: jest.fn(() => Promise.resolve(1)),
    onMessage: jest.fn(() => jest.fn()),
    onNotificationOpenedApp: jest.fn(() => jest.fn()),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
    setBackgroundMessageHandler: jest.fn(),
  });
});

// Mock react-native-image-picker
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
  launchCamera: jest.fn(),
}));

// Mock react-native-permissions
jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {
    IOS: { CAMERA: 'ios.permission.CAMERA' },
    ANDROID: { CAMERA: 'android.permission.CAMERA' },
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    BLOCKED: 'blocked',
  },
  request: jest.fn(() => Promise.resolve('granted')),
  check: jest.fn(() => Promise.resolve('granted')),
}));

// Mock Lottie
jest.mock('lottie-react-native', () => {
  const React = require('react');
  return React.forwardRef((props, ref) => {
    return null;
  });
});

// Mock IcoMoon (custom icon)
jest.mock('./src/components/Icon', () => {
  return {
    __esModule: true,
    default: ({ name, size, color }) => null,
  };
});

// Silence the warning: Animated: `useNativeDriver` is not supported
// Note: react-native preset handles this automatically

// Mock console methods to reduce noise in tests
globalThis.console = {
  ...globalThis.console,
  error: jest.fn(),
  warn: jest.fn(),
};
