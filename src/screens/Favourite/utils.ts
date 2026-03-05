// Utility functions for Favourite screen that can be tested in isolation

export interface FavouriteItem {
  id: number;
  name: string;
  price: number;
  brand: string;
  rating?: number;
  [key: string]: any;
}

/**
 * Filter favourites by brand
 */
export const filterFavouritesByBrand = (
  favourites: FavouriteItem[],
  brand: string,
): FavouriteItem[] => {
  return favourites.filter(
    item => item.brand.toLowerCase() === brand.toLowerCase(),
  );
};

/**
 * Sort favourites by rating (highest first)
 */
export const sortFavouritesByRating = (
  favourites: FavouriteItem[],
): FavouriteItem[] => {
  return [...favourites].sort((a, b) => (b.rating || 0) - (a.rating || 0));
};

/**
 * Sort favourites by price
 */
export const sortFavouritesByPrice = (
  favourites: FavouriteItem[],
  ascending: boolean = true,
): FavouriteItem[] => {
  return [...favourites].sort((a, b) =>
    ascending ? a.price - b.price : b.price - a.price,
  );
};

/**
 * Check if item is in favourites
 */
export const isFavourite = (
  favourites: FavouriteItem[],
  itemId: number,
): boolean => {
  return favourites.some(item => item.id === itemId);
};

/**
 * Get favourite item by id
 */
export const getFavouriteById = (
  favourites: FavouriteItem[],
  itemId: number,
): FavouriteItem | undefined => {
  return favourites.find(item => item.id === itemId);
};

/**
 * Check if favourites list is empty
 */
export const isFavouritesEmpty = (favourites: FavouriteItem[]): boolean => {
  return favourites.length === 0;
};
