module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-reanimated|react-native-actions-sheet|react-native-gesture-handler|react-native-mmkv|@notifee|@react-native-firebase|lottie-react-native|react-redux|@reduxjs|immer|react-native-localize|react-native-worklets|react-native-switch|redux-persist|react-native-toast-message)/)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg|ttf|otf|woff|woff2)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/android/',
    '<rootDir>/ios/',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/utils/test-utils/**',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
};
