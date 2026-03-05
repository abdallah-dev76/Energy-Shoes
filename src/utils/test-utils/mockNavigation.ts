// Mock navigation functions for testing
export const mockNavigate = jest.fn();
export const mockGoBack = jest.fn();
export const mockPush = jest.fn();
export const mockReplace = jest.fn();
export const mockReset = jest.fn();
export const mockSetParams = jest.fn();

export const mockNavigation = {
  navigate: mockNavigate,
  goBack: mockGoBack,
  push: mockPush,
  replace: mockReplace,
  reset: mockReset,
  setParams: mockSetParams,
  dispatch: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  addListener: jest.fn(() => jest.fn()),
  removeListener: jest.fn(),
  setOptions: jest.fn(),
  getId: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
};

export const mockRoute = {
  key: 'test-route-key',
  name: 'TestScreen',
  params: {},
  path: undefined,
};

// Mock useNavigation hook
export const mockUseNavigation = () => mockNavigation;

// Mock useRoute hook
export const mockUseRoute = () => mockRoute;

// Reset all navigation mocks
export const resetNavigationMocks = () => {
  mockNavigate.mockClear();
  mockGoBack.mockClear();
  mockPush.mockClear();
  mockReplace.mockClear();
  mockReset.mockClear();
  mockSetParams.mockClear();
};
