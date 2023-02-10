import { call, put, takeLeading } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { registration } from '@api/index';

import { signUpActions, signUpType } from '@store/slices';

type DataRegistration = {
  isRegistered?: boolean;
};

function* fetchRegistration(action: PayloadAction<signUpType.Data>) {
  try {
    const { name, password } = action.payload;

    const data: DataRegistration = yield call(registration, {
      name,
      password,
      tokenRegistration: localStorage.getItem('registrationToken'),
    });

    if (data.isRegistered) {
      yield put(signUpActions.setSignUpRegistration('Вы зарегистрированы'));
    } else {
      yield put(signUpActions.setSignUpRegistrationError('Ошибка регистрации'));
      throw new Error('Ошибка регистрации.');
    }
  } catch (error) {
    console.log('Error', error);
  }
}

function* sagaRegistration() {
  yield takeLeading(signUpActions.fetchSignUpSubmitForm.type, fetchRegistration);
}

export default sagaRegistration;
