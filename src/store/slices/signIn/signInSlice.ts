import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setDataToCookies, getDataToCookies } from '@helpers/index';
import * as Type from './signInType';

const initialState: Type.State = {
  token: getDataToCookies('TodoToken'),
  isSignInError: false,
};

const signIn = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setSignInToken(state, action: PayloadAction<string>) {
      const token = action.payload;
      setDataToCookies('TodoToken', token);
      state.token = token;
    },
    setSignInError(state) {
      state.isSignInError = true;
    },
    fetchSignInAuthorization(state, action: PayloadAction<Type.Data>) {
      state.isSignInError = false;
    },
  },
});

const signInReducer = signIn.reducer;
const signInActions = signIn.actions;

export { signInActions, signInReducer };
