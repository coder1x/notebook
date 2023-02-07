import { call, put } from 'redux-saga/effects';
import { checkName, registration } from '@api/index';

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
      yield put(signUpActions.setRegRegistrationYes('Вы зарегистрированы.'));
    } else {
      yield put(signUpActions.setRegRegistrationYes('Ошибка регистрации.'));
      throw new Error('Ошибка регистрации.');
    }
  } catch (error) {
    console.log('error', error);
  }
}

function* fetchCheckName(name: string) {
  try {
    const data: DataRegistration = yield call(checkName, name);

    if (!data.isNameValid) {
      yield put(signUpActions.setRegName(name));
    } else {
      yield put(signUpActions.setRegNameError({ name, errorName: 'Такой пользователь уже есть' }));
      throw new Error('Такое имя уже занято.');
    }
  } catch (error) {
    console.log('error', error);
  }
}

export { fetchRegistration, fetchCheckName };
