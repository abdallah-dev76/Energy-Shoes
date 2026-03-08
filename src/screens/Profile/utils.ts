// Utility functions for Profile screen that can be tested in isolation

export interface User {
  name: string;
  email?: string;
  phone?: string;
  isLoggedIn: boolean;
  imageProfile?: string | null;
  [key: string]: any;
}

export interface Order {
  id: number;
  date: string;
  total: number;
  status: string;
  items: any[];
}

/**
 * Check if user is logged in
 */
export const isUserLoggedIn = (user: User): boolean => {
  return user.isLoggedIn === true;
};

/**
 * Check if user profile is complete
 */
export const isProfileComplete = (user: User): boolean => {
  return !!(user.name && user.email && user.phone);
};

/**
 * Get user display name
 */
export const getUserDisplayName = (user: User): string => {
  return user.name || 'Guest User';
};

/**
 * Calculate total order value
 */
export const calculateTotalOrderValue = (orders: Order[]): number => {
  return orders.reduce((total, order) => total + order.total, 0);
};

/**
 * Get recent orders (last n orders)
 */
export const getRecentOrders = (
  orders: Order[],
  limit: number = 5,
): Order[] => {
  return orders
    .slice(0, limit)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

/**
 * Filter orders by status
 */
export const filterOrdersByStatus = (
  orders: Order[],
  status: string,
): Order[] => {
  return orders.filter(
    order => order.status.toLowerCase() === status.toLowerCase(),
  );
};

/**
 * Validate user object
 */
export const isValidUser = (user: any): user is User => {
  return (
    user &&
    typeof user.name === 'string' &&
    typeof user.isLoggedIn === 'boolean'
  );
};
