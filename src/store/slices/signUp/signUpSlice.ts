import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken } from '@helpers/index';
import * as Type from './signUpType';

const initialState: Type.State = {
  isPassword: false,
  isErrorPasswordOne: false,
  isErrorPasswordTwo: false,
  message: '',
  passwordOne: '',
  passwordTwo: '',
  token: getToken(),
};

const signUp = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setRegPasswordOne(state, action: PayloadAction<string>) {
      state.isErrorPasswordOne = false;
      state.passwordOne = action.payload;
    },
    setRegPasswordOneError(state, action: PayloadAction<string>) {
      state.isErrorPasswordOne = true;
      state.passwordOne = action.payload;
    },
    setRegPasswordTwo(state, action: PayloadAction<string>) {
      state.isErrorPasswordTwo = false;
      state.passwordTwo = action.payload;
    },
    setRegPasswordTwoError(state, action: PayloadAction<string>) {
      state.isErrorPasswordTwo = true;
      state.passwordTwo = action.payload;
    },
    setSignUpRegistration(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.passwordOne = '';
      state.passwordTwo = '';
    },
    fetchSignUpSubmitForm(state, action: PayloadAction<any>) {
      console.log(state);
      console.log(action);
    },
  },
});

const signUpReducer = signUp.reducer;
const signUpActions = signUp.actions;

export { signUpActions, signUpReducer };
