import { call, put, take, actionChannel } from 'redux-saga/effects';
import { buffers } from 'redux-saga';

import { checkCaptcha } from '@api/index';

import { captchaActions } from '@store/slices';

type FetchData = {
  error: boolean;
  messageError: string;
};

interface Captcha extends FetchData {
  value?: boolean;
}

function* fetchCheckCaptcha(text: string) {
  try {
    const data: Captcha = yield call(
      checkCaptcha,
      text,
      String(localStorage.getItem('registrationToken'))
    );

    if (data.error) {
      throw new Error(data.messageError);
    }

    if (!data.value) {
      yield put(captchaActions.setCaptchaError());
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
