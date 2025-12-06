import {createSlice} from '@reduxjs/toolkit';
interface UserProps {
  isLoggedIn: boolean;
  data: {
    displayName: string;
    email: string;
    token: string;
    imageProfile: string | undefined;
  };
}
const initialState: UserProps = {
  isLoggedIn: false,
  data: {
    displayName: '',
    email: '',
    token: '',
    imageProfile: '',
  },
};
export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    loggedIn: (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    resetUser: () => {
      return initialState;
    },
    addImageProfile: (state, action) => {
      console.log('No');
      if (state.data) {
        console.log('Yes');
        state.data.imageProfile = action.payload;
      }
    },
    updateToken: (state, action) => {
      state.data.token = action.payload;
    },
  },
});

export const {addImageProfile, loggedIn, resetUser, updateToken} =
  userSlice.actions;
export default userSlice.reducer;
