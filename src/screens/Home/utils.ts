// Utility functions for Home screen that can be tested in isolation

export interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  category?: string;
  rating?: number;
  imageURL?: string;
  [key: string]: any;
}

/**
 * Filter products by category
 */
export const filterProductsByCategory = (
  products: Product[],
  category: string,
): Product[] => {
  return products.filter(
    product => product.category?.toLowerCase() === category.toLowerCase(),
  );
};

/**
 * Filter products by brand
 */
export const filterProductsByBrand = (
  products: Product[],
  brand: string,
): Product[] => {
  return products.filter(
    product => product.brand.toLowerCase() === brand.toLowerCase(),
  );
};

/**
 * Sort products by price
 */
export const sortProductsByPrice = (
  products: Product[],
  ascending: boolean = true,
): Product[] => {
  return [...products].sort((a, b) =>
    ascending ? a.price - b.price : b.price - a.price,
  );
};

/**
 * Sort products by rating
 */
export const sortProductsByRating = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));
};

/**
 * Search products by name
 */
export const searchProductsByName = (
  products: Product[],
  searchTerm: string,
): Product[] => {
  const term = searchTerm.toLowerCase();
  return products.filter(product => product.name.toLowerCase().includes(term));
};

/**
 * Get featured products (top rated)
 */
export const getFeaturedProducts = (
  products: Product[],
  limit: number = 4,
): Product[] => {
  return sortProductsByRating(products).slice(0, limit);
};

/**
 * Check if products array is empty
 */
export const hasProducts = (products: Product[]): boolean => {
  return products.length > 0;
};
