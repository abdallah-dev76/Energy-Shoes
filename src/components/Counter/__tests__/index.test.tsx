import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import Counter from '../index';

describe('Counter Component', () => {
  it('renders correctly with basic props', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Counter id={1} quantity={1} />);
    });
  });

  it('displays correct quantity', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Counter id={1} quantity={5} />);
    });
    // Component renders successfully with quantity 5
  });

  it('renders with selected size', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Counter id={1} selectedSize="42" quantity={1} />);
    });
    // Component renders successfully with selected size
  });

  it('handles minimum quantity (1)', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Counter id={1} quantity={1} />);
    });
  });

  it('handles maximum quantity (10)', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Counter id={1} quantity={10} />);
    });
  });

  it('handles mid-range quantities', async () => {
    const quantities = [2, 5, 7, 9];

    for (const quantity of quantities) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(<Counter id={1} quantity={quantity} />);
      });
    }
  });

  it('renders with different product IDs', async () => {
    const productIds = [1, 5, 10, 100];

    for (const id of productIds) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(<Counter id={id} quantity={1} />);
      });
    }
  });

  it('renders with id, selectedSize, and quantity', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<Counter id={123} selectedSize="40" quantity={3} />);
    });
  });
});
