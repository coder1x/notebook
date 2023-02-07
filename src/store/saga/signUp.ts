import { call, put, takeLeading } from 'redux-saga/effects';
import { registration } from '@api/index';

import { signUpActions } from '@store/slices';

type DataRegistration = {
  isRegistered?: boolean;
  isNameValid?: boolean;
  isCaptchaPassed?: boolean;
};

function* fetchRegistration(action: any) {
  try {
    const { name, password, tokenRegistration } = action.payload;

    const data: DataRegistration = yield call(registration, {
      name,
      password,
      tokenRegistration,
    });

    if (data.isRegistered) {
      yield put(signUpActions.setSignUpRegistration('Вы зарегистрированы.'));
    } else {
      yield put(signUpActions.setSignUpRegistration('Ошибка регистрации.'));
      throw new Error('Ошибка регистрации.');
    }
  } catch (error) {
    console.log('error', error);
  }
}

function* sagaRegistration() {
  yield takeLeading(signUpActions.fetchSignUpSubmitForm.type, fetchRegistration);
}

export default sagaRegistration;
