import { RootState } from '@store/store';

const messageState = (state: RootState) => state.signUp.message;
const isRegistrationErrorState = (state: RootState) => state.signUp.isRegistrationError;

const errorNameState = (state: RootState) => state.nameValidator.errorName;
const nameState = (state: RootState) => state.nameValidator.name;

const isErrorCaptchaState = (state: RootState) => state.captcha.isErrorCaptcha;

export { messageState, isRegistrationErrorState, errorNameState, nameState, isErrorCaptchaState };