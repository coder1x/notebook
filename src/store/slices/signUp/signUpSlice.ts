import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken } from '@helpers/index';
import * as Type from './signUpType';

const initialState: Type.State = {
  errorName: '',
  isPassword: false,
  isErrorPasswordOne: false,
  isErrorPasswordTwo: false,
  message: '',
  name: '',
  passwordOne: '',
  passwordTwo: '',
  token: getToken(),
};

const signUp = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setRegName(state, action: PayloadAction<string>) {
      state.errorName = '';
      state.name = action.payload;
    },
    setRegNameError(state, action: PayloadAction<{ name: string; errorName: string }>) {
      const { name, errorName } = action.payload;

      state.errorName = errorName;
      state.name = name;
    },
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
    setRegRegistrationYes(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.name = '';
      state.passwordOne = '';
      state.passwordTwo = '';
    },
    setRegRegistrationError(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.name = '';
      state.passwordOne = '';
      state.passwordTwo = '';
    },
    fetchSignUpCheckName(state, action: PayloadAction<string>) {
      console.log(state);
      console.log(action);
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
