import { call, put, takeLeading } from 'redux-saga/effects';

import authorization from '@api/signIn';
import { PayloadAction } from '@reduxjs/toolkit';
import { signInActions, signInType } from '@store/slices';

type DataAuthorization = {
  token: string | false;
};

function* fetchAuthorization(action: PayloadAction<signInType.Data>) {
  const { name, password } = action.payload;

  try {
    const data: DataAuthorization = yield call(authorization, {
      name,
      password,
    });

    const { token } = data;

    if (token === false) {
      yield put(signInActions.setSignInError());

      throw new Error('Не удалось авторизоваться');
    } else if (token === '404') {
      yield put(signInActions.setSignInError());

      throw new Error('Ошибка запроса.');
    }

    yield put(signInActions.setSignInToken(token));
    return data.token;
  } catch (error) {
    console.log('Error', error);
  }

  return false;
}

function* sagaAuthorization() {
  yield takeLeading(signInActions.fetchSignInAuthorization.type, fetchAuthorization);
}

export default sagaAuthorization;
