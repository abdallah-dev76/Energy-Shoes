import {
  filterFavouritesByBrand,
  sortFavouritesByRating,
  sortFavouritesByPrice,
  isFavourite,
  getFavouriteById,
  isFavouritesEmpty,
  FavouriteItem,
} from '../utils';

const mockFavourites: FavouriteItem[] = [
  {
    id: 1,
    name: 'Nike Air',
    price: 100,
    brand: 'Nike',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Adidas Run',
    price: 80,
    brand: 'Adidas',
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Nike Pro',
    price: 150,
    brand: 'Nike',
    rating: 4.8,
  },
];

describe('Favourite Utils', () => {
  describe('filterFavouritesByBrand', () => {
    it('filters favourites by brand correctly', () => {
      const nikeItems = filterFavouritesByBrand(mockFavourites, 'Nike');
      expect(nikeItems).toHaveLength(2);
      expect(nikeItems.every(item => item.brand === 'Nike')).toBe(true);
    });

    it('is case insensitive', () => {
      const nikeItems = filterFavouritesByBrand(mockFavourites, 'nike');
      expect(nikeItems).toHaveLength(2);
    });
  });

  describe('sortFavouritesByRating', () => {
    it('sorts by rating descending', () => {
      const sorted = sortFavouritesByRating(mockFavourites);
      expect(sorted[0].rating).toBe(4.8);
      expect(sorted[1].rating).toBe(4.5);
      expect(sorted[2].rating).toBe(4.2);
    });
  });

  describe('sortFavouritesByPrice', () => {
    it('sorts by price ascending by default', () => {
      const sorted = sortFavouritesByPrice(mockFavourites);
      expect(sorted.map(item => item.price)).toEqual([80, 100, 150]);
    });

    it('sorts by price descending when specified', () => {
      const sorted = sortFavouritesByPrice(mockFavourites, false);
      expect(sorted.map(item => item.price)).toEqual([150, 100, 80]);
    });
  });

  describe('isFavourite', () => {
    it('returns true if item is in favourites', () => {
      expect(isFavourite(mockFavourites, 1)).toBe(true);
    });

    it('returns false if item is not in favourites', () => {
      expect(isFavourite(mockFavourites, 999)).toBe(false);
    });
  });

  describe('getFavouriteById', () => {
    it('returns favourite item by id', () => {
      const item = getFavouriteById(mockFavourites, 2);
      expect(item?.name).toBe('Adidas Run');
    });

    it('returns undefined for non-existent id', () => {
      const item = getFavouriteById(mockFavourites, 999);
      expect(item).toBeUndefined();
    });
  });

  describe('isFavouritesEmpty', () => {
    it('returns true for empty favourites', () => {
      expect(isFavouritesEmpty([])).toBe(true);
    });

    it('returns false for favourites with items', () => {
      expect(isFavouritesEmpty(mockFavourites)).toBe(false);
    });
  });
});
