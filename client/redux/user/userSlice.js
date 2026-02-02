import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
updateUserStart: (state) => {
      state.loading = true;
    },
updateUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, signOutSuccess } = userSlice.actions;
export default userSlice.reducer;
