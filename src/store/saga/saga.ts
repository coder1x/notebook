import { buffers } from 'redux-saga';

import { takeLeading, all, take, call, actionChannel } from 'redux-saga/effects';

import { signUpActions } from '@store/slices';
import { fetchRegistration, fetchCheckName } from './signUp';
import sagaCheckCaptcha from './captcha';

function* checkUser() {
  const fetchType = signUpActions.fetchSignUpCheckName.type;
  yield actionChannel(fetchType, buffers.sliding(5));

  while (true) {
    const { payload } = yield take(fetchType);
    yield call(fetchCheckName, payload);
  }
}

function* registration() {
  yield takeLeading(signUpActions.fetchSignUpSubmitForm.type, fetchRegistration);
}

function* mySaga() {
  yield all([checkUser(), sagaCheckCaptcha(), registration()]);
}

export default mySaga;
