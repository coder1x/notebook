import { signUpActions, signUpReducer } from './signUp/signUpSlice';
import { captchaActions, captchaReducer } from './captcha/captchaSlice';
import * as captchaType from './captcha/captchaType';
import { nameValidatorActions, nameValidatorReducer } from './nameValidator/nameValidatorSlice';

export {
  signUpActions,
  signUpReducer,
  captchaActions,
  captchaReducer,
  captchaType,
  nameValidatorActions,
  nameValidatorReducer,
};
