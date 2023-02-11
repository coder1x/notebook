import { signUpActions, signUpReducer } from './signUp/signUpSlice';
import { signInActions, signInReducer } from './signIn/signInSlice';
import { captchaActions, captchaReducer } from './captcha/captchaSlice';
import * as captchaType from './captcha/captchaType';
import * as signUpType from './signUp/signUpType';
import * as signInType from './signIn/signInType';
import { nameValidatorActions, nameValidatorReducer } from './nameValidator/nameValidatorSlice';
import { projectsActions, projectsReducer } from './projects/projectsSlice';

export {
  signInActions,
  signInReducer,
  signUpActions,
  signUpReducer,
  signUpType,
  signInType,
  captchaActions,
  captchaReducer,
  captchaType,
  nameValidatorActions,
  nameValidatorReducer,
  projectsActions,
  projectsReducer,
};
