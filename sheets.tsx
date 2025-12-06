import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';
import { AddToCart, ChangePicture } from './src/components';
import { ProductDto } from './src/constants';
registerSheet('add-to-cart-sheet', AddToCart);
registerSheet('change-picture-sheet', ChangePicture);
// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'change-picture-sheet': SheetDefinition;
    'add-to-cart-sheet': SheetDefinition<{ payload: { product: ProductDto } }>;
  }
}

export {};
