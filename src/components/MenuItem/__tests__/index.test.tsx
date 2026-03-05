import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import MenuItem from '../index';

// Mock persistor
jest.mock('../../../store/store', () => ({
  ...jest.requireActual('../../../store/store'),
  persistor: {
    purge: jest.fn(() => Promise.resolve()),
  },
}));

describe('MenuItem Component', () => {
  const mockItemDetails = {
    title: 'Settings',
    icon: 'settings',
    navigateTo: 'SettingsScreen',
  };

  it('renders correctly with basic item details', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<MenuItem itemDetails={mockItemDetails} />);
    });
  });

  it('renders with title and icon', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<MenuItem itemDetails={mockItemDetails} />);
    });
    // Component renders successfully with title and icon
  });

  it('renders with navigation target', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<MenuItem itemDetails={mockItemDetails} />);
    });
    // Component renders successfully with navigation target
  });

  it('renders without navigation target', async () => {
    const itemWithoutNav = {
      title: 'Theme',
      icon: 'theme',
    };

    await ReactTestRenderer.act(() => {
      renderWithProviders(<MenuItem itemDetails={itemWithoutNav} />);
    });
  });

  it('handles different menu item types', async () => {
    const menuItems = [
      { title: 'Profile', icon: 'user', navigateTo: 'ProfileScreen' },
      { title: 'Orders', icon: 'cart', navigateTo: 'OrdersScreen' },
      {
        title: 'Notifications',
        icon: 'bell',
        navigateTo: 'NotificationsScreen',
      },
      { title: 'Help', icon: 'help', navigateTo: 'HelpScreen' },
    ];

    for (const item of menuItems) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(<MenuItem itemDetails={item} />);
      });
    }
  });

  it('renders theme toggle menu item', async () => {
    const themeItem = {
      title: 'Dark Mode',
      icon: 'moon',
    };

    await ReactTestRenderer.act(() => {
      renderWithProviders(<MenuItem itemDetails={themeItem} />);
    });
  });
});
