import React, { PropsWithChildren } from 'react';
import { colorsLight } from '../../theme/colors';

// Mock theme context for testing
export const mockTheme = {
  theme: colorsLight,
  isDarkMode: false,
  toggleTheme: jest.fn(),
};

// Mock useAppTheme hook
export const mockUseAppTheme = () => mockTheme;

// Mock ThemeProvider for wrapping components in tests
export const MockThemeProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return <>{children}</>;
};
