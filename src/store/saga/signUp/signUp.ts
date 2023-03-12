import { call, put, takeLeading } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { registration } from '@api/index';
import { signUpActions, signUpType } from '@store/slices';
import { Data } from './signUpType';

function* fetchRegistration(action: PayloadAction<signUpType.Data>) {
  try {
    const { name, password } = action.payload;

    const data: Data = yield call(registration, {
      name,
      password,
      tokenRegistration: localStorage.getItem('registrationToken'),
    });

    if (data.error) {
      yield put(signUpActions.setSignUpRegistrationError('Ошибка регистрации'));
      throw new Error(data.messageError);
    }

    if (data.value) {
      yield put(signUpActions.setSignUpRegistration('Вы зарегистрированы'));
    }
  } catch (error) {
    console.log('Error', error);
  }
}

function* sagaRegistration() {
  yield takeLeading(signUpActions.fetchSignUpSubmitForm.type, fetchRegistration);
}

export default sagaRegistration;
