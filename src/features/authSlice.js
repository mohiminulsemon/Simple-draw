import { createSlice } from '@reduxjs/toolkit';
import { sliceKeys } from '../utils/keys';

// ==============================|| states ||============================== //
const initialState = {
  user: {
    name: '',
    email: ''
  },
  jwt: {
    token: '',
    refreshToken: ''
  },
  auth: false
};

// ==============================|| slice ||============================== //
export const authSlice = createSlice({
  name: sliceKeys.auth,
  initialState,
  reducers: {
    /**
     * update user object action
     * @param action.playload {name:string, email:string}
     */
    updateUser: (state, action) => {
      state.user = action.payload;
    },

    /**
     * update jwt token action
     * @param action.payload {token:string, refreshToken:string}
     */
    updateJwt: (state, action) => {
      state.jwt = action.payload;
    },

    /**
     * update user authentication action
     * @param action.payload : boolean
     */
    updateUserAuth: (state, action) => {
      state.auth = action.payload;
    }
  }
});

export const { updateUser, updateJwt, updateUserAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
