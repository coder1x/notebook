import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Type from './signUpType';

function resetCode(min = 10000, max = 99999) {
  return Math.floor(Math.random() * max) + min;
}

function generationHashCode(code: string) {
  return String(
    code.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0)
  );
}

function getToken() {
  return generationHashCode(String(resetCode(1000000, 9999999)));
}

const initialState: Type.State = {
  isName: false,
  isCaptcha: false,
  isPassword: false,
  modifierName: '',
  modifierPassword: '',
  modifierCaptcha: '',
  message: '',
  name: '',
  passwordOne: '',
  passwordTwo: '',
  captcha: '',
  code: resetCode(),
  token: getToken(),
};

const signUp = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setSignUp(state) {
      // --
    },
    fetchSignUpCheckName(state, action: PayloadAction<Type.Data>) {
      // --
    },
    fetchSignUpCheckCaptcha(state, action: PayloadAction<Type.Data>) {
      // --
    },
    fetchSignUpSubmitForm(state, action: PayloadAction<Type.Data>) {
      // --
    },
  },
});

const signUpReducer = signUp.reducer;
const signUpActions = signUp.actions;

export { signUpActions, signUpReducer };

// const reducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case 'REG_NAME':
//       return {
//         ...state,
//         isName: true,
//         modifierName: '',
//         name: action.name,
//       };
//     case 'REG_NAME_ERROR':
//       return {
//         ...state,
//         isName: false,
//         modifierName: 'Error',
//         name: action.name,
//       };
//     case 'REG_PASSWORD_1':
//       return {
//         ...state,
//         isPassword: true,
//         modifierPassword: '',
//         passwordOne: action.passwordOne,
//       };
//     case 'REG_PASSWORD_1_ERROR':
//       return {
//         ...state,
//         isPassword: false,
//         modifierPassword: 'Error',
//         passwordOne: action.passwordOne,
//       };
//     case 'REG_PASSWORD_2':
//       return {
//         ...state,
//         isPassword: true,
//         modifierPassword: '',
//         passwordTwo: action.passwordTwo,
//       };
//     case 'REG_PASSWORD_2_ERROR':
//       return {
//         ...state,
//         isPassword: false,
//         modifierPassword: 'Error',
//         passwordTwo: action.passwordTwo,
//       };
//     case 'REG_CAPTCHA':
//       return {
//         ...state,
//         isCaptcha: true,
//         modifierCaptcha: '',
//         captcha: action.captcha,
//       };
//     case 'REG_CAPTCHA_ERROR':
//       return {
//         ...state,
//         isCaptcha: false,
//         modifierCaptcha: 'Error',
//         captcha: action.captcha,
//       };
//     case 'REG_CODE':
//       return {
//         ...state,
//         code: action.code,
//         captcha: '',
//       };
//     case 'REG_REGISTRATION_YES':
//       return {
//         ...state,
//         message: action.message,
//         captcha: '',
//         name: '',
//         passwordOne: '',
//         passwordTwo: '',
//         isName: false,
//         isCaptcha: false,
//         isPassword: false,
//       };
//     case 'REG_REGISTRATION_ERROR':
//       return {
//         ...state,
//         message: action.message,
//         captcha: '',
//         name: '',
//         passwordOne: '',
//         passwordTwo: '',
//       };
//     default:
//       return state;
//   }
// };
