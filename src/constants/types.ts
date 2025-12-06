import {colorsLight} from '../theme/colors';

export type Theme = typeof colorsLight;

export interface ProductDto {
  id: number;
  name: string;
  brand: string;
  gender: string;
  category: string;
  price: number;
  items_left: number;
  imageURL: string;
  average_rating: number;
  average_counts: number;
  available_sizes: number[];
  description: string;
  discount?: string;
  selected_size?: string;
}

export type RootStackParamList = {
  home: undefined;
  homeBottomTabs: undefined;
  productDetails: {product: ProductDto};
  cart: undefined;
  favourite: undefined;
  search: undefined;
  profile: undefined;
  login: undefined;
  signup: undefined;
  register: undefined;
  viewAllProducts: {currentCategory: string};
  payment: undefined;
  history: undefined;
  notifications: undefined;
  language: undefined;
  authStack: undefined;
};
