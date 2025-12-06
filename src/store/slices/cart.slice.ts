import {createSlice} from '@reduxjs/toolkit';
import {ProductDto} from '../../constants';
import {toast} from '../../utils';

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
        state.push(action.payload);
        toast('✅ Added To Cart', 'success');
      } else {
        toast('Already Exist in the Cart', 'info');
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
    clearCart: () => initialState,
  },
});

export const {add, remove, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
