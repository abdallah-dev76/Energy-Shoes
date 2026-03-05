import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import SearchBar from '../index';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();
  const mockOnSearchPress = jest.fn();
  const mockOnSearchSubmit = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    mockOnSearchPress.mockClear();
    mockOnSearchSubmit.mockClear();
  });

  it('renders correctly without props', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<SearchBar />);
    });
  });

  it('accepts onSearch callback', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<SearchBar onSearch={mockOnSearch} />);
    });
    // Component renders successfully with onSearch callback
  });

  it('accepts onSearchPress callback', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<SearchBar onSearchPress={mockOnSearchPress} />);
    });
    // Component renders successfully with onSearchPress callback
  });

  it('accepts onSearchSubmit callback', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<SearchBar onSearchSubmit={mockOnSearchSubmit} />);
    });
    // Component renders successfully with onSearchSubmit callback
  });

  it('renders with isAutoFocus enabled', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<SearchBar isAutoFocus={true} />);
    });
    // Component renders successfully with isAutoFocus enabled
  });

  it('renders with isAutoFocus disabled', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<SearchBar isAutoFocus={false} />);
    });
    // Component renders successfully with isAutoFocus disabled
  });

  it('renders with all callbacks', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <SearchBar
          onSearch={mockOnSearch}
          onSearchPress={mockOnSearchPress}
          onSearchSubmit={mockOnSearchSubmit}
        />,
      );
    });
  });

  it('renders with autoFocus and all callbacks', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <SearchBar
          onSearch={mockOnSearch}
          onSearchPress={mockOnSearchPress}
          onSearchSubmit={mockOnSearchSubmit}
          isAutoFocus={true}
        />,
      );
    });
  });
});
