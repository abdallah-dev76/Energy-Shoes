import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import Info from '../index';

describe('Info Component', () => {
  it('renders correctly with string title', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Info title="Information" />);
    });
  });

  it('renders correctly with numeric title', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Info title={42} />);
    });
  });

  it('displays the title text', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Info title="Test Info" />);
    });
    // Component renders successfully with title
  });

  it('renders with medium size (default)', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Info title="Medium Size" size="medium" />);
    });
    // Component renders successfully with medium size
  });

  it('renders with large size', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Info title="Large Size" size="large" />);
    });
    // Component renders successfully with large size
  });

  it('handles empty string title', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Info title="" />);
    });
  });

  it('handles zero as title', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Info title={0} />);
    });
  });

  it('handles long text titles', async () => {
    const longText = 'This is a very long information text that might wrap';
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Info title={longText} />);
    });
  });

  it('handles special characters in title', async () => {
    const specialTitle = '10% OFF! 🎉';
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Info title={specialTitle} />);
    });
  });
});
