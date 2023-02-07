import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Type from './captchaType';

const initialState: Type.State = {
  isErrorCaptcha: false,
};

const captcha = createSlice({
  name: 'captcha',
  initialState,
  reducers: {
    setCaptchaError(state) {
      state.isErrorCaptcha = true;
    },
    setReset(state) {
      state.isErrorCaptcha = false;
    },
    fetchCheckCaptcha(state, action: PayloadAction<string>) {
      state.isErrorCaptcha = false;
    },
  },
});

const captchaReducer = captcha.reducer;
const captchaActions = captcha.actions;

export { captchaActions, captchaReducer };
