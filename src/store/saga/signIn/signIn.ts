import { call, put, takeLeading } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import authorization from '@api/signIn';
import { signInActions, signInType } from '@store/slices';
import { Data } from './signInType';

function* fetchAuthorization(action: PayloadAction<signInType.Data>) {
  const { name, password } = action.payload;

  try {
    const data: Data = yield call(authorization, {
      name,
      password,
    });

    if (data.error) {
      throw new Error(data.messageError);
    }

    if (data.value) {
      yield put(signInActions.setSignInToken(data.value));
    } else {
      yield put(signInActions.setSignInError());

      throw new Error('Не удалось авторизоваться');
    }
  } catch (error) {
    console.log('Error', error);
  }
}

function* sagaAuthorization() {
  yield takeLeading(signInActions.fetchSignInAuthorization.type, fetchAuthorization);
}

export default sagaAuthorization;
