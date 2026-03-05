import React, { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import ReactTestRenderer from 'react-test-renderer';
import { createMockStore, mockStoreState, MockStoreType } from './mockStore';
import { MockThemeProvider } from './mockTheme';

// Custom render function that wraps components with all necessary providers
interface RenderOptions {
  store?: MockStoreType;
  preloadedState?: any;
}

export const AllTheProviders: React.FC<
  PropsWithChildren<{ store: MockStoreType }>
> = ({ children, store }) => {
  return (
    <Provider store={store}>
      <MockThemeProvider>{children}</MockThemeProvider>
    </Provider>
  );
};

export const renderWithProviders = (
  component: ReactElement,
  options: RenderOptions = {},
) => {
  const { store = createMockStore(options.preloadedState || mockStoreState) } =
    options;

  const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
    <AllTheProviders store={store}>{children}</AllTheProviders>
  );

  const renderer = ReactTestRenderer.create(<Wrapper>{component}</Wrapper>);

  return renderer;
};

// Re-export all mocks for easy access
export * from './mockStore';
export * from './mockTheme';
export * from './mockNavigation';
export * from './mockI18next';

// Export ReactTestRenderer utilities
export { ReactTestRenderer };
