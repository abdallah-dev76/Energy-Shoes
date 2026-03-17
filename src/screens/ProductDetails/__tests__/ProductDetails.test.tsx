import { ProductDto } from '../../../constants';
import {
  createCartItem,
  createBuyNowProduct,
  getSimilarProducts,
  isValidProduct,
} from '../utils';

const mockProduct: ProductDto = {
  id: 1,
  name: 'Test Shoe',
  brand: 'Nike',
  gender: 'Unisex',
  category: 'Running',
  price: 100,
  items_left: 10,
  imageURL: 'image-url',
  average_rating: 4.5,
  average_counts: 100,
  available_sizes: [40, 41, 42, 43, 44],
  description: 'A great test shoe',
  discount: undefined,
  selected_size: undefined,
  quantity: undefined,
};

const mockProducts: ProductDto[] = [
  mockProduct,
  {
    id: 2,
    name: 'Nike Air Max',
    price: 150,
    brand: 'Nike',
    gender: 'Unisex',
    category: 'Running',
    items_left: 5,
    imageURL: 'image-url',
    average_rating: 4,
    average_counts: 50,
    available_sizes: [39, 40, 41],
    description: 'A great test shoe',
    discount: undefined,
    selected_size: undefined,
    quantity: undefined,
  },
  {
    id: 3,
    name: 'Adidas Runner',
    price: 120,
    brand: 'Adidas',
    gender: 'Unisex',
    category: 'Running',
    items_left: 8,
    imageURL: 'image-url',
    average_rating: 4.2,
    average_counts: 60,
    available_sizes: [40, 41, 42],
    description: 'A great test shoe',
    discount: undefined,
    selected_size: undefined,
    quantity: undefined,
  },
  {
    id: 4,
    name: 'Nike Pro',
    price: 200,
    brand: 'Nike',
    gender: 'Unisex',
    category: 'Running',
    items_left: 3,
    imageURL: 'image-url',
    average_rating: 4.8,
    average_counts: 80,
    available_sizes: [41, 42, 43],
    description: 'A great test shoe',
    discount: undefined,
    selected_size: undefined,
    quantity: undefined,
  },
];

describe('ProductDetails Utils', () => {
  describe('createCartItem', () => {
    it('creates cart item with selected size', () => {
      const cartItem = createCartItem(mockProduct, 2);

      expect(cartItem).toEqual({
        ...mockProduct,
        selected_size: 42,
      });
    });

    it('handles different size indices', () => {
      const cartItem = createCartItem(mockProduct, 0);

      expect(cartItem.selected_size).toBe(40);
    });
  });

  describe('createBuyNowProduct', () => {
    it('creates buy now product with selected size and quantity', () => {
      const buyNowProduct = createBuyNowProduct(mockProduct, 1);

      expect(buyNowProduct).toEqual({
        ...mockProduct,
        selected_size: 41 as never as string,
        quantity: 1,
      });
    });

    it('always sets quantity to 1', () => {
      const buyNowProduct = createBuyNowProduct(mockProduct, 3);

      expect(buyNowProduct.quantity).toBe(1);
      expect(buyNowProduct.selected_size).toBe(43 as never as string);
    });
  });

  describe('getSimilarProducts', () => {
    it('filters products by same brand excluding current product', () => {
      const similar = getSimilarProducts(mockProducts, mockProduct);

      expect(similar).toHaveLength(2);
      expect(similar.map(p => p.name)).toEqual(['Nike Air Max', 'Nike Pro']);
      expect(similar.every(p => p.brand === 'Nike')).toBe(true);
      expect(similar.every(p => p.name !== mockProduct.name)).toBe(true);
    });

    it('respects limit parameter', () => {
      const similar = getSimilarProducts(mockProducts, mockProduct, 1);

      expect(similar).toHaveLength(1);
      expect(similar[0].name).toBe('Nike Air Max');
    });

    it('returns empty array when no similar products found', () => {
      const uniqueProduct: ProductDto = {
        id: 5,
        name: 'Unique Shoe',
        price: 100,
        brand: 'Unique Brand',
        gender: 'Unisex',
        category: 'Running',
        items_left: 10,
        imageURL: 'image-url',
        average_rating: 4.5,
        average_counts: 100,
        available_sizes: [40],
        description: 'A great test shoe',
        discount: undefined,
        selected_size: undefined,
        quantity: undefined,
      };

      const similar = getSimilarProducts(mockProducts, uniqueProduct);

      expect(similar).toHaveLength(0);
    });
  });

  describe('isValidProduct', () => {
    it('returns true for valid product', () => {
      const result = isValidProduct(mockProduct);

      expect(result).toBe(true);
    });

    it('returns false for invalid product objects', () => {
      expect(isValidProduct(null)).toBe(false);
      expect(isValidProduct(undefined)).toBe(false);
      expect(isValidProduct({})).toBe(false);
      expect(isValidProduct({ id: 'string' })).toBe(false);
      expect(isValidProduct({ id: 1, name: 123 })).toBe(false);
      expect(
        isValidProduct({
          id: 1,
          name: 'test',
          price: 'not number',
          brand: 'test',
          available_sizes: [],
        }),
      ).toBe(false);
    });

    it('requires all essential properties', () => {
      const incomplete = {
        id: 1,
        name: 'Test',
        // missing price, brand, available_sizes
      };

      expect(isValidProduct(incomplete)).toBe(false);
    });
  });
});
