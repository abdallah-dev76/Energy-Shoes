import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDto } from '../../constants';
import { getDefaultHistoryOrders } from '../defaultData';

export interface Order {
  id: string;
  items: ProductDto[];
  subtotal: number;
  shippingCost: number;
  total: number;
  date: string;
  contactInfo: {
    email: string;
    phone: string;
  };
  deliveryAddress: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    country: string;
    postalCode?: string;
  };
  paymentMethod: string;
  status: string;
}

const initialState: Order[] = getDefaultHistoryOrders();

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.unshift(action.payload);
    },
    deleteFromHistory: (state, action: PayloadAction<string>) => {
      return state.filter(order => order.id !== action.payload);
    },
    clearOrders: () => {
      return [];
    },
  },
});

export const { addOrder, deleteFromHistory, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
