import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import ChangePicture from '../index';

describe('ChangePicture Component', () => {
  it('renders correctly', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<ChangePicture />);
    });
  });

  it('renders without crashing', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<ChangePicture />);
    });

    expect(component).toBeTruthy();
  });

  it('renders with store providing user data', async () => {
    const preloadedState = {
      user: {
        name: 'Test User',
        email: 'test@example.com',
        imageProfile: null,
      },
    };

    await ReactTestRenderer.act(() => {
      renderWithProviders(<ChangePicture />, { preloadedState });
    });
  });

  it('renders with existing user image', async () => {
    const preloadedState = {
      user: {
        name: 'Test User',
        email: 'test@example.com',
        imageProfile: 'https://example.com/avatar.jpg',
      },
    };

    await ReactTestRenderer.act(() => {
      renderWithProviders(<ChangePicture />, { preloadedState });
    });
  });

  it('handles component mount and unmount', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<ChangePicture />);
    });

    // Unmount component
    await ReactTestRenderer.act(() => {
      component.unmount();
    });
  });
});
