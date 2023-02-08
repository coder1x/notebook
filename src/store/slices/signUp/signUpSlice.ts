import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken } from '@helpers/index';
import * as Type from './signUpType';

const initialState: Type.State = {
  message: '',
  isRegistrationError: false,
};

localStorage.setItem('registrationToken', getToken());

const signUp = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setSignUpRegistration(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.isRegistrationError = false;
    },
    setSignUpRegistrationError(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.isRegistrationError = true;
    },
    fetchSignUpSubmitForm(state, action: PayloadAction<Type.Data>) {
      state.message = '';
    },
  },
});

const signUpReducer = signUp.reducer;
const signUpActions = signUp.actions;

export { signUpActions, signUpReducer };
