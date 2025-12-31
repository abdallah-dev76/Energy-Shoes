import { createSlice } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  title: string;
  desc: string;
}

const initialState: Notification[] = [
  {
    id: '1',
    title: 'Welcome to Energy Shoes App',
    desc: 'Your shoe journey starts here! Browse, shop, and strut in style.',
  },
];

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },

    clearNotifications: () => {
      return [];
    },
  },
});

export const { addNotification, clearNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
