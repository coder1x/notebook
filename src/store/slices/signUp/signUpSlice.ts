import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken } from '@helpers/index';
import * as Type from './signUpType';

const initialState: Type.State = {
  message: '',
  // token: getToken(),
};

localStorage.setItem('registrationToken', getToken());

const signUp = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setSignUpRegistration(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    fetchSignUpSubmitForm(state, action: PayloadAction<Type.Data>) {
      state.message = '';
    },
  },
});

const signUpReducer = signUp.reducer;
const signUpActions = signUp.actions;

export { signUpActions, signUpReducer };
