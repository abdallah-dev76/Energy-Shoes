import { createSlice } from '@reduxjs/toolkit';
interface UserProps {
  isLoggedIn: boolean;
  name: string;
  email: string;
  imageProfile?: string;
  phone: string;
  password: string;
}
const initialState: UserProps = {
  isLoggedIn: false,
  name: '',
  email: '',
  imageProfile: '',
  phone: '',
  password: '',
};
export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
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

export const { addImageProfile, logout, loginUser } = userSlice.actions;
export default userSlice.reducer;
