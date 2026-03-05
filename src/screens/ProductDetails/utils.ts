// Utility functions for ProductDetails screen that can be tested in isolation

import { ProductDto } from '../../constants';

export type Product = ProductDto;

/**
 * Creates cart item from product with selected size
 */
export const createCartItem = (product: Product, selectedSizeIndex: number) => {
  return {
    ...product,
    selected_size: product.available_sizes[selectedSizeIndex],
  };
};

/**
 * Creates buy now product object for checkout
 */
export const createBuyNowProduct = (
  product: Product,
  selectedSizeIndex: number,
) => {
  return {
    ...product,
    selected_size: product.available_sizes[
      selectedSizeIndex
    ] as never as string,
    quantity: 1,
  };
};

/**
 * Filters similar products by brand (excluding current product)
 */
export const getSimilarProducts = (
  allProducts: Product[],
  currentProduct: Product,
  limit: number = 4,
) => {
  return allProducts
    .filter(
      item =>
        item.brand === currentProduct.brand &&
        item.name !== currentProduct.name,
    )
    .slice(0, limit);
};

/**
 * Validates if product has required properties
 */
export const isValidProduct = (product: any): product is Product => {
  return (
    product != null &&
    typeof product === 'object' &&
    typeof product.id === 'number' &&
    typeof product.name === 'string' &&
    typeof product.price === 'number' &&
    typeof product.brand === 'string' &&
    Array.isArray(product.available_sizes)
  );
};
