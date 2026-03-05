// Utility functions for Cart screen that can be tested in isolation

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  selected_size: number | string;
  [key: string]: any;
}

/**
 * Calculate total price for cart items
 */
export const calculateCartTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
};

/**
 * Calculate total quantity of items in cart
 */
export const calculateCartQuantity = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Check if cart is empty
 */
export const isCartEmpty = (cartItems: CartItem[]): boolean => {
  return cartItems.length === 0;
};

/**
 * Group cart items by selected size
 */
export const groupCartItemsBySize = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, item) => {
    const size = item.selected_size;
    if (!acc[size]) {
      acc[size] = [];
    }
    acc[size].push(item);
    return acc;
  }, {} as Record<string | number, CartItem[]>);
};

/**
 * Validate cart item structure
 */
export const isValidCartItem = (item: any): item is CartItem => {
  return (
    item != null &&
    typeof item === 'object' &&
    typeof item.id === 'number' &&
    typeof item.name === 'string' &&
    typeof item.price === 'number' &&
    typeof item.quantity === 'number' &&
    item.quantity > 0 &&
    (typeof item.selected_size === 'number' ||
      typeof item.selected_size === 'string')
  );
};
