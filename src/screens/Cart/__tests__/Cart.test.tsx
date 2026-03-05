import {
  calculateCartTotal,
  calculateCartQuantity,
  isCartEmpty,
  groupCartItemsBySize,
  isValidCartItem,
  CartItem,
} from '../utils';

const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Nike Shoe',
    price: 100,
    quantity: 2,
    selected_size: 42,
  },
  {
    id: 2,
    name: 'Adidas Shoe',
    price: 150,
    quantity: 1,
    selected_size: 40,
  },
];

describe('Cart Utils', () => {
  describe('calculateCartTotal', () => {
    it('calculates total price correctly', () => {
      const total = calculateCartTotal(mockCartItems);
      expect(total).toBe(350); // (100 * 2) + (150 * 1)
    });

    it('returns 0 for empty cart', () => {
      const total = calculateCartTotal([]);
      expect(total).toBe(0);
    });
  });

  describe('calculateCartQuantity', () => {
    it('calculates total quantity correctly', () => {
      const quantity = calculateCartQuantity(mockCartItems);
      expect(quantity).toBe(3); // 2 + 1
    });

    it('returns 0 for empty cart', () => {
      const quantity = calculateCartQuantity([]);
      expect(quantity).toBe(0);
    });
  });

  describe('isCartEmpty', () => {
    it('returns true for empty cart', () => {
      expect(isCartEmpty([])).toBe(true);
    });

    it('returns false for cart with items', () => {
      expect(isCartEmpty(mockCartItems)).toBe(false);
    });
  });

  describe('groupCartItemsBySize', () => {
    it('groups items by selected size', () => {
      const grouped = groupCartItemsBySize(mockCartItems);

      expect(grouped[42]).toHaveLength(1);
      expect(grouped[42][0].name).toBe('Nike Shoe');
      expect(grouped[40]).toHaveLength(1);
      expect(grouped[40][0].name).toBe('Adidas Shoe');
    });
  });

  describe('isValidCartItem', () => {
    it('validates correct cart item', () => {
      expect(isValidCartItem(mockCartItems[0])).toBe(true);
    });

    it('rejects invalid cart items', () => {
      expect(isValidCartItem(null)).toBe(false);
      expect(isValidCartItem({ id: 'string' })).toBe(false);
      expect(isValidCartItem({ id: 1, quantity: 0 })).toBe(false);
    });
  });
});
