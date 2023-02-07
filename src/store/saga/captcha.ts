import { call, put, take, actionChannel } from 'redux-saga/effects';
import { buffers } from 'redux-saga';

import { checkCaptcha } from '@api/index';

import { captchaActions, captchaType } from '@store/slices';

type Data = {
  isCaptchaPassed?: boolean;
};

function* fetchCheckCaptcha(action: captchaType.Data) {
  try {
    const { captcha, token } = action;

    const data: Data = yield call(checkCaptcha, captcha, token);

    if (!data.isCaptchaPassed) {
      yield put(captchaActions.setCaptchaError());
      throw new Error('Неверный код капчи.');
    }
  } catch (error) {
    console.log('error', error);
  }
}

function* sagaCheckCaptcha() {
  const fetchType = captchaActions.fetchCheckCaptcha.type;
  yield actionChannel(fetchType, buffers.sliding(5));

  while (true) {
    const { payload } = yield take(fetchType);

    yield call(fetchCheckCaptcha, {
      captcha: payload.captcha,
      token: payload.token,
    });
  }
}

export default sagaCheckCaptcha;
