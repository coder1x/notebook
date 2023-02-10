import { call, put, take, actionChannel } from 'redux-saga/effects';
import { checkName } from '@api/index';
import { buffers } from 'redux-saga';

import { nameValidatorActions } from '@store/slices';

type Data = {
  isNameValid?: boolean;
};

function* fetchCheckName(name: string) {
  try {
    const data: Data = yield call(checkName, name);

    if (!data.isNameValid) {
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
      // throw new Error('Такое имя уже занято.');
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
