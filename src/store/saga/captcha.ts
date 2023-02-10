import { call, put, take, actionChannel } from 'redux-saga/effects';
import { buffers } from 'redux-saga';

import { checkCaptcha } from '@api/index';

import { captchaActions } from '@store/slices';

type Data = {
  isCaptchaPassed?: boolean;
};

function* fetchCheckCaptcha(text: string) {
  try {
    const data: Data = yield call(
      checkCaptcha,
      text,
      String(localStorage.getItem('registrationToken'))
    );

    if (!data.isCaptchaPassed) {
      yield put(captchaActions.setCaptchaError());
      throw new Error('Неверный код капчи.');
    }
  } catch (error) {
    console.log('Error', error);
  }
}

function* sagaCheckCaptcha() {
  const fetchType = captchaActions.fetchCheckCaptcha.type;
  yield actionChannel(fetchType, buffers.sliding(5));

  while (true) {
    const { payload } = yield take(fetchType);

    yield call(fetchCheckCaptcha, payload);
  }
}

export default sagaCheckCaptcha;
