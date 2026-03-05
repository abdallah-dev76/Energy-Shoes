// Mock i18next translation functions
export const mockT = jest.fn((key: string) => key);
export const mockChangeLanguage = jest.fn();

export const mockI18n = {
  t: mockT,
  changeLanguage: mockChangeLanguage,
  language: 'en',
  languages: ['en', 'ar'],
  isInitialized: true,
  use: jest.fn(),
  init: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  loadNamespaces: jest.fn(),
  setDefaultNamespace: jest.fn(),
};

// Mock useTranslation hook
export const mockUseTranslation = () => ({
  t: mockT,
  i18n: mockI18n,
  ready: true,
});

// Reset i18n mocks
export const resetI18nMocks = () => {
  mockT.mockClear();
  mockChangeLanguage.mockClear();
};
