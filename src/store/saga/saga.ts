import { all } from 'redux-saga/effects';

import sagaRegistration from './signUp';
import sagaCheckUser from './nameValidator';
import sagaCheckCaptcha from './captcha';

function* mySaga() {
  yield all([sagaCheckUser(), sagaCheckCaptcha(), sagaRegistration()]);
}

export default mySaga;
