import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import AddToCart from '../index';
import { ProductDto } from '../../../constants';

const mockPayload = {
  product: {
    id: 1,
    name: 'Test Shoe',
    imageURL: 'https://example.com/shoe.jpg',
    price: 99.99,
    available_sizes: [8, 9, 10, 11, 12],
    category: 'Running',
    average_rating: 4.5,
  } as ProductDto,
};

it('renders correctly with product payload', async () => {
  await ReactTestRenderer.act(() => {
    renderWithProviders(
      <AddToCart payload={mockPayload} sheetId="add-to-cart-sheet" />,
    );
  });
});

it('handles product with multiple sizes', async () => {
  const productWithManySizes = {
    product: {
      ...mockPayload.product,
      available_sizes: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    },
  };

  await ReactTestRenderer.act(() => {
    renderWithProviders(
      <AddToCart payload={productWithManySizes} sheetId="add-to-cart-sheet" />,
    );
  });
});

it('handles product with few sizes', async () => {
  const productWithFewSizes = {
    product: {
      ...mockPayload.product,
      available_sizes: [9, 10],
    },
  };

  await ReactTestRenderer.act(() => {
    renderWithProviders(
      <AddToCart payload={productWithFewSizes} sheetId="add-to-cart-sheet" />,
    );
  });
});