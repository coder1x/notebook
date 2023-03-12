import { call, put, take, actionChannel } from 'redux-saga/effects';
import { buffers } from 'redux-saga';

import { checkName } from '@api/index';
import { nameValidatorActions } from '@store/slices';
import { Data } from './nameValidatorType';

function* fetchCheckName(name: string) {
  try {
    const data: Data = yield call(checkName, name);

    if (data.error) {
      throw new Error(data.messageError);
    }

    if (!data.value) {
      yield put(
        nameValidatorActions.setNameValidator({
          name,
          errorName: 'notOccupied',
        })
      );
    } else {
      yield put(
        nameValidatorActions.setNameValidatorError({
          name,
          errorName: 'busy',
        })
      );
    }
  } catch (error) {
    console.log('Error', error);
  }
}

function* sagaCheckUser() {
  const fetchType = nameValidatorActions.fetchNameValidator.type;
  yield actionChannel(fetchType, buffers.sliding(5));

  while (true) {
    const { payload } = yield take(fetchType);
    yield call(fetchCheckName, payload);
  }
}

export default sagaCheckUser;
