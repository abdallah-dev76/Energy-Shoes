import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import CartCard from '../index';

const mockProduct = {
  id: 1,
  name: 'Test Shoe',
  imageURL: 'https://example.com/shoe.jpg',
  price: 99.99,
  selected_size: '42',
  quantity: 2,
  category: 'Running',
  available_sizes: [40, 41, 42, 43],
  average_rating: 4.5,
};

describe('CartCard Component', () => {
  it('renders correctly with product data', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<CartCard product={mockProduct} />);
    });
  });

  it('displays product information', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<CartCard product={mockProduct} />);
    });

    const cartCardElement = component.root.findByType(CartCard);
    expect(cartCardElement.props.product.name).toBe('Test Shoe');
    expect(cartCardElement.props.product.price).toBe(99.99);
  });

  it('displays selected size', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<CartCard product={mockProduct} />);
    });

    const cartCardElement = component.root.findByType(CartCard);
    expect(cartCardElement.props.product.selected_size).toBe('42');
  });

  it('displays quantity', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<CartCard product={mockProduct} />);
    });

    const cartCardElement = component.root.findByType(CartCard);
    expect(cartCardElement.props.product.quantity).toBe(2);
  });

  it('handles minimum quantity', async () => {
    const productWithMinQty = { ...mockProduct, quantity: 1 };
    await ReactTestRenderer.act(() => {
      renderWithProviders(<CartCard product={productWithMinQty} />);
    });
  });

  it('handles maximum quantity', async () => {
    const productWithMaxQty = { ...mockProduct, quantity: 10 };
    await ReactTestRenderer.act(() => {
      renderWithProviders(<CartCard product={productWithMaxQty} />);
    });
  });

  it('renders with different sizes', async () => {
    const sizes = ['38', '40', '42', '44', '46'];

    for (const size of sizes) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <CartCard product={{ ...mockProduct, selected_size: size }} />,
        );
      });
    }
  });

  it('renders with different quantities', async () => {
    const quantities = [1, 3, 5, 7, 10];

    for (const quantity of quantities) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <CartCard product={{ ...mockProduct, quantity }} />,
        );
      });
    }
  });

  it('renders with different product IDs', async () => {
    const productIds = [1, 10, 100, 1000];

    for (const id of productIds) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(<CartCard product={{ ...mockProduct, id }} />);
      });
    }
  });
});
