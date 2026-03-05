import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { renderWithProviders } from '../../../utils/test-utils';
import FavouriteCard from '../index';

const mockProduct = {
  id: 1,
  name: 'Test Shoe',
  imageURL: 'https://example.com/shoe.jpg',
  price: 99.99,
  average_rating: 4.5,
  category: 'Running Shoes',
  available_sizes: [40, 41, 42, 43],
};

describe('FavouriteCard Component', () => {
  it('renders correctly with product data', async () => {
    await ReactTestRenderer.act(() => {
      renderWithProviders(<FavouriteCard product={mockProduct} />);
    });
  });

  it('displays product information', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<FavouriteCard product={mockProduct} />);
    });

    const favouriteCardElement = component.root.findByType(FavouriteCard);
    expect(favouriteCardElement.props.product.name).toBe('Test Shoe');
    expect(favouriteCardElement.props.product.price).toBe(99.99);
  });

  it('displays product category', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<FavouriteCard product={mockProduct} />);
    });

    const favouriteCardElement = component.root.findByType(FavouriteCard);
    expect(favouriteCardElement.props.product.category).toBe('Running Shoes');
  });

  it('displays product rating', async () => {
    let component: any;
    await ReactTestRenderer.act(() => {
      component = renderWithProviders(<FavouriteCard product={mockProduct} />);
    });

    const favouriteCardElement = component.root.findByType(FavouriteCard);
    expect(favouriteCardElement.props.product.average_rating).toBe(4.5);
  });

  it('handles different ratings', async () => {
    const ratings = [3.0, 3.5, 4.0, 4.5, 5.0];

    for (const rating of ratings) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <FavouriteCard
            product={{ ...mockProduct, average_rating: rating }}
          />,
        );
      });
    }
  });

  it('handles different categories', async () => {
    const categories = ['Running', 'Casual', 'Formal', 'Sports', 'Training'];

    for (const category of categories) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <FavouriteCard product={{ ...mockProduct, category }} />,
        );
      });
    }
  });

  it('handles different prices', async () => {
    const prices = [49.99, 79.99, 99.99, 149.99, 199.99];

    for (const price of prices) {
      await ReactTestRenderer.act(() => {
        renderWithProviders(
          <FavouriteCard product={{ ...mockProduct, price }} />,
        );
      });
    }
  });

  it('renders with long product name', async () => {
    const longName = 'Very Long Product Name That Should Be Truncated';
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <FavouriteCard product={{ ...mockProduct, name: longName }} />,
      );
    });
  });

  it('renders with long category name', async () => {
    const longCategory = 'Professional Running and Training Shoes';
    await ReactTestRenderer.act(() => {
      renderWithProviders(
        <FavouriteCard product={{ ...mockProduct, category: longCategory }} />,
      );
    });
  });
});
