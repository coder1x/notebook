import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setDataToCookies, getDataToCookies, removeDataToCookies } from '@helpers/index';
import * as Type from './signInType';

const initialState: Type.State = {
  token: getDataToCookies('TodoToken'),
  isSignInError: false,
  isAuthorized: false,
};

const signIn = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setSignInToken(state, action: PayloadAction<string>) {
      const token = action.payload;
      setDataToCookies('TodoToken', token);
      state.token = token;
      state.isAuthorized = true;
    },
    setAuthorized(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload;
    },
    removeSignInToken(state) {
      removeDataToCookies('TodoToken');
      state.token = '';
      state.isAuthorized = false;
    },
    setSignInError(state) {
      state.isSignInError = true;
      state.isAuthorized = false;
    },
    fetchSignInAuthorization(state, action: PayloadAction<Type.Data>) {
      state.isSignInError = false;
    },
  },
});

const signInReducer = signIn.reducer;
const signInActions = signIn.actions;

export { signInActions, signInReducer };
