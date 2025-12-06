import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import {getBooleanData, storeData} from '../utils';
import {MMKV_KEYS, Theme} from '../constants';
import {colorsDark, colorsLight} from './colors';

type ThemeContextType = {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const themes = {
  light: colorsLight,
  dark: colorsDark,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({children}: PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    () => getBooleanData(MMKV_KEYS.THEME) ?? false,
  );
  useEffect(() => {
    storeData(MMKV_KEYS.THEME, isDarkMode);
  }, [isDarkMode]);
  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const value = useMemo(() => {
    return {
      theme: isDarkMode ? themes.dark : themes.light,
      toggleTheme,
      isDarkMode,
    };
  }, [toggleTheme, isDarkMode]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
