import { createSlice } from '@reduxjs/toolkit';
import { ProductDto } from '../../constants';
import { toast } from '../../utils';

const initialState: ProductDto[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      const isItemExist = state.find(
        product =>
          product.id === action.payload.id &&
          product.selected_size === action.payload.selected_size,
      );
      if (!isItemExist) {
        state.push({ ...action.payload, quantity: 1 });
        toast('✅ Added To Cart', 'success');
      } else {
        isItemExist.quantity = (isItemExist.quantity || 1) + 1;
        toast('✅ Quantity increased', 'success');
      }
    },
    remove: (state, action) => {
      toast('The product has been deleted ', 'success');
      return state.filter(
        item =>
          item.id !== action.payload.id ||
          item.selected_size !== action.payload.selected_size,
      );
    },
    updateQuantity: (state, action) => {
      const item = state.find(
        product =>
          product.id === action.payload.id &&
          product.selected_size === action.payload.selected_size,
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find(
        product =>
          product.id === action.payload.id &&
          product.selected_size === action.payload.selected_size,
      );
      if (item && (item.quantity || 1) < 10) {
        item.quantity = (item.quantity || 1) + 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find(
        product =>
          product.id === action.payload.id &&
          product.selected_size === action.payload.selected_size,
      );
      if (item && (item.quantity || 1) > 1) {
        item.quantity = (item.quantity || 1) - 1;
      }
    },
    clearCart: () => initialState,
  },
});

export const {
  add,
  remove,
  clearCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
