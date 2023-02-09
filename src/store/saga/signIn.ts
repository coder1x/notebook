import { call, put, takeLeading } from 'redux-saga/effects';
import authorization from '@api/signIn';

interface DataAuthorization {
  token: string | false;
}

function* fetchAuthorization(action: any) {
  try {
    const data: DataAuthorization = yield call(authorization, {
      name: action.name,
      password: action.password,
    });

    const { token } = data;

    if (token === false) {
      throw new Error('Не удалось авторизоваться');
    } else if (token === '404') {
      throw new Error('Ошибка запроса.');
    }

    yield put({
      type: 'SET_MANAGER_TOKEN',
      token,
    });
    return data.token;
  } catch (error) {
    console.log('error', error);
  }

  return false;
}

function* authorizationSaga() {
  yield takeLeading('AUTHORIZATION_FETCH_REQUESTED', fetchAuthorization);
}

export default authorizationSaga;
