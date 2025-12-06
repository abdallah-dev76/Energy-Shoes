import { createSlice } from '@reduxjs/toolkit';
interface UserProps {
  isLoggedIn: boolean;
  name: string;
  email: string;
  imageProfile?: string;
}
const initialState: UserProps = {
  isLoggedIn: false,
  name: '',
  email: '',
  imageProfile: '',
};
export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    },
    logout: () => {
      return initialState;
    },
    addImageProfile: (state, action) => {
      if (state) {
        state.imageProfile = action.payload;
      }
    },
  },
});

export const { addImageProfile, login, logout } = userSlice.actions;
export default userSlice.reducer;
